import { OperationMode } from "@app/model";
import { HeatingManagerService, HeatingSchedulerService } from "@app/services";
import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

type Body = {
    mode: OperationMode,
};

@injectable()
class PutMode extends ApiBase<Body> {
    constructor(
        private manager: HeatingManagerService) {
        super("PUT", "/mode");
    }

    protected async execute(args: IAPIParams<Body>) {
        const mode: number = args.body.mode;
        this.manager.operationMode = mode;
        return SUCCESS;
    }
}

@injectable()
class GetMode extends ApiBase {
    constructor(private manager: HeatingManagerService) {
        super("GET", "/mode");
    }

    protected async execute() {
        return {mode: this.manager.operationMode};
    }
}

export default [
    PutMode,
    GetMode,
];
