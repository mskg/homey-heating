// must not be removed
import "reflect-metadata";
// position must not be changed

import { AsyncDebounce } from "@app/helper";
import { ICalculatedTemperature, IHeatingPlan, NormalOperationMode, ThermostatMode } from "@app/model";
import {
    AuditedDevice, BootStrapper, CapabilityChangedEventArgs, CapabilityType, DeviceManagerService,
    FlowService, HeatingManagerService, HeatingPlanRepositoryService,
    HeatingSchedulerService, ILogger, InternalSettings, LoggerFactory, PlanChangeEventType,
    PlansAppliedEventArgs, PlansChangedEventArgs, SettingsManagerService, trycatchlog,
} from "@app/services";
import { Device } from "homey";
import { filter, find } from "lodash";
import { IEventHandler } from "ste-events";
import { container } from "tsyringe";
import { IVirtualThermostat } from "../types";

type Data = {
    id: string;
};

class VirtualThermostat extends Device implements IVirtualThermostat {
    private devices!: DeviceManagerService;
    private repository!: HeatingPlanRepositoryService;
    private manager!: HeatingManagerService;

    private flow!: FlowService;
    private logger!: ILogger;
    private id!: string;

    private plan: IHeatingPlan | undefined = undefined;

    private repositoryChanged!: IEventHandler<HeatingPlanRepositoryService, PlansChangedEventArgs>;
    private capabilitiesChanged!: IEventHandler<DeviceManagerService, CapabilityChangedEventArgs>;
    private plansApplied!: IEventHandler<HeatingManagerService, PlansAppliedEventArgs>;

    @trycatchlog(true)
    public async onInit() {
        await BootStrapper(this.homey.app);
        this.id = (this.getData() as Data).id; // handback from initialization

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        this.logger = factory.createLogger("Device").createSubLogger(!__PRODUCTION__ ? this.getName() : this.id);
        this.logger.information(`Init for device ${this.getName()}`);

        // services
        this.repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);
        this.manager = container.resolve<HeatingManagerService>(HeatingManagerService);
        this.devices = container.resolve<DeviceManagerService>(DeviceManagerService);
        this.flow = container.resolve<FlowService>("FlowService");

        const settings = container.resolve<SettingsManagerService>(SettingsManagerService);

        // Capabilities
        this.tryRegisterCapability(CapabilityType.TargetTemperature,
            AsyncDebounce(this.onTargetTemperatureChanged.bind(this), settings.get<number>(InternalSettings.DriverDebounce, 5 * 1000)));

        this.tryRegisterCapability(CapabilityType.ThermostatOverride,
            AsyncDebounce(this.onThermostatModeChanged.bind(this), settings.get<number>(InternalSettings.DriverDebounce, 5 * 1000)));

        this.tryRegisterCapability(CapabilityType.OnOff,
            AsyncDebounce(this.onOnOff.bind(this), settings.get<number>(InternalSettings.DriverDebounce, 5 * 1000)));

        this.repositoryChanged = this.plansChanged.bind(this);
        this.capabilitiesChanged = this.capabilititesChanged.bind(this);
        this.plansApplied = this.scheduleChanged.bind(this);

        // Service hooks
        this.repository.onChanged.subscribe(this.repositoryChanged);
        this.devices.onCapabilityChanged.subscribe(this.capabilitiesChanged);
        this.manager.onPlansApplied.subscribe(this.plansApplied);

