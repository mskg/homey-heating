import { __, Notification } from "homey";
import { filter, find, forEach, isEmpty, map } from "lodash";
import { HeatingPlanCalculator } from "../../helper/HeatingPlanCalculator";
import { IHeatingPlan, ICalculatedTemperature, NormalOperationMode, OperationMode, OverrideMode, ISetPoint, InternalSettings } from "../../model";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { CLASS_THERMOSTAT, HomeyAPIService, IDevice, IHomeyAPI, IZone, TARGET_TEMPERATURE, MEASURE_TEMPERATURE } from "../homey-api";
import { ILogger, LogService } from "../log";
import { ManagerSettings } from "homey";

export class HeatingManagerService {
    private isRunning: boolean;
    private initialized: boolean = false;

    private deviceList: IDevice[];
    private zoneList: IZone[];

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

        (async () => {
            await this.applyPlans();
        })();
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
                (async () => { s.temperature = await this.getTemperature(await this.findDevice(s.device.id)) })()
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

        this.initialized = true;
    }

    private async applySettings(settings: ICalculatedTemperature[]) {
        forEach(settings, async v => {
            if (await this.setTemperature(this.findDevice(v.device.id), v.targetTemperature)) {
                // tslint:disable-next-line: max-line-length
                const notification = new Notification({
                    excerpt: __("thermostat",
                        {
                            name: v.device.name,
                            value: v.targetTemperature,
                            plan: v.plan.name
                        })
                });

                notification.register();
            }
        });
    }

    private evaluatePlan(plan: IHeatingPlan): ICalculatedTemperature[] {
        this.logger.information(`Evaluating plan ${plan.id}`);

        let setPoint: ISetPoint = null;

        const override = plan.overrides ? plan.overrides[this.mode] : null; 
        if (override != null) {
            this.logger.debug(`> Plan has override for ${this.mode}`);

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

        const ci = await d.makeCapabilityInstance<number>(TARGET_TEMPERATURE);
        try {
            if (PRODUCTION) {
                if (ci.value !== targetTemperature) {
                    this.logger.information(`Adjusting temperature for ${d.name} to ${targetTemperature}`);
                    ci.setValue(targetTemperature);

                    return true;
                }
            }
        }
        finally {
            ci.destroy();
        }

        return false;
    }

    private findZone(id: string): IZone {
        return find(this.zoneList, (d: IZone) => d.id === id || d.name === id);
    }

    private findDevice(id: string): IDevice {
        return find(this.deviceList, (d: IDevice) =>
            (d.id === id || d.name === id) && d.class === CLASS_THERMOSTAT);
    }

    private getDevicesForZone(id: string): IDevice[] {
        return filter(this.deviceList, (d: IDevice) =>
            d.zone === id && d.class === CLASS_THERMOSTAT);
    }
}
