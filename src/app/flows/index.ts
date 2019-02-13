import { FlowContext } from "./args";
import { ApplyAllAction } from "./ApplyAll";
import { ApplyPlanAction } from "./ApplyPlan";
import { SetLogStateAction } from "./SetLogState";
import { SetModeAction } from "./SetMode";
import { SetPlanStateAction } from "./SetPlanState";

type FlowActionCardFactory = (a: FlowContext) => any;

export const Actions:  FlowActionCardFactory[] = [
    ApplyAllAction, ApplyPlanAction, SetLogStateAction, SetModeAction, SetPlanStateAction
];