import { ManagerSettings, Notification, __ } from "homey";
import { filter, forEach, isEmpty, throttle } from "lodash";
import { HeatingPlanCalculator } from "../../helper/HeatingPlanCalculator";
import { ICalculatedTemperature, IHeatingPlan, InternalSettings, ISetPoint, NormalOperationMode, OperationMode, OverrideMode } from "../../model";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { CLASS_THERMOSTAT, HashedList, HomeyAPIService, IDevice, IHomeyAPI, IZone, MEASURE_TEMPERATURE, TARGET_TEMPERATURE } from "../homey-api";
import { ILogger, LogService } from "../log";
import AsyncThrottle from "../../helper/AsyncThrottle";

export class HeatingManagerService {
    private isRunning: boolean;
    private initialized: boolean = false;

    private deviceList: HashedList<IDevice>;
    private zoneList: HashedList<IZone>;

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
        this.logger.information(`Setting mode to ${mode}`);

        this.mode = mode;
        ManagerSettings.set(InternalSettings.OperationMode, mode);
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

        forEach((await this.plans.activePlans), (plan) => {
            settings.push(...this.evaluatePlan(plan));
        });

        // read temperatures
        await Promise.all(
            settings.map(s => 
                (async () => { s.temperature = await this.getTemperature(this.findDevice(s.device.id)) })
                () // execute the function to return the promise
            )
        );

        return settings;
    }

    public async applyPlan(plan: IHeatingPlan) {
        await this.init();
        await this.applySettings(await this.evaluatePlan(plan));
    }
    
    private async init(force: boolean = false) {
        if (this.initialized && !force) { return; }

        this.homeyApi = await HomeyAPIService.getInstance();

        this.deviceList = await this.homeyApi.devices.getDevices();
        this.zoneList = await this.homeyApi.zones.getZones();

        this.homeyApi.devices.on("device.create", (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was created.`);
            this.deviceList[device.id] = device;
        });

        this.homeyApi.devices.on("device.delete", (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was removed.`);
            delete this.deviceList[device.id];
        });

        this.homeyApi.zones.on("zone.create", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was created.`);
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

                    // tslint:disable-next-line: max-line-length
                    const notification = new Notification({
                        excerpt: __("thermostat",
                            {
                                name: newSetting.device.name,
                                value: newSetting.targetTemperature,
                                plan: newSetting.plan.name
                            })
                    });
                    notification.register();
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
                        // temperature: await this.getTemperature(d),
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
                    targetTemperature: setPoint.targetTemperature
                });
            });
        }

        return targets;
    }

    public async getTemperature(d: IDevice): Promise<number> {        
        const ci = await d.makeCapabilityInstance<number>(MEASURE_TEMPERATURE);
        try {
            return ci.value;
        }
        finally {
            ci.destroy();
        }
    }

    private async setTemperature(d: IDevice, targetTemperature: number): Promise<boolean> {
        this.logger.debug(`Checking temperature for device ${d.name} (${d.id})`);

        if (!d.ready) {
            this.logger.error(`> Device ${d.name} is not ready (${d.unavailableMessage}).`);
            return false;
        }

        try {
            const ci = await d.makeCapabilityInstance<number>(TARGET_TEMPERATURE);
            try {
                if (ci.value !== targetTemperature) {
                    this.logger.information(`Adjusting temperature for ${d.name} to ${targetTemperature}`);

                    if (PRODUCTION) {
                        ci.setValue(targetTemperature);
                    }

                    return true;
                }
            }
            finally {
                ci.destroy();
            }
        } catch (e) {
            // Todo: Issue #25
            this.logger.error(`Failed to set temperature ${d.name} (${d.id}) due to ${e}`);

            const notification = new Notification({
                excerpt: __("failed_thermostat",
                    {
                        name: d.name,
                        value: targetTemperature
                    })
            });
            notification.register();
        }

        return false;
    }

    private findZone(zoneId: string): IZone {
        return this.zoneList[zoneId];

        // return find(this.zoneList, (d: IZone) => d.id === id || d.name === id);
    }

    private findDevice(deviceId: string): IDevice {
        var d = this.deviceList[deviceId];
        return d.class === CLASS_THERMOSTAT ? d : null;

        // return find(this.deviceList, (d: IDevice) =>
        //     (d.id === id || d.name === id) && d.class === CLASS_THERMOSTAT);
    }

    private getDevicesForZone(zoneId: string): IDevice[] {
        return filter(this.deviceList, (d: IDevice) =>
            d.zone === zoneId && d.class === CLASS_THERMOSTAT);
    }
}
