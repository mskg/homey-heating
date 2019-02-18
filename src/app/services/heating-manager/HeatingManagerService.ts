import { ICalculatedTemperature, IHeatingPlan, ISetPoint, NormalOperationMode, OperationMode, OverrideMode, ThermostatMode } from "@app/model";
import { __, Notification } from "homey";
import { forEach, isEmpty } from "lodash";
import { EventDispatcher, IEvent } from "ste-events";
import { container, singleton } from "tsyringe";
import { HeatingPlanCalculator } from "../calculator";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { FlowService } from "../flow-service";
import { HeatingPlanRepositoryService, PlanChangeEventType } from "../heating-plan-repository";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { InternalSettings, Settings, SettingsManagerService } from "../settings-manager";
import { ISetTemperaturePolicy, PolicyType } from "./types";

export type PlansAppliedEventArgs = {
    plans: IHeatingPlan[],
    schedule: ICalculatedTemperature[],
};

@singleton()
export class HeatingManagerService {
    public get onPlansApplied(): IEvent<HeatingManagerService, PlansAppliedEventArgs> {
        return this.onPlansAppliedDispatcher.asEvent();
    }

    public get onModeChanged(): IEvent<HeatingManagerService, OperationMode> {
        return this.onModeDispatcher.asEvent();
    }

    private onPlansAppliedDispatcher = new EventDispatcher<
        HeatingManagerService, PlansAppliedEventArgs>();

    private onModeDispatcher = new EventDispatcher<
        HeatingManagerService, OperationMode>();

    private isRunning: boolean;
    private logger: ILogger;
    private mode: OperationMode;
    private policy: ISetTemperaturePolicy;

    constructor(
        private plans: HeatingPlanRepositoryService,
        private calc: HeatingPlanCalculator,
        private deviceManager: DeviceManagerService,
        private settings: SettingsManagerService,
        private flow: FlowService,
        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Manager");

        const mode: OperationMode = this.settings.get<OperationMode>(
            InternalSettings.OperationMode, NormalOperationMode.Automatic);

        this.mode = mode;

        this.plans.onChanged.subscribe(async (rep, modifiedPlans) => {
            try {
                await Promise.all(modifiedPlans.map(async (change) => {
                    if (!change.plan.enabled || change.event === PlanChangeEventType.Removed) {
                        this.logger.debug(`Plan ${change.plan.name} (${change.plan.id}) is enabled/was removed - skipp`);
                    } else {
                        await this.applyPlan(change.plan);
                    }
                }));
            } catch (e) {
                this.logger.error("Refresh of plans failed.", e);
            }
        });

        this.policy = container.resolve<ISetTemperaturePolicy>(
            this.settings.get(InternalSettings.SetTemperaturePolicy, PolicyType.Throttled_CheckTemperature));

        this.onModeChanged.subscribe(async () => {
            await this.applyPlans();
            await this.flow.modeChanged.trigger({mode: __(`Modes.${this.mode}`)});
        });
    }

    // is for get and set, we don't care if that fails
    @trycatchlog(true, NormalOperationMode.Automatic)
    public get operationMode() {
        return this.mode;
    }

    public set operationMode(mode: OperationMode) {
        this.logger.information(`Setting mode to`, mode);

        this.mode = mode;
        this.settings.set<number>(InternalSettings.OperationMode, mode);

        if (this.settings.get(Settings.NotifyModeChange, true)) {
            this.sendNotification("set_operation_mode", {
                mode: __(`Modes.${mode}`),
            });
        }

        this.onModeDispatcher.dispatch(this, mode);
    }

    // erors handled by all callers
    public async applyPlans() {
        // scheduler vs normal run
        if (this.isRunning) { return; }

        try {
            this.isRunning = true;
            this.logger.debug("Applying active plans");

            const settings = await this.evaluateActivePlans();
            await this.applySettings(settings);

            this.onPlansAppliedDispatcher.dispatch(this, {
                plans: await this.plans.activePlans,
                schedule: settings,
            });
        } finally {
            this.isRunning = false;
        }
    }

