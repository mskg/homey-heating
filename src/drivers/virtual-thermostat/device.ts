// must not be removed
import "reflect-metadata";
// position must not be changed

import { AsyncDebounce } from "@app/helper";
import { ICalculatedTemperature, IHeatingPlan, NormalOperationMode, ThermostatMode } from "@app/model";
import {
    asynctrycatchlog, BootStrapper, CapabilityChangedEventArgs, CapabilityType, DeviceManagerService,
    FlowService, HeatingManagerService, HeatingPlanRepositoryService, ILogger,
    InternalSettings, LoggerFactory, PlanChangeEventType, PlansAppliedEventArgs, PlansChangedEventArgs, SettingsManagerService,
} from "@app/services";
import { __, Device } from "homey";
import { filter, find } from "lodash";
import { container } from "tsyringe";

type Data = {
    id: string;
};

class VirtualThermostat extends Device {
    private devices: DeviceManagerService;
    private repository: HeatingPlanRepositoryService;
    private manager: HeatingManagerService;
    private flow: FlowService;
    private logger: ILogger;
    private id: string;
    private plan: IHeatingPlan;

    private subscriptions = {
        repositoryChanged: null,
        capabilitiesChanged: null,
        plansApplied: null,
    };

    @asynctrycatchlog(true)
    public async onInit() {
        await BootStrapper();
        this.id = this.getData<Data>().id; // handback from initialization

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        this.logger = factory.createLogger("Device").createSubLogger(!__PRODUCTION__ ? this.getName() : this.id);
        this.logger.information(`Init for device ${this.getName()}`);

        // services
        this.repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);
        this.manager = container.resolve<HeatingManagerService>(HeatingManagerService);
        this.devices = container.resolve<DeviceManagerService>(DeviceManagerService);
        this.flow = container.resolve<FlowService>(FlowService);

        const settings = container.resolve<SettingsManagerService>(SettingsManagerService);

        // Capabilities
        this.tryRegisterCapability(CapabilityType.TargetTemperature,
            AsyncDebounce(this.onTargetTemperatureChanged.bind(this), settings.get<number>(InternalSettings.DriverDebounce, 5 * 1000)));

        this.tryRegisterCapability(CapabilityType.ThermostatOverride,
            AsyncDebounce(this.onThermostatModeChanged.bind(this), settings.get<number>(InternalSettings.DriverDebounce, 5 * 1000)));

        this.subscriptions.repositoryChanged = this.plansChanged.bind(this);
        this.subscriptions.capabilitiesChanged = this.capabilititesChanged.bind(this);
        this.subscriptions.plansApplied = this.scheduleChanged.bind(this);

        // Service hooks
        this.repository.onChanged.subscribe(this.subscriptions.repositoryChanged);
        this.devices.onCapabilityChanged.subscribe(this.subscriptions.capabilitiesChanged);
        this.manager.onPlansApplied.subscribe(this.subscriptions.plansApplied);

