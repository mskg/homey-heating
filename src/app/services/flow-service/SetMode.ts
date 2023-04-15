
import { OperationMode } from "@app/model";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeModeArgs = {
    state: string;
};

export function SetModeAction({ flow, logger, manager }: IFlowContext) {
    return flowCardActionFactory<ChangeModeArgs>(flow, "set_mode", logger, async (args, _state) => {
        manager.operationMode = parseInt(args.state, 10) as OperationMode;
        return true;
    });
}
