import { ManagerSettings, Notification, __ } from "homey";
import { filter, forEach, isEmpty } from "lodash";
import { HeatingPlanCalculator } from "../../helper/HeatingPlanCalculator";
import { ICalculatedTemperature, IHeatingPlan, InternalSettings, ISetPoint, NormalOperationMode, OperationMode, OverrideMode } from "../../model";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { StringHashMap, HomeyAPIService, IDevice, IHomeyAPI, IZone, MEASURE_TEMPERATURE, TARGET_TEMPERATURE, ICapabilityInstance } from "../homey-api";
import { ILogger, LogService } from "../log";
import AsyncThrottle from "../../helper/AsyncThrottle";
import Retry from "../../helper/Retry";

type AuditedDevice = {
    watchedCapabilities?: {
        targetTemperature?: ICapabilityInstance<number>;
        temperature?: ICapabilityInstance<number>;
    }
} & IDevice;

export const CanSetTargetTemperature = (device: IDevice): boolean => 
    device.capabilities != null ? device.capabilities.find(c => c === TARGET_TEMPERATURE) != null : null;

export const  CanMeasureTemperature = (device: IDevice): boolean => 
    device.capabilities != null ? device.capabilities.find(c => c === MEASURE_TEMPERATURE) != null : null;

export class HeatingManagerService {
    private isRunning: boolean;
    private initialized: boolean = false;

    private deviceList: StringHashMap<AuditedDevice>;
    private zoneList: StringHashMap<IZone>;

    private logger: ILogger;

    private homeyApi: IHomeyAPI;

    private calc: HeatingPlanCalculator = new HeatingPlanCalculator();
    private plans: HeatingPlanRepositoryService;

    private mode: OperationMode; 

    constructor(rep: HeatingPlanRepositoryService) {
        this.logger = LogService.createLogger("Manager");
        this.plans = rep;
        
        let mode: OperationMode = ManagerSettings.get(InternalSettings.OperationMode) as OperationMode;
        if (mode == null) { mode = NormalOperationMode.Automatic; }

        this.mode = mode;
    }

    public get calculator(): HeatingPlanCalculator {
        return this.calc;
    }

    public get zones() {
        return this.zoneList;
    }

    public get devices() {
        return this.deviceList;
    }

    public get operationMode() {
        return this.mode;
    }

    public set operationMode(mode: OperationMode) {
        this.logger.information(`Setting mode to`, mode);

        this.mode = mode;
        ManagerSettings.set(InternalSettings.OperationMode, mode);

        this.sendNotification("set_operation_mode", {
            mode: __(`Modes.${mode}`)
        });
    }

    public get repository(): HeatingPlanRepositoryService {
        return this.plans;
    }

    public async applyPlans() {
        // scheduler vs normal run
        if (this.isRunning) { return; }

        try {
            await this.init();

            this.isRunning = true;
            this.logger.debug("Applying active plans");

            var settings = await this.evaluateActivePlans();
            await this.applySettings(settings);
        } finally {
            this.isRunning = false;
        }
    }

    public async evaluateActivePlans(): Promise<ICalculatedTemperature[]> {
        await this.init();

        const settings: ICalculatedTemperature[] = [];

        forEach(await this.plans.activePlans, (plan) => {
            settings.push(...this.evaluatePlan(plan));
        });
       
        return settings;
    }

    public async applyPlan(plan: IHeatingPlan) {
        await this.init();
        await this.applySettings(await this.evaluatePlan(plan));
    }

