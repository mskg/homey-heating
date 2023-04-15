
import { flowCardActionFactory, IFlowContext } from "./args";

export function ApplyAllAction({ flow, logger, manager }: IFlowContext) {
    return flowCardActionFactory(flow, "apply_all", logger, async (_args, _state) => {
        await manager.applyPlans();
        return true;
    });
}
