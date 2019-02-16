// must not be removed
import "reflect-metadata";
// position must not be changed

import { ICalculatedTemperature, IHeatingPlan } from "@app/model";
import { BootStrapper, CapabilityType, DeviceManagerService, HeatingManagerService, HeatingPlanRepositoryService, ILogger, LoggerFactory } from "@app/services";
import { Device } from "homey";
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
    private id;
    private plan: IHeatingPlan;

    public async onInit() {
        await BootStrapper();

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        this.logger = factory.createLogger("Device");

        this.id = this.getData<Data>().id; // handback from initialization
        this.logger.information(`Device init ${this.getName()} (${this.id})`);

        this.repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);
        this.manager = container.resolve<HeatingManagerService>(HeatingManagerService);
        this.devices = container.resolve<DeviceManagerService>(DeviceManagerService);

        this.registerCapabilityListener(CapabilityType.OnOff, this.onCapabilityOnoff.bind(this));
        this.registerCapabilityListener(CapabilityType.TargetTemperature, this.onCapabilityTargetTemperature.bind(this));

        this.repository.onChanged.subscribe(async (rep, plans) => {
            if (plans.filter((p) => p.id === this.id).length !== 0) {
                this.updateFromPlan(await this.repository.find(this.id));
                this.updateTemperature();
            }
        });

        this.devices.onCapabilityChanged.subscribe(async (rep, evt) => {
            if (this.plan == null) { return; }
            if (evt.capability !== CapabilityType.MeasureTemperature) { return; }

            // device belongs to us
            let found = find(this.plan.devices || [], (id) => id === evt.device.id);
            found = found || find(this.plan.zones || [], (id) => id === evt.device.zone);

            if (found) {
                this.logger.debug(`[${this.id}] Capability changed`);
                await this.updateTemperature();
            }
        });

        this.manager.onPlansApplied.subscribe(async (m, evt) => {
            if (this.plan == null) { return; }
            if (!find(evt.plans, (p) => p.id === this.id)) { return; }

            this.logger.debug(`[${this.id}] Plans applied - received new schedule`);

            const dev = filter(evt.schedule, (f) => f.plan.id === this.id);
            this.updateTemperature(dev);

            if (dev.length > 0) {
                this.setCapabilityValue(CapabilityType.TargetTemperature, this.adjustValue(dev[0].targetTemperature));
            }
        });

        await this.updateFromPlan(await this.repository.find(this.id));
        await this.updateTemperature();
    }

    private adjustValue(num: number) {
        return num <= 8 ? 8 : num;
    }

    private async updateTemperature(dev?: ICalculatedTemperature[]) {
        if (!this.getAvailable() || this.plan == null) { return; }

        dev = dev || this.manager.evaluatePlan(this.plan);
        if (dev.length === 0) {
            return;
        }

        let t: number = 0;
        dev.forEach((v) => {
            t += v.temperature;
        });

        if (t === 0) { t = this.adjustValue(dev[0].targetTemperature); }

        t = this.adjustValue(dev.length === 0 ? 0 : t / dev.length);
        this.logger.debug(`[${this.id}] Calculated temperature`, t);

        this.setCapabilityValue(CapabilityType.MeasureTemperature, t);
    }

    private async updateFromPlan(plan: IHeatingPlan) {
        this.plan = plan;

        // could be removed
        if (this.plan == null) {
            await this.setUnavailable();
        } else {
            await this.setAvailable();
            await this.setCapabilityValue(CapabilityType.OnOff, this.plan.enabled);

            const dev = this.manager.evaluatePlan(this.plan);
            if (dev.length > 0) {
                this.setCapabilityValue(CapabilityType.TargetTemperature, this.adjustValue(dev[0].targetTemperature));
            }
        }
    }

    private async onCapabilityOnoff(value, opts) {
        this.logger.debug(`[${this.id}] ${CapabilityType.OnOff} ${value}`);

        await this.repository.update({
            ...await this.repository.find(this.id),
            enabled: value,
        });
    }

    private async onCapabilityTargetTemperature(value, opts) {
        if (this.plan == null) { return; } // should not happen unavailable
        this.logger.debug(`[${this.id}] ${CapabilityType.TargetTemperature} ${value}`);

        const devices = [];
        (this.plan.devices || []).forEach((id) => {
            const dev = this.devices.findDevice(id);
            if (dev != null) { devices.push(dev); }
        });

        (this.plan.zones || []).forEach((id) => {
            const dev = this.devices.getDevicesForZone(id);
            if (dev != null) { devices.push(...dev); }
        });

        await Promise.all(
            devices.map(async (d) =>
                await this.manager.setTemperature(this.plan.name, d, value)),
        );
    }
}

module.exports = VirtualThermostat;