    // erors handled by all callers
    public async applyPlan(plan: IHeatingPlan) {
        const schedule = await this.evaluatePlan(plan);
        await this.applySettings(schedule);

        this.onPlansAppliedDispatcher.dispatch(this, {
            plans: [plan],
            schedule,
        });
    }

    // erors handled by all callers
    public async evaluateActivePlans(): Promise<ICalculatedTemperature[]> {
        const settings: ICalculatedTemperature[] = [];

        forEach(await this.plans.activePlans, (plan) => {
            settings.push(...this.evaluatePlan(plan));
        });

        return settings;
    }

    public evaluatePlan(plan: IHeatingPlan): ICalculatedTemperature[] {
        this.logger.debug(`Evaluating plan ${plan.id}`);

        let setPoint: ISetPoint = null;

        // error in first implementation used number instead of text
        const override = plan.overrides ? (plan.overrides[this.mode] || plan.overrides[OverrideMode[this.mode]]) : null;

        if (plan.thermostatMode != null && plan.thermostatMode !== NormalOperationMode.Automatic) {
            this.logger.debug(`> Plan has thermostat that overrides ${ThermostatMode[plan.thermostatMode]}`);
            return [];
        } else if (override != null) {
            this.logger.debug(`> Plan has override for ${OverrideMode[this.mode]}`);

            const date = new Date();
            setPoint = {
                day: date.getDay(),
                hour: date.getHours(),
                minute: date.getMinutes(),

                targetTemperature: override.targetTemperature,
            };
        } else {
            setPoint = this.calc.getSetPoint(plan);
            if (setPoint == null) { return []; }
        }

        this.logger.debug(`> Target temperature is ${setPoint.targetTemperature}`);
        const targets: ICalculatedTemperature[] = [];

        let targetTemperature = setPoint.targetTemperature as any;
        if (typeof targetTemperature !== "number") {
            this.logger.debug("Setpoint has wrong datatype for temperature, trying to correct", setPoint);
            targetTemperature = parseFloat(targetTemperature);

            // tslint:disable-next-line: use-isnan
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
                } else {
                    this.logger.debug(`> found ${devices.length} device(s)`);
                }

                forEach(devices, (d) => {
                    targets.push({
                        device: { id: d.id, name: d.name },
                        plan: {
                            id: plan.id,
                            name: plan.name,
                        },
                        temperature: this.deviceManager.getMeasuredTemperature(d),
                        targetTemperature,
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
                        name: plan.name,
                    },
                    temperature: this.deviceManager.getMeasuredTemperature(device),
                    targetTemperature,
                });
            });
        }

        return targets;
    }

    public async setTemperature(plan: string, d: AuditedDevice, targetTemperature: number): Promise<void> {
        const result = await this.policy.setTargetTemperature(d, targetTemperature);

        if (!result.success) {
            if (this.settings.get(Settings.NotifySetError, true)) {
                this.sendNotification("failed_set_target_temperature", {
                    name: d.name,
                    value: targetTemperature,
                    error: result.error,
                });
            }
        } else if (!result.skipped) {
            if (this.settings.get(Settings.NotifySetSuccess, true)) {
                this.sendNotification("set_target_temperature", {
                    name: d.name,
                    value: targetTemperature,
                    plan,
                });
            }
        }
    }

    private async applySettings(settings: ICalculatedTemperature[]) {
        this.logger.information(`Applying ${settings.length} settings`, settings.map((s) => {
            return {
                plan: s.plan && `${s.plan.name} (${s.plan.id})`,
                device: s.device && `${s.device.name} (${s.device.id})`,
                temp: s.temperature,
                target: s.targetTemperature,
            };
        }));

        await Promise.all(
            settings.map(async (newSetting) =>
                await this.setTemperature(newSetting.plan.name,
                    this.deviceManager.findDevice(newSetting.device.id),
                    newSetting.targetTemperature),
            ),
        );
    }

    private sendNotification(name: string, args?: {}) {
        const notification = new Notification({
            excerpt: __(`Notification.${name}`, args),
        });
        notification.register();
    }
}
