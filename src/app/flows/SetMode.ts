
import { OperationMode } from "@app/model";
import { flowCardFactory, IFlowContext } from "./args";

type ChangeModeArgs = {
    state: string;
};

export const SetModeAction = ({ logger, manager, scheduler }: IFlowContext) => {
    return flowCardFactory<ChangeModeArgs>("set_mode", logger, async (args, state) => {
        manager.operationMode = parseInt(args.state, 10) as OperationMode;
        return true;
    });
};
