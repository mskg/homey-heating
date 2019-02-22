
import { flowCardActionFactory, IFlowContext } from "./args";

export function ApplyAllAction({ logger, manager }: IFlowContext) {
    return flowCardActionFactory("apply_all", logger, async (_args, _state) => {
        await manager.applyPlans();
        return true;
    });
}
