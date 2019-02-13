
import { Settings } from "@app/services";
import { flowCardFactory, FlowContext } from "./args";

type ChangeLogArgs = {
    state: string;
};

export const SetLogStateAction = ({ logger, settings }: FlowContext) => {
    return flowCardFactory<ChangeLogArgs>("set_log_state", logger, async (args, state) => {
        settings.set<boolean>(Settings.LogEnabled, args.state === "true");
        return true;
    });
};