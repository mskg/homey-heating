
import { flowCardActionFactory, IFlowContext } from "./args";

export const ApplyAllAction = ({ logger, manager }: IFlowContext) => {
    return flowCardActionFactory("apply_all", logger, async (args, state) => {
        await manager.applyPlans();
        return true;
    });
};
