
import { FlowCard, FlowCardTrigger, FlowCardTriggerDevice } from "homey";
import { App as HomeyApp } from "homey";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { HeatingSchedulerService } from "../heating-scheduler";
import { ILogger } from "../log";
import { SettingsManagerService } from "../settings-manager";

type FlowManager = HomeyApp["homey"]["flow"];

export interface IFlowContext {
    flow: FlowManager;
    logger: ILogger;
    manager: HeatingManagerService;
    repository: HeatingPlanRepositoryService;
    settings: SettingsManagerService;
    scheduler: HeatingSchedulerService;
}

type RunListener<A, S> = (args: A, state: S) => Promise<boolean>;

export function flowCardActionFactory<A = void, S = void>(flow: FlowManager, name: string, logger: ILogger, func: RunListener<A, S>): FlowCard {
    logger.information(`Registering action ${name}`);

    return flow.getActionCard(name)
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

export function flowCardTriggerFactory(flow: FlowManager, name: string, logger: ILogger): FlowCardTrigger {
    logger.information(`Registering trigger ${name}`);

    const trigger = flow.getTriggerCard(name);
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

export function flowCardTriggerDeviceFactory(flow: FlowManager, name: string, logger: ILogger): FlowCardTriggerDevice {
    logger.information(`Registering trigger ${name}`);

    const trigger = flow.getDeviceTriggerCard(name);
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
