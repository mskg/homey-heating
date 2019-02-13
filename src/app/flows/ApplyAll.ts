
import { FlowContext, flowCardFactory } from "./args";

export const ApplyAllAction = ({ logger, manager }: FlowContext) => {
    return flowCardFactory("apply_all", logger, async (args, state) => {
        await manager.applyPlans();
        return true;
    });
};