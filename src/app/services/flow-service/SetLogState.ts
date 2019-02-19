
import { Settings } from "../settings-manager";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeLogArgs = {
    state: string;
};

export const SetLogStateAction = ({ logger, settings }: IFlowContext) => {
    return flowCardActionFactory<ChangeLogArgs>("set_log_state", logger, async (args, state) => {
        settings.set<boolean>(Settings.ConsoleReLogEnabled, args.state === "true");
        return true;
    });
};
