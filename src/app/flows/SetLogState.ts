
import { Settings } from "@app/services";
import { flowCardFactory, IFlowContext } from "./args";

type ChangeLogArgs = {
    state: string;
};

export const SetLogStateAction = ({ logger, settings }: IFlowContext) => {
    return flowCardFactory<ChangeLogArgs>("set_log_state", logger, async (args, state) => {
        settings.set<boolean>(Settings.LogEnabled, args.state === "true");
        return true;
    });
};
