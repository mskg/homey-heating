
import { Settings } from "../settings-manager";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeLogArgs = {
    state: string;
};

export function SetLogStateAction({ logger, settings }: IFlowContext) {
    return flowCardActionFactory<ChangeLogArgs>("set_log_state", logger, async (args, _state) => {
        settings.set<boolean>(Settings.ConsoleReLogEnabled, args.state === "true");
        return true;
    });
}
