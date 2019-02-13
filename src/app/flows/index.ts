import { ApplyAllAction } from "./ApplyAll";
import { ApplyPlanAction } from "./ApplyPlan";
import { IFlowContext } from "./args";
import { SetLogStateAction } from "./SetLogState";
import { SetModeAction } from "./SetMode";
import { SetPlanStateAction } from "./SetPlanState";

type FlowActionCardFactory = (a: IFlowContext) => any;

export const Actions: FlowActionCardFactory[] = [
    ApplyAllAction, ApplyPlanAction, SetLogStateAction, SetModeAction, SetPlanStateAction,
];
