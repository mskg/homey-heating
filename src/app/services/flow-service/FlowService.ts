import { FlowCardTrigger, FlowCardTriggerDevice } from "homey";
import { container, singleton } from "tsyringe";
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
import { ThermostatModeChangedTrigger, ThermostatModeChangedTriggerTokens } from "./ThermostatModeChanged";

@singleton()
export class FlowService {
    private logger: ILogger;
    private modeChangedTrigger;
    private thermostatModeChangedTrigger;

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

        [ApplyAllAction, ApplyPlanAction, SetLogStateAction, SetModeAction, SetPlanStateAction]
            .forEach((action) => action(ctx));

        this.modeChangedTrigger = ModeChangedTrigger(ctx);
        this.thermostatModeChangedTrigger = ThermostatModeChangedTrigger(ctx);
    }
}
