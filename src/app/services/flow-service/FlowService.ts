import { __, FlowCardTrigger, FlowCardTriggerDevice, FlowToken } from "homey";
import { container, registry, singleton } from "tsyringe";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { HeatingSchedulerService } from "../heating-scheduler";
import { asynctrycatchlog, ILogger, LoggerFactory } from "../log";
import { SettingsManagerService } from "../settings-manager";
import { ApplyAllAction } from "./ApplyAll";
import { ApplyPlanAction } from "./ApplyPlan";
import { ModeChangedTrigger, ModeChangedTriggerTokens } from "./ModeChanged";
import { SetLogStateAction } from "./SetLogState";
import { SetModeAction } from "./SetMode";
import { SetPlanStateAction } from "./SetPlanState";
import { SetThermostatOverrideAction } from "./SetThermostatOverride";
import { ThermostatModeChangedTrigger, ThermostatModeChangedTriggerTokens } from "./ThermostatModeChanged";

const FLOWSERVICE_TOKEN = "FlowService";

// to break the cycling dependency
@singleton()
@registry([{ token: FLOWSERVICE_TOKEN, useToken: FlowService }])
export class FlowService {
    private logger: ILogger;
    private modeChangedTrigger!: FlowCardTrigger<ModeChangedTriggerTokens, void>;
    private thermostatModeChangedTrigger!: FlowCardTriggerDevice<ThermostatModeChangedTriggerTokens, void>;

    private modeToken!: FlowToken<string>;
    private nextDateToken!: FlowToken<string>;

    public get nextDate(): FlowToken<string> {
        return this.nextDateToken;
    }

    public get mode(): FlowToken<string> {
        return this.modeToken;
    }

    public get modeChanged(): FlowCardTrigger<ModeChangedTriggerTokens, void> {
        return this.modeChangedTrigger;
    }

    public get thermostatModeChanged(): FlowCardTriggerDevice<ThermostatModeChangedTriggerTokens, void> {
        return this.thermostatModeChangedTrigger;
    }

    constructor(private loggerFactory: LoggerFactory) {
        this.logger = this.loggerFactory.createLogger("Flows");
    }

    // whatever goes wrong - we log, hide and dump it
    @asynctrycatchlog(true)
    public async init() {
        // must be lazy as we would have circular dependencies
        const ctx = {
            logger: this.logger,
            manager: container.resolve<HeatingManagerService>(HeatingManagerService),
            repository: container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService),
            scheduler: container.resolve<HeatingSchedulerService>(HeatingSchedulerService),
            settings: container.resolve<SettingsManagerService>(SettingsManagerService),
        };

        [
            ApplyAllAction,
            ApplyPlanAction,
            SetLogStateAction,
            SetModeAction,
            SetPlanStateAction,
            SetThermostatOverrideAction,
        ].forEach((action) => {
            // tslint:disable-next-line: no-empty
            try { action(ctx); } catch { }
        });

        this.modeChangedTrigger = ModeChangedTrigger(ctx);
        this.thermostatModeChangedTrigger = ThermostatModeChangedTrigger(ctx);

        this.logger.information(`Registering token mode`);
        this.modeToken = new FlowToken<string>("mode", { type: "string", title: __("plans.heatingmode.label") });
        await this.modeToken.register();

        this.logger.information(`Registering token next_schedule`);
        this.nextDateToken = new FlowToken<string>("next_schedule", { type: "string", title: __("temperatures.next") });
        await this.nextDateToken.register();
    }
}
