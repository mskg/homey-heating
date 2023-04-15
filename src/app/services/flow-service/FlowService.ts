import { App as HomeyApp, FlowCardTrigger, FlowCardTriggerDevice, FlowToken } from "homey";
import { container, registry, singleton } from "tsyringe";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { HeatingSchedulerService } from "../heating-scheduler";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { SettingsManagerService } from "../settings-manager";
import { ApplyAllAction } from "./ApplyAll";
import { ApplyPlanAction } from "./ApplyPlan";
import { ModeChangedTrigger } from "./ModeChanged";
import { SetLogStateAction } from "./SetLogState";
import { SetModeAction } from "./SetMode";
import { SetPlanStateAction } from "./SetPlanState";
import { SetThermostatOverrideAction } from "./SetThermostatOverride";
import { ThermostatModeChangedTrigger } from "./ThermostatModeChanged";

const FLOWSERVICE_TOKEN = "FlowService";

// to break the cycling dependency
@singleton()
@registry([{ token: FLOWSERVICE_TOKEN, useToken: FlowService }])
export class FlowService {
    private logger: ILogger;
    private modeChangedTrigger!: FlowCardTrigger;
    private thermostatModeChangedTrigger!: FlowCardTriggerDevice;

    private modeToken!: FlowToken;
    private nextDateToken!: FlowToken;

    public get nextDate(): FlowToken {
        return this.nextDateToken;
    }

    public get mode(): FlowToken {
        return this.modeToken;
    }

    public get modeChanged(): FlowCardTrigger {
        return this.modeChangedTrigger;
    }

    public get thermostatModeChanged(): FlowCardTriggerDevice {
        return this.thermostatModeChangedTrigger;
    }

    constructor(private loggerFactory: LoggerFactory) {
        this.logger = this.loggerFactory.createLogger("Flows");
    }

    // whatever goes wrong - we log, hide and dump it
    @trycatchlog(true)
    public async init(app: HomeyApp) {
        // must be lazy as we would have circular dependencies
        const ctx = {
            flow: app.homey.flow,
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
        this.modeToken = await app.homey.flow.createToken("mode", { type: "string", title: app.homey.__("plans.heatingmode.label"), value: null });

        this.logger.information(`Registering token next_schedule`);
        this.nextDateToken = await app.homey.flow.createToken("next_schedule", { type: "string", title: app.homey.__("temperatures.next"), value: null });
    }
}
