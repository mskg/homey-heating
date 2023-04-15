
import { FlowCardTrigger } from "homey";
import { flowCardTriggerFactory, IFlowContext } from "./args";

export type ModeChangedTriggerTokens = {
    mode: string,
};

export function ModeChangedTrigger({ flow, logger }: IFlowContext): FlowCardTrigger {
    return flowCardTriggerFactory(flow, "mode_changed", logger);
}
