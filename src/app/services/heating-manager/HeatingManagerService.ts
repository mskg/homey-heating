import { ICalculatedTemperature, IHeatingPlan, ISetPoint, NormalOperationMode, OperationMode, OverrideMode } from "@app/model";
import { Notification, __ } from "homey";
import { forEach, isEmpty } from "lodash";
import { container, singleton } from "tsyringe";
import { HeatingPlanCalculator } from "../calculator";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { ILogger, LoggerFactory, trycatchlog, asynctrycatchlog } from "../log";
import { InternalSettings, SettingsManagerService } from "../settings-manager";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@singleton()
export class HeatingManagerService {
    private isRunning: boolean;
    private logger: ILogger;
    private mode: OperationMode;
    private policy: ISetTemperaturePolicy;

    constructor(
        private plans: HeatingPlanRepositoryService,
        private calc: HeatingPlanCalculator,
        private deviceManager: DeviceManagerService,
        private settings: SettingsManagerService,
        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Manager");

        const mode: OperationMode = this.settings.get<OperationMode>(InternalSettings.OperationMode, NormalOperationMode.Automatic);
        this.mode = mode;

        this.plans.onChanged.subscribe(async () => {
            try {
                await this.applyPlans();
            }
            catch (e) {
                this.logger.error("Refresh of plans failed.", e);
            }
        });

        this.policy = container.resolve<ISetTemperaturePolicy>(
            this.settings.get(InternalSettings.SetTemperaturePolicy, PolicyType.Throtteled_CheckTemperature));
    }

    // is for get and set, we don't care if that fails
    @trycatchlog(true, NormalOperationMode.Automatic)
    public get operationMode() {
        return this.mode;
    }

    public set operationMode(mode: OperationMode) {
        this.logger.information(`Setting mode to`, mode);

        this.mode = mode;
        this.settings.set(InternalSettings.OperationMode, mode);

        this.sendNotification("set_operation_mode", {
            mode: __(`Modes.${mode}`)
        });
    }

    // erors handled by all callers
    public async applyPlans() {
        // scheduler vs normal run
        if (this.isRunning) { return; }

        try {
            this.isRunning = true;
            this.logger.debug("Applying active plans");

            var settings = await this.evaluateActivePlans();
            await this.applySettings(settings);
        } finally {
            this.isRunning = false;
        }
    }

    // erors handled by all callers
    public async evaluateActivePlans(): Promise<ICalculatedTemperature[]> {
        const settings: ICalculatedTemperature[] = [];

        forEach(await this.plans.activePlans, (plan) => {
            settings.push(...this.evaluatePlan(plan));
        });

        return settings;
    }

    // erors handled by all callers
    public async applyPlan(plan: IHeatingPlan) {
        await this.applySettings(await this.evaluatePlan(plan));
    }

    private async applySettings(settings: ICalculatedTemperature[]) {
        await Promise.all(
            settings.map(async newSetting => 
                await this.setTemperature(newSetting.plan.name, 
                    this.deviceManager.findDevice(newSetting.device.id), 
                    newSetting.targetTemperature)
            )
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

        let targetTemperature = setPoint.targetTemperature as any;
        if (typeof targetTemperature !== "number") {
            this.logger.debug("Setpoint has wrong datatype for temperature, trying to correct", setPoint);
            targetTemperature = parseFloat(targetTemperature);

            if (targetTemperature === NaN) {
                this.logger.error("Setpoint has wrong datatype for temperature", setPoint);
                return [];
            }
        }

        if (plan.zones) {
            forEach(plan.zones, (zoneId) => {
                this.logger.debug(`Evaluating zone ${zoneId}`);

                const zone = this.deviceManager.findZone(zoneId);
                if (zone == null) {
                    this.logger.debug("> not found");
                    return;
                }

                const devices = this.deviceManager.getDevicesForZone(zone.id);
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
                        temperature: this.deviceManager.getMeasuredTemperature(d),
                        targetTemperature: targetTemperature,
                    });
                });
            });
        }

        if (plan.devices) {
            forEach(plan.devices, (deviceID) => {
                this.logger.debug(`Evaluating device ${deviceID})`);

                const device = this.deviceManager.findDevice(deviceID);
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
                    temperature: this.deviceManager.getMeasuredTemperature(device),
                    targetTemperature: targetTemperature
                });
            });
        }

        return targets;
    }

    private async setTemperature(plan: string, d: AuditedDevice, targetTemperature: number): Promise<void> {
        const result = await this.policy.setTargetTemperature(d, targetTemperature);

        if (!result.success) {
            this.sendNotification("failed_set_target_temperature", {
                name: d.name,
                value: targetTemperature,
                error: result.error
            });
        } else {
            this.sendNotification("set_target_temperature", {
                name: d.name,
                value: targetTemperature,
                plan: plan
            })
        }
    }

    private sendNotification(name: string, args?: {}) {
        const notification = new Notification({
            excerpt: __(`Notification.${name}`, args)
        });
        notification.register();
    }
}
