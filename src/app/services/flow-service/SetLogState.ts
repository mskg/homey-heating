
import { Settings } from "@app/services";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeLogArgs = {
    state: string;
};

export const SetLogStateAction = ({ logger, settings }: IFlowContext) => {
    return flowCardActionFactory<ChangeLogArgs>("set_log_state", logger, async (args, state) => {
        settings.set<boolean>(Settings.LogEnabled, args.state === "true");
        return true;
    });
};