        // Update values
        this.plan = await this.repository.find(this.id);
        await this.updateCapabilitiesFromPlan();
        await this.updateTemperature();
        await this.updateOnOffStatus();
    }

    @trycatchlog(true)
    public async onDeleted() {
        this.repository.onChanged.unsubscribe(this.repositoryChanged);
        this.devices.onCapabilityChanged.unsubscribe(this.capabilitiesChanged);
        this.manager.onPlansApplied.unsubscribe(this.plansApplied);

        this.plan = undefined;

        // @ts-ignore
        delete this.devices;
        // @ts-ignore
        delete this.repository;
        // @ts-ignore
        delete this.manager;

        this.logger.information(`was removed`);
    }

    public async changeThermostatMode(mode: ThermostatMode | NormalOperationMode) {
        // conversion forward, backward, ...
        await this.onThermostatModeChanged(mode.toString(), null);
    }

    /**
     * Plans in the repository changed
     */
    @trycatchlog(true)
    private async plansChanged(_rep: HeatingPlanRepositoryService, plans: PlansChangedEventArgs) {
        await Promise.all(plans.filter((pc) => pc.plan.id === this.id).map(async (change) => {
            // if the plan was removed => we are null
            this.plan = change.event === PlanChangeEventType.Removed ? undefined : change.plan;
            this.logger.information(`plan was ${PlanChangeEventType[change.event]}`);

            // must be processed, we don't care
            await this.updateCapabilitiesFromPlan();
            await this.updateTemperature();
            await this.updateOnOffStatus();
        }));
    }

    /**
     * Plan was applied
     */
    @trycatchlog(true)
    private async scheduleChanged(_scheduler: HeatingSchedulerService, evt: PlansAppliedEventArgs) {
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
            await this.doSetCapabilityValue(CapabilityType.TargetTemperature,
                this.adjustTemperatureValue(calculation[0].targetTemperature));
        }
    }

    /**
     * A device's capability changed
     */
    @trycatchlog(true)
    private async capabilititesChanged(_devices: DeviceManagerService, evt: CapabilityChangedEventArgs) {
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
    @trycatchlog(true)
    private async tryRegisterCapability(capability: CapabilityType, callback: (val: any, opts: CallableFunction) => Promise<void>) {
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
    private async doSetCapabilityValue<T extends string | number | boolean>(type: CapabilityType, val: T): Promise<boolean> {
        if (this.getCapabilityValue(type) !== val) {
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
        if (calculation == null) { calculation = await this.manager.evaluatePlan(this.plan); }

        // nothing to do
        if (calculation.length === 0) {
            return;
        }

        let sum: number = 0;
        calculation.forEach((v) => {
            sum += v.temperature || 0;
        });

        // we take the target if we don't have readings
        if (sum === 0) { sum = this.adjustTemperatureValue(calculation[0].targetTemperature); }

        sum = this.adjustTemperatureValue(calculation.length === 0 ? 0 : sum / calculation.length);
        this.logger.debug(`Calculated temperature`, sum);

        await this.doSetCapabilityValue(CapabilityType.MeasureTemperature, sum);
    }

    /**
     * Update all capabilities that depend on the plan.
     */
    @trycatchlog(true)
    private async updateCapabilitiesFromPlan() {
        this.logger.debug(`Updating ${CapabilityType.ThermostatOverride} and ${CapabilityType.TargetTemperature}`);

        if (this.plan == null) {
            this.logger.information(`Plan does not exist -> exit`);
            await this.setUnavailable(this.homey.__("Device.plan_removed"));
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

            if (await this.doSetCapabilityValue(CapabilityType.ThermostatOverride, thermostatMode.toString())) {
                await this.flow.thermostatModeChanged.trigger(this, {mode: this.homey.__(`ThermostatMode.${thermostatMode}`)});
            }

            // need to filter out our own overrides
            const dev = (await this.manager.evaluatePlan(this.plan))
                .filter((t) => t.thermostatMode === NormalOperationMode.Automatic);

            if (dev.length > 0) {
                await this.doSetCapabilityValue(CapabilityType.TargetTemperature, this.adjustTemperatureValue(dev[0].targetTemperature));
            }
        }
    }

    /**
     * React to a thermostat mode change.
     *
     * @param value The mode
     * @param opts unused
     */
    @trycatchlog(true)
    private async onThermostatModeChanged(value: string, _opts: any) {
        if (this.plan == null) { return; } // should not happen unavailable
        this.logger.information(`${CapabilityType.ThermostatOverride} ${value}`);

        const mode = parseInt(value, 10);
        this.plan.thermostatMode = mode;

        await this.repository.update(this.plan);
        await this.flow.thermostatModeChanged.trigger(this, {mode: this.homey.__(`ThermostatMode.${value}`)});
    }

    /**
     * A temperature was read
     *
     * @param value The temperature
     * @param opts unsused
     */
    @trycatchlog(true)
    private async onTargetTemperatureChanged(value: number, _opts: any) {
        if (this.plan == null) { return; } // should not happen unavailable

        this.logger.information(`${CapabilityType.TargetTemperature} ${value}`);

        if (this.plan.thermostatMode !== ThermostatMode.FullManual) {

            if (this.plan.thermostatMode !== ThermostatMode.OverrideDay) {
                this.plan.thermostatMode = ThermostatMode.OverrideDay;

                // we're the only ones, that are interested in this change
                this.repository.update(this.plan, false);
            }

            // ok, will only change if not like that
            if (await this.doSetCapabilityValue(CapabilityType.ThermostatOverride, ThermostatMode.OverrideDay.toString())) {
                await this.flow.thermostatModeChanged.trigger(this, {mode: this.homey.__(`ThermostatMode.${ThermostatMode.OverrideDay}`)});
            }
        }

        const devices: AuditedDevice[] = [];
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
                await this.manager.setTemperature(this.plan!.name || "", d, value)),
            );
        } else {
            this.logger.debug(`we don't have associated devices`);
        }
    }

    /**
     * React to a thermostat onoff.
     *
     * @param value boolean
     * @param opts unused
     */
    @trycatchlog(true)
    private async onOnOff(value: boolean, _opts: any) {
        if (this.plan == null) { return; } // should not happen unavailable
        this.logger.information(`${CapabilityType.OnOff} ${value}`);

        this.plan.enabled = value;
        await this.repository.update(this.plan);
    }

    /**
     * Update this device's state
     */
    private async updateOnOffStatus() {
        if (this.plan == null) { return; }

        this.logger.debug(`Updating ${CapabilityType.OnOff} ${this.plan.enabled}`);
        await this.doSetCapabilityValue(CapabilityType.OnOff, this.plan.enabled);
    }
}

module.exports = VirtualThermostat;