        // Update values
        this.plan = await this.repository.find(this.id);
        await this.updateCapabilitiesFromPlan();
        await this.updateTemperature();
    }

    @asynctrycatchlog(true)
    public async onDeleted() {
        this.repository.onChanged.unsubscribe(this.subscriptions.repositoryChanged);
        this.devices.onCapabilityChanged.unsubscribe(this.subscriptions.capabilitiesChanged);
        this.manager.onPlansApplied.unsubscribe(this.subscriptions.plansApplied);

        this.plan = null;
        this.devices = null;
        this.repository = null;
        this.manager = null;

        this.logger.information(`was removed`);
    }

    /**
     * Plans in the repository changed
     */
    @asynctrycatchlog(true)
    private async plansChanged(rep, plans: PlansChangedEventArgs) {
        await Promise.all(plans.filter((pc) => pc.plan.id === this.id).map(async (change) => {
            // if the plan was removed => we are null
            this.plan = change.event === PlanChangeEventType.Removed ? null : change.plan;
            this.logger.information(`plan was ${PlanChangeEventType[change.event]}`);

            // must be processed, we don't care
            await this.updateCapabilitiesFromPlan();
            await this.updateTemperature();
        }));
    }

    /**
     * Plan was applied
     */
    @asynctrycatchlog(true)
    private async scheduleChanged(scheduler, evt: PlansAppliedEventArgs) {
        // we are removed
        if (this.plan == null) { return; }

        // not for us
        if (!find(evt.plans, (p) => p.id === this.id)) {
            return;
        }

        this.logger.debug(`Plans applied - received new schedule`);
        const calculation = filter(evt.schedule, (f) => f.plan.id === this.id);
        await this.updateTemperature(calculation);

        if (calculation.length > 0) {
            await this.doSetCapbilityValue(CapabilityType.TargetTemperature,
                this.adjustTemperatureValue(calculation[0].targetTemperature));
        }
    }

    /**
     * A device's capability changed
     */
    @asynctrycatchlog(true)
    private async capabilititesChanged(devices, evt: CapabilityChangedEventArgs) {
        // we are removed
        if (this.plan == null) { return; }

        // not interested in other changes
        if (evt.capability !== CapabilityType.MeasureTemperature) {
            return;
        }

        // device belongs to us, or our zones
        let found = find(this.plan.devices || [], (id) => id === evt.device.id);
        found = found || find(this.plan.zones || [], (id) => id === evt.device.zone);

        if (found) {
            this.logger.debug(`${CapabilityType.MeasureTemperature} changed`);
            await this.updateTemperature();
        }
    }

    /**
     * Try to register the given capability with the device. If the capability is not available,
     * the error is logged.
     *
     * @param capability The one
     * @param callback The for the capability
     */
    @asynctrycatchlog(true)
    private async tryRegisterCapability(capability: CapabilityType, callback: (val, opts) => Promise<void>) {
        if (!find(this.getCapabilities(), (c) => c === capability)) {
            this.logger.information(`does not have ${capability} - cannot register listener`);
        } else {
            this.logger.information(`attached listener for ${capability}`);

            // this.capabilityListeners[capability] = callback;
            await this.registerCapabilityListener(capability, callback);
        }
    }

    /**
     * Onyl sets the value if the capabilities value is different.
     *
     * @param type The one
     * @param val The value to set/check
     */
    private async doSetCapbilityValue<T extends string | number | boolean>(type: CapabilityType, val: T): Promise<boolean> {
        if (await this.getCapabilityValue(type) !== val) {
            this.logger.information(`Set ${type} = ${val}`);
            await this.setCapabilityValue(type, val);

            return true;
        }

        return false;
    }

    /**
     * Convert the number in target_temperature range.
     * @param num value
     */
    private adjustTemperatureValue(num: number) {
        // two digits from 4 to 35
        return Math.round(Math.min(Math.max(4, num), 35) * 100) / 100;
    }

    /**
     * Update this device's temperature if we are part of the calculation
     * applied.
     *
     * @param calculation If the value is null, the plan is evaluated with the manager
     */
    private async updateTemperature(calculation?: ICalculatedTemperature[]) {
        if (this.plan == null) { return; }

        this.logger.debug(`Updating ${CapabilityType.MeasureTemperature}`);
        if (calculation == null) { calculation = this.manager.evaluatePlan(this.plan); }

        // nothing to do
        if (calculation.length === 0) {
            return;
        }

        let sum: number = 0;
        calculation.forEach((v) => {
            sum += v.temperature;
        });

        // we take the target if we don't have readings
        if (sum === 0) { sum = this.adjustTemperatureValue(calculation[0].targetTemperature); }

        sum = this.adjustTemperatureValue(calculation.length === 0 ? 0 : sum / calculation.length);
        this.logger.debug(`Calculated temperature`, sum);

        await this.doSetCapbilityValue(CapabilityType.MeasureTemperature, sum);
    }

    /**
     * Update all capabilities that depend on the plan.
     */
    @asynctrycatchlog(true)
    private async updateCapabilitiesFromPlan() {
        this.logger.debug(`Updating ${CapabilityType.ThermostatOverride} and ${CapabilityType.TargetTemperature}`);

        if (this.plan == null) {
            this.logger.information(`Plan does not exist -> exit`);
            await this.setUnavailable(__("Device.plan_removed"));
        } else {
            this.logger.debug(`available? ${this.getAvailable()}`);
            await this.unsetWarning();
            await this.setAvailable();

            // if the plan is disabled, thermostat goes to manual
            let thermostatMode: (ThermostatMode | NormalOperationMode) = NormalOperationMode.Automatic;
            if (!this.plan.enabled) {
                thermostatMode = ThermostatMode.FullManual;
            } else if (this.plan.thermostatMode != null) {
                thermostatMode = this.plan.thermostatMode;
            }

            if (await this.doSetCapbilityValue(CapabilityType.ThermostatOverride, thermostatMode.toString())) {
                await this.flow.thermostatModeChanged.trigger(this, {mode: __(`ThermostatMode.${thermostatMode}`)});
            }

            const dev = this.manager.evaluatePlan(this.plan);
            if (dev.length > 0) {
                await this.doSetCapbilityValue(CapabilityType.TargetTemperature, this.adjustTemperatureValue(dev[0].targetTemperature));
            }
        }
    }

    /**
     * React to a thermostat mode change.
     *
     * @param value The mode
     * @param opts unused
     */
    @asynctrycatchlog(true)
    private async onThermostatModeChanged(value: string, opts) {
        if (this.plan == null) { return; } // should not happen unavailable
        this.logger.information(`${CapabilityType.ThermostatOverride} ${value}`);

        const mode = parseInt(value, 10);
        this.plan.thermostatMode = mode;

        await this.repository.update(this.plan);
        await this.flow.thermostatModeChanged.trigger(this, {mode: __(`ThermostatMode.${value}`)});
    }

    /**
     * A temperature was read
     *
     * @param value The temperature
     * @param opts unsused
     */
    @asynctrycatchlog(true)
    private async onTargetTemperatureChanged(value: number, opts) {
        if (this.plan == null) { return; } // should not happen unavailable
        this.logger.information(`${CapabilityType.TargetTemperature} ${value}`);

        if (this.plan.thermostatMode !== ThermostatMode.FullManual) {

            if (this.plan.thermostatMode !== ThermostatMode.OverrideDay) {
                this.plan.thermostatMode = ThermostatMode.OverrideDay;

                // we're the only ones, that are interested in this change
                this.repository.update(this.plan, false);
            }

            // ok, will only change if not like that
            if (await this.doSetCapbilityValue(CapabilityType.ThermostatOverride, ThermostatMode.OverrideDay.toString())) {
                await this.flow.thermostatModeChanged.trigger(this, {mode: __(`ThermostatMode.${ThermostatMode.OverrideDay}`)});
            }
        }

        const devices = [];
        (this.plan.devices || []).forEach((id) => {
            const dev = this.devices.findDevice(id);
            if (dev != null) { devices.push(dev); }
        });

        (this.plan.zones || []).forEach((id) => {
            const dev = this.devices.getDevicesForZone(id);
            if (dev != null) { devices.push(...dev); }
        });

        if (devices.length !== 0) {
            // should debounce here
            await Promise.all(devices.map(async (d) =>
                await this.manager.setTemperature(this.plan.name, d, value)),
            );
        } else {
            this.logger.debug(`we don't have associated devices`);
        }
    }
}

module.exports = VirtualThermostat;
