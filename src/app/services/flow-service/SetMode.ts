
import { OperationMode } from "@app/model";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeModeArgs = {
    state: string;
};

export const SetModeAction = ({ logger, manager, scheduler }: IFlowContext) => {
    return flowCardActionFactory<ChangeModeArgs>("set_mode", logger, async (args, state) => {
        manager.operationMode = parseInt(args.state, 10) as OperationMode;
        return true;
    });
};
