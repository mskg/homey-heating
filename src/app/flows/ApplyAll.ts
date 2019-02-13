
import { flowCardFactory, IFlowContext } from "./args";

export const ApplyAllAction = ({ logger, manager }: IFlowContext) => {
    return flowCardFactory("apply_all", logger, async (args, state) => {
        await manager.applyPlans();
        return true;
    });
};
