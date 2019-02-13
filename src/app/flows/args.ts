
import { HeatingManagerService, HeatingPlanRepositoryService, HeatingSchedulerService, ILogger, SettingsManagerService } from "@app/services";
import { FlowCardAction } from "homey";

export type FlowContext = {
    logger: ILogger,
    manager: HeatingManagerService,
    repository: HeatingPlanRepositoryService,
    settings: SettingsManagerService,
    scheduler: HeatingSchedulerService,
};

type RunListener<A, S> = (args: A, state: S) => Promise<boolean>;

export function flowCardFactory<A = void, S = void>(name: string, logger: ILogger, func: RunListener<A, S>) {    
    logger.information(`Registering action ${name}`);

    return new FlowCardAction(name)
        .register()
        .registerRunListener(async (args, state) => {
            try {
                logger.debug(`Executing ${name}`, args, state);
                return await func(args, state);
            }
            catch (e) {
                logger.error(`${name} failed`, "Args", args, "State", state, "Error", e);
                return false;
            }
        });
};
