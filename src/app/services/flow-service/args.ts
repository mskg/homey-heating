
import { FlowCard, FlowCardAction, FlowCardTrigger, FlowCardTriggerDevice } from "homey";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { HeatingSchedulerService } from "../heating-scheduler";
import { ILogger } from "../log";
import { SettingsManagerService } from "../settings-manager";

export interface IFlowContext {
    logger: ILogger;
    manager: HeatingManagerService;
    repository: HeatingPlanRepositoryService;
    settings: SettingsManagerService;
    scheduler: HeatingSchedulerService;
}

type RunListener<A, S> = (args: A, state: S) => Promise<boolean>;

export function flowCardActionFactory<A = void, S = void>(name: string, logger: ILogger, func: RunListener<A, S>): FlowCard {
    logger.information(`Registering action ${name}`);

    return new FlowCardAction(name)
        .register()
        .registerRunListener(async (args, state) => {
            try {
                logger.debug(`Executing ${name}`, args, state);
                return await func(args, state);
            } catch (e) {
                logger.error(e, `Action ${name} failed`, "Args", args, "State", state);
                return false;
            }
        });
}

export function flowCardTriggerFactory<T = void, S = void>(name: string, logger: ILogger): FlowCardTrigger<T, S> {
    logger.information(`Registering trigger ${name}`);

    const trigger = new FlowCardTrigger<T, S>(name).register<FlowCardTrigger<T, S>>();
    const orig = trigger.trigger.bind(trigger);

    trigger.trigger = async (tokens, state) => {
        try {
            logger.debug(`Trigger ${name}`, tokens, state);
            return await orig(tokens, state);
        } catch (e) {
            logger.error(e, `Trigger ${name} failed`, "Tokens", tokens, "State", state);
        }
    };

    return trigger;
}

export function flowCardTriggerDeviceFactory<T = void, S = void>(name: string, logger: ILogger): FlowCardTriggerDevice<T, S> {
    logger.information(`Registering trigger ${name}`);

    const trigger = new FlowCardTriggerDevice<T, S>(name).register<FlowCardTriggerDevice<T, S>>();
    const orig = trigger.trigger.bind(trigger);

    trigger.trigger = async (device, tokens, state) => {
        try {
            logger.debug(`Trigger ${name}`, tokens, state);
            return await orig(device, tokens, state);
        } catch (e) {
            logger.error(e, `Trigger ${name} failed`, "Device", device, "Tokens", tokens, "State", state);
        }
    };

    return trigger;
}
