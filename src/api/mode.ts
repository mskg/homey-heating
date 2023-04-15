import { OperationMode } from "@app/model";
import { HeatingManagerService } from "@app/services";
import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

type Body = {
    mode: OperationMode,
};

@injectable()
export class PutMode extends ApiBase<Body> {
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
export class GetMode extends ApiBase {
    constructor(private manager: HeatingManagerService) {
        super("GET", "/mode");
    }

    protected async execute() {
        return {mode: this.manager.operationMode};
    }
}
