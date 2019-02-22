import { ICalculatedTemperature, IGroupedCalculatedTemperature, IHeatingPlan, NormalOperationMode, OperationMode, OverrideMode, ThermostatMode } from "@app/model";
import { __, Notification } from "homey";
import { forEach, groupBy, isEmpty, map } from "lodash";
import { EventDispatcher, IEvent } from "ste-events";
import { container, inject, singleton } from "tsyringe";
import { HeatingPlanCalculator } from "../calculator";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { FlowService } from "../flow-service";
import { HeatingPlanRepositoryService, PlanChangeEventType } from "../heating-plan-repository";
import { ICategoryLogger, LoggerFactory, trycatchlog } from "../log";
import { InternalSettings, Settings, SettingsManagerService } from "../settings-manager";
import { ITemperatureConflictPolicy, TemperatureConflictPolicy } from "./TemperatureConflictPolicy";
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
    private logger: ICategoryLogger;
    private mode!: OperationMode;
    private setTemperaturePolicy: ISetTemperaturePolicy;
    private planConflictPolicy: ITemperatureConflictPolicy;

    constructor(
        private plans: HeatingPlanRepositoryService,
        private calc: HeatingPlanCalculator,
        private deviceManager: DeviceManagerService,
        private settings: SettingsManagerService,
        @inject("FlowService") private flow: FlowService,
        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Manager");
        this.isRunning = false;

        this.mode = this.settings.get<OperationMode>(
            InternalSettings.OperationMode, NormalOperationMode.Automatic) as OperationMode;

        // retry, throttle, ...
        this.setTemperaturePolicy = container.resolve<ISetTemperaturePolicy>(
            this.settings.get(InternalSettings.SetTemperaturePolicy, PolicyType.Throttled_CheckTemperature) as string);

        // min, max, ...
        this.planConflictPolicy = container.resolve<ITemperatureConflictPolicy>(
            this.settings.get(InternalSettings.PlanConflictPolicy, TemperatureConflictPolicy.Max) as string);

        // repository was modified
        this.plans.onChanged.subscribe(async (_rep, modifiedPlans) => {
            try {
                await Promise.all(modifiedPlans.map(async (change) => {
                    if (!change.plan.enabled || change.event === PlanChangeEventType.Removed) {
                        this.logger.debug(`Plan ${change.plan.name} (${change.plan.id}) is enabled/was removed - skipp`);
                    } else {
                        await this.applyPlan(change.plan);
                    }
                }));
            } catch (e) {
                this.logger.error(e, "Refresh of plans failed.");
            }
        });

        // mode was ticked
        this.onModeChanged.subscribe(async () => {
            if (this.flow.mode != null) { this.flow.mode.setValue(__(`Modes.${this.mode}`)); }
            await this.flow.modeChanged.trigger({ mode: __(`Modes.${this.mode}`) });

            if (this.settings.get(Settings.NotifyModeChange, true)) {
                this.sendNotification("set_operation_mode", {
                    mode: __(`Modes.${this.mode}`),
                });
            }

            await this.applyPlans();
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

        this.onModeDispatcher.dispatch(this, mode);
    }

    public async init() {
        if (this.flow.mode != null) { this.flow.mode.setValue(__(`Modes.${this.mode}`)); }
        await this.applyPlans();
    }

    // erors handled by all callers
    public async applyPlans() {
        // scheduler vs normal run
        if (this.isRunning) { return; }

        try {
            this.isRunning = true;
            this.logger.debug("Applying active plans");

            const settings = await this.evaluateActivePlans();
            const conflictFree = this.resolveConflicts(settings);

            await this.applySettings(conflictFree);

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
        // one plan can not conflict itself
        await this.applySettings(schedule.map((p) => ({...p, conflictingPlans: [p.plan]})));

        this.onPlansAppliedDispatcher.dispatch(this, {
            plans: [plan],
            schedule,
        });
    }

    // erors handled by all callers
    public async evaluateActivePlans(): Promise<IGroupedCalculatedTemperature[]> {
        const settings: ICalculatedTemperature[] = [];

        forEach(await this.plans.activePlans, (plan) => {
            settings.push(...this.evaluatePlan(plan));
        });

        return this.resolveConflicts(settings);
    }

    public evaluatePlan(plan: IHeatingPlan): ICalculatedTemperature[] {
        const planLogger = this.logger.createSubLogger(__PRODUCTION__ ? plan.id : (plan.name || ""));
        planLogger.debug("Evaluating");

        // if there is no devices, we are done
        const devices = this.expandPlan(plan);
        if (devices == null || devices.length === 0) { return []; }

        // where do we need to go?
        let targetTemperature = 0;
        const thermostatMode = plan.thermostatMode || NormalOperationMode.Automatic;

        // error in first implementation used number instead of text
        const planOverrides = plan.overrides ? (plan.overrides[this.mode] || plan.overrides[OverrideMode[this.mode] as unknown as OverrideMode]) : null;

        if (thermostatMode != null && thermostatMode !== NormalOperationMode.Automatic) {
            planLogger.debug(`Thermostat overrides ${ThermostatMode[thermostatMode]}`);

            // we look at any of our devices ... which should be ok anyhow
            targetTemperature = this.deviceManager.getTargetTemperature(devices[0]);
        } else if (planOverrides != null) {
            planLogger.debug(`Plan override for ${OverrideMode[this.mode]}`);
            targetTemperature = planOverrides.targetTemperature;
        } else {
            const setPoint = this.calc.getSetPoint(plan);
            if (setPoint == null) {
                planLogger.debug(`Plan has not setpoints, done.`);
                return [];
            }

            targetTemperature = setPoint.targetTemperature as any;
            if (typeof targetTemperature !== "number") {
                planLogger.information("Setpoint has wrong datatype for temperature, trying to correct", setPoint);
                targetTemperature = parseFloat(targetTemperature);

                if (isNaN(targetTemperature)) {
                    // we don't fail hard here
                    planLogger.error(null, "Setpoint has wrong datatype for temperature", setPoint);
                    return [];
                }
            }
        }

        planLogger.debug(`Calculated target temperature is ${targetTemperature}`);

        return devices.map((device) => ({
            device: { id: device.id, name: device.name },
            plan: {
                id: plan.id,
                name: plan.name,
            },
            temperature: this.deviceManager.getMeasuredTemperature(device),
            targetTemperature,
            thermostatMode,
        }));
    }

    public async setTemperature(planName: string, device: AuditedDevice, targetTemperature: number): Promise<void> {
        const result = await this.setTemperaturePolicy.setTargetTemperature(device, targetTemperature);

        if (!result.success) {
            if (this.settings.get(Settings.NotifySetError, true)) {
                this.sendNotification("failed_set_target_temperature", {
                    name: device.name,
                    value: targetTemperature,
                    error: result.error,
                });
            }
        } else if (!result.skipped) {
            if (this.settings.get(Settings.NotifySetSuccess, true)) {
                this.sendNotification("set_target_temperature", {
                    name: device.name,
                    value: targetTemperature,
                    plan: planName,
                });
            }
        }
    }

    private resolveConflicts(settings: ICalculatedTemperature[]): IGroupedCalculatedTemperature[] {
        // there can still be multiple plans with setpoints for the same device
        const groups = map(groupBy(settings, (s: ICalculatedTemperature) => s.device.id),
            (groupedSettings /*, deviceId*/) => {
                const calculated = this.planConflictPolicy.resolve(groupedSettings) as ICalculatedTemperature;

                return {
                    device: calculated.device,
                    plan: calculated.plan,
                    thermostatMode: calculated.thermostatMode,
                    conflictingPlans: groupedSettings.map((s) => s.plan),
                    targetTemperature: calculated.targetTemperature,
                    temperature: calculated.temperature, // same device, no problem here
                };
            });

        return groups;
    }

    private expandPlan(plan: IHeatingPlan): AuditedDevice[] {
        const planLogger = this.logger.createSubLogger(__PRODUCTION__ ? plan.id : (plan.name || ""));
        const result: AuditedDevice[] = [];

        if (plan.zones) {
            forEach(plan.zones, (zoneId) => {
                const zone = this.deviceManager.findZone(zoneId);
                if (zone == null) {
                    planLogger.information(`Zone ${zoneId} not found`);
                    return;
                }

                planLogger.debug(`Looking at zone ${zoneId}`);

                const devices = this.deviceManager.getDevicesForZone(zone.id);
                if (isEmpty(devices)) {
                    planLogger.debug("No devices found");
                    return;
                } else {
                    planLogger.debug(`Found ${devices.length} device(s)`);
                }

                result.push(...devices);
            });
        }

        if (plan.devices) {
            forEach(plan.devices, (deviceID) => {
                const device = this.deviceManager.findDevice(deviceID);
                if (device == null) {
                    planLogger.information(`Device ${deviceID} not found`);
                    return;
                }

                planLogger.debug(`Add device ${deviceID})`);
                result.push(device);
            });
        }

        planLogger.debug(`Expanded to ${result.length} devices`);
        return result;
    }

    private async applySettings(settings: IGroupedCalculatedTemperature[]) {
        // filter out thermostat overrides, those don't need to be applied
        const groups = settings.filter((f) => f.thermostatMode === NormalOperationMode.Automatic);

        // debug
        this.logger.information(`Applying ${groups.length} settings`, groups.map((s) => ({
            plans: s.conflictingPlans && s.conflictingPlans.map((p) => `${p.name} (${p.id})`),
            device: s.device && `${s.device.name} (${s.device.id})`,
            temperature: s.temperature,
            targetTemperature: s.targetTemperature,
        })));

        await Promise.all(
            groups.map(async (newSetting) =>
                await this.setTemperature(newSetting.conflictingPlans.map((p) => p.name).join(", "),
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