    private async attachWatchers(device: AuditedDevice) {
        if (device.watchedCapabilities == null) {
            device.watchedCapabilities = {};
        }

        if (device.watchedCapabilities.targetTemperature == null) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${TARGET_TEMPERATURE}`);

            device.watchedCapabilities.targetTemperature =  await device.makeCapabilityInstance<number>(TARGET_TEMPERATURE, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${TARGET_TEMPERATURE} to ${evt}`);
            });
        }

        if (device.watchedCapabilities.temperature == null && CanMeasureTemperature(device)) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${MEASURE_TEMPERATURE}`);

            device.watchedCapabilities.temperature = await device.makeCapabilityInstance<number>(MEASURE_TEMPERATURE, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${MEASURE_TEMPERATURE} to ${evt}`);
            });
        }
    }

    private async destroyWatchers(device: AuditedDevice) {
        if (device != null && device.watchedCapabilities != null) {
            if (device.watchedCapabilities.targetTemperature != null) {
                device.watchedCapabilities.targetTemperature.destroy();
            }

            if (device.watchedCapabilities.temperature != null) {
                device.watchedCapabilities.temperature.destroy();
            }
        }
    }
    
    private async init(force: boolean = false) {
        if (this.initialized && !force) { return; }

        this.logger.information(`Init.`);
        this.homeyApi = await HomeyAPIService.getInstance();

        const filteredDevices = filter(await this.homeyApi.devices.getDevices(), d => CanSetTargetTemperature(d));

        this.logger.information(`Found ${filteredDevices.length} devices`);
        this.deviceList = {};

        // register listeners
        await Promise.all(filteredDevices.map(async (d) => {
            await this.attachWatchers(d);
            this.deviceList[d.id] = d;
        }));
      
        this.zoneList = await this.homeyApi.zones.getZones();
        this.logger.information(`Found ${Object.keys(this.zoneList).length} zones`);

        this.homeyApi.devices.on("device.create", async (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was created.`);
            this.deviceList[device.id] = device;
            await this.attachWatchers(device);
        });

        this.homeyApi.devices.on("device.update", (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was updated.`);
            this.deviceList[device.id] = device;
        });

        this.homeyApi.devices.on("device.delete", async (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was removed.`);
            await this.destroyWatchers(this.deviceList[device.id]);
            delete this.deviceList[device.id];
        });

        this.homeyApi.zones.on("zone.create", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was created.`);
            this.zoneList[zone.id] = zone;
        });

        this.homeyApi.zones.on("zone.update", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was updated.`);
            this.zoneList[zone.id] = zone;
        });

        this.homeyApi.zones.on("zone.delete", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was removed.`);
            delete this.zoneList[zone.id];
        });

        this.initialized = true;
    }

    private async applySettings(settings: ICalculatedTemperature[]) {
        // throttle execution to not flood zwave stack
        var setTemperature = AsyncThrottle(async (d,n) => await this.setTemperature(d,n), 1000);

        await Promise.all(
            settings.map(async newSetting => {
                if (await setTemperature(this.findDevice(newSetting.device.id), newSetting.targetTemperature)) {
                    this.sendNotification("set_target_temperature", {
                        name: newSetting.device.name,
                        value: newSetting.targetTemperature,
                        plan: newSetting.plan.name
                    })
                }
            })
        );
    }

    private evaluatePlan(plan: IHeatingPlan): ICalculatedTemperature[] {
        this.logger.information(`Evaluating plan ${plan.id}`);

        let setPoint: ISetPoint = null;

        // error in first implementation used number instead of text
        const override = plan.overrides ? (plan.overrides[this.mode] || plan.overrides[OverrideMode[this.mode]]) : null; 
        if (override != null) {
            this.logger.debug(`> Plan has override for ${OverrideMode[this.mode]}`);

            const date = new Date();
            setPoint = {
                day: date.getDay(),
                hour: date.getHours(),
                minute: date.getMinutes(),

                targetTemperature: override.targetTemperature
            }
        } else {
            setPoint = this.calc.getSetPoint(plan);
            if (setPoint == null) return [];    
        }

        this.logger.debug(`> Target temperature is ${setPoint.targetTemperature}`);
        const targets: ICalculatedTemperature[] = [];

        if (plan.zones) {
            forEach(plan.zones, (zoneId) => {
                this.logger.debug(`Evaluating zone ${zoneId}`);

                const zone = this.findZone(zoneId);
                if (zone == null) {
                    this.logger.debug("> not found");
                    return;
                }

                const devices = this.getDevicesForZone(zone.id);
                if (isEmpty(devices)) {
                    this.logger.debug("> No devices found");
                    return;
                }
                else {
                    this.logger.debug(`> found ${devices.length} device(s)`);
                }

                forEach(devices, d => {
                    targets.push({
                        device: { id: d.id, name: d.name },
                        plan: {
                            id: plan.id,
                            name: plan.name
                        },
                        temperature: this.getMeasuredTemperature(d),
                        targetTemperature: setPoint.targetTemperature,
                    });
                });
            });
        }

        if (plan.devices) {
            forEach(plan.devices, (deviceID) => {
                this.logger.debug(`Evaluating device ${deviceID})`);

                const device = this.findDevice(deviceID);
                if (device == null) {
                    this.logger.debug("> not found");
                    return;
                }

                targets.push({
                    device: { id: device.id, name: device.name },
                    plan: {
                        id: plan.id,
                        name: plan.name
                    },
                    temperature: this.getMeasuredTemperature(device),
                    targetTemperature: setPoint.targetTemperature
                });
            });
        }

        return targets;
    }

    private async setTemperature(d: AuditedDevice, targetTemperature: number): Promise<boolean> {
        this.logger.debug(`Checking temperature for device ${d.name} (${d.id})`);

        if (!d.ready) {
            this.logger.error(`> Device ${d.name} is not ready (${d.unavailableMessage}).`);
            return false;
        }

        try {
            let value = this.getTargetTemperature(d);
            if (value !== targetTemperature) {
                if (PRODUCTION) {
                    // incremental backoff, 5 retries, max 20s
                    await Retry(async () => { 
                        this.logger.information(`Adjusting temperature for ${d.name} to ${targetTemperature}`);
                        
                        await this.homeyApi.devices.setCapabilityValue({
                            deviceId: d.id,
                            capabilityId: TARGET_TEMPERATURE,
                            value: targetTemperature
                        });

                        this.logger.debug(`> ${d.name} done.`);
                    }, 5, 1000, true, 20000);
                }

                return true;
            }
            else {
                this.logger.error(`> ${d.name} target temperature already set.`);
            }
        } catch (e) {
            this.logger.error(`Failed to set temperature ${d.name} (${d.id}) due to ${e}`);

            this.sendNotification("failed_set_target_temperature", {
                name: d.name,
                value: targetTemperature,
                error: e.name
            });
        }

        return false;
    }

    private sendNotification(name: string, args?: {}) {
        const notification = new Notification({
            excerpt: __(`Notification.${name}`, args)
        });
        notification.register();
    }

    private findZone(zoneId: string): IZone {
        return this.zoneList[zoneId];
    }

    private getTargetTemperature(d: AuditedDevice): number {
        var capability = d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    private getMeasuredTemperature(d: AuditedDevice): number {
        var capability = d.watchedCapabilities.temperature || d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    private findDevice(deviceId: string): AuditedDevice {
        return this.deviceList[deviceId];
    }

    private getDevicesForZone(zoneId: string): AuditedDevice[] {
        return filter(this.deviceList, (d: IDevice) => d.zone === zoneId);
    }
}
