
import { FlowCardTrigger } from "homey";
import { flowCardTriggerFactory, IFlowContext } from "./args";

export type ModeChangedTriggerTokens = {
    mode: string,
};

export const ModeChangedTrigger = ({ logger }: IFlowContext): FlowCardTrigger<ModeChangedTriggerTokens, void> => {
    return flowCardTriggerFactory("mode_changed", logger);
};
