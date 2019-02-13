
import { OperationMode } from "@app/model";
import { flowCardFactory, FlowContext } from "./args";

type ChangeModeArgs = {
    state: string;
};

export const SetModeAction = ({ logger, manager, scheduler }: FlowContext) => {
    return flowCardFactory<ChangeModeArgs>("set_mode", logger, async (args, state) => {
        manager.operationMode = parseInt(args.state) as OperationMode;
        await manager.applyPlans();
        await scheduler.start();

        return true;
    });
};