// must not be removed
import "reflect-metadata";
// position must not be changed

import { ICalculatedTemperature, IHeatingPlan, NormalOperationMode, ThermostatMode } from "@app/model";
import {
    asynctrycatchlog, BootStrapper, CapabilityChangedEventArgs, CapabilityType, DeviceManagerService,
    HeatingManagerService, HeatingPlanRepositoryService, ILogger, LoggerFactory,
    PlanChange, PlansAppliedEventArgs, PlansChangedEventArgs,
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
    private logger: ILogger;
    private id: string;
    private plan: IHeatingPlan;

    @asynctrycatchlog(true)
    public async onInit() {
        await BootStrapper();

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        this.logger = factory.createLogger("Device");

        this.id = this.getData<Data>().id; // handback from initialization
        this.logger.information(`[${this.id}] Init for device ${this.getName()}`);

        // services
        this.repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);
        this.manager = container.resolve<HeatingManagerService>(HeatingManagerService);
        this.devices = container.resolve<DeviceManagerService>(DeviceManagerService);

        // Capabilities
        this.tryRegisterCapability(CapabilityType.TargetTemperature, this.onTargetTemperatureChanged.bind(this));
        this.tryRegisterCapability(CapabilityType.ThermostatOverride, this.onThermostatModeChanged.bind(this));

        // Service hooks
        this.repository.onChanged.subscribe(this.plansChanged.bind(this));
        this.devices.onCapabilityChanged.subscribe(this.capabilititesChanged.bind(this));
        this.manager.onPlansApplied.subscribe(this.scheduleChanged.bind(this));

        // Update values
        this.plan = await this.repository.find(this.id);
        await this.updateCapabilitiesFromPlan();
        await this.updateTemperature();
    }

    @asynctrycatchlog(true)
    public async onDeleted() {
        this.repository.onChanged.unsubscribe(this.plansChanged.bind(this));
        this.devices.onCapabilityChanged.unsubscribe(this.capabilititesChanged.bind(this));
        this.manager.onPlansApplied.unsubscribe(this.scheduleChanged.bind(this));

        this.plan = null;
        this.devices = null;
        this.repository = null;
        this.manager = null;

        this.logger.information(`[${this.id}] was removed`);
    }

    /**
     * Plans in the repository changed
     */
    @asynctrycatchlog(true)
    private async plansChanged(rep, plans: PlansChangedEventArgs) {
        await Promise.all(plans.filter((pc) => pc.plan.id === this.id).map(async (change) => {
            // if the plan was removed => we are null
            this.plan = change.event === PlanChange.Remove ? null : change.plan;
            this.logger.information(`[${this.id}] plan was ${PlanChange[change.event]}`);

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

        this.logger.debug(`[${this.id}] Plans applied - received new schedule`);
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
            this.logger.debug(`[${this.id}] ${CapabilityType.MeasureTemperature} changed`);
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
            this.logger.error(`[${this.id}] does not have ${capability} - cannot register listener`);
        } else {
            this.logger.information(`[${this.id}] attached listener for ${capability}`);

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
    private async doSetCapbilityValue<T extends string | number | boolean>(type: CapabilityType, val: T) {
        if (await this.getCapabilityValue(type) !== val) {
            this.logger.information(`[${this.id}] Set ${type} = ${val}`);
            await this.setCapabilityValue(type, val);
        }
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

        this.logger.debug(`[${this.id}] Updating ${CapabilityType.MeasureTemperature}`);
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
        this.logger.debug(`[${this.id}] Calculated temperature`, sum);

        await this.doSetCapbilityValue(CapabilityType.MeasureTemperature, sum);
    }

    /**
     * Update all capabilities that depend on the plan.
     */
    @asynctrycatchlog(true)
    private async updateCapabilitiesFromPlan() {
        this.logger.debug(`[${this.id}] Updating ${CapabilityType.ThermostatOverride} and ${CapabilityType.TargetTemperature}`);

        if (this.plan == null) {
            this.logger.information(`[${this.id}] Plan does not exist -> exit`);
            await this.setUnavailable(__("Device.plan_removed"));
        } else {
            this.logger.debug(`[${this.id}] available? ${this.getAvailable()}`);
            await this.unsetWarning();
            await this.setAvailable();

            // if the plan is disabled, thermostat goes to manual
            let thermostatMode: (ThermostatMode | NormalOperationMode) = NormalOperationMode.Automatic;
            if (!this.plan.enabled) {
                thermostatMode = ThermostatMode.FullManual;
            } else if (this.plan.thermostatMode != null) {
                thermostatMode = this.plan.thermostatMode;
            }

            await this.doSetCapbilityValue(CapabilityType.ThermostatOverride, thermostatMode.toString());

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
        this.logger.information(`[${this.id}] ${CapabilityType.ThermostatOverride} ${value}`);

        const mode = parseInt(value, 10);
        this.plan.thermostatMode = mode;

        await this.repository.update(this.plan);
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
        this.logger.information(`[${this.id}] ${CapabilityType.TargetTemperature} ${value}`);

        if (this.plan.thermostatMode !== ThermostatMode.FullManual) {

            if (this.plan.thermostatMode !== ThermostatMode.OverrideDay) {
                this.plan.thermostatMode = ThermostatMode.OverrideDay;

                // we're the only ones, that are interested in this change
                this.repository.update(this.plan, false);
            }

            // ok, will only change if not like that
            await this.doSetCapbilityValue(
                CapabilityType.ThermostatOverride, ThermostatMode.OverrideDay.toString());
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
            this.logger.debug(`[${this.id}] we don't have associated devices`);
        }
    }
}

module.exports = VirtualThermostat;
