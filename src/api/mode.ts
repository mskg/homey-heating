import { OperationMode } from "@app/model";
import { HeatingManagerService, HeatingSchedulerService } from "@app/services";
import { ApiBase, SUCCESS, IAPIParams } from "./types";
import { injectable } from "tsyringe";

type Body = {
    mode: OperationMode;
}

@injectable()
class PutMode extends ApiBase<Body> {
    constructor(private manager: HeatingManagerService,
        private scheduler: HeatingSchedulerService) {
        super("PUT", "/mode");
    }

    protected async execute(args: IAPIParams<Body>) {
        const mode: number = args.body.mode;

        this.manager.operationMode = mode;
        await this.manager.applyPlans();
        await this.scheduler.start();

        return SUCCESS;
    }
}

@injectable()
class GetMode extends ApiBase {
    constructor(private manager: HeatingManagerService) {
        super("GET", "/mode");
    }

    protected async execute() {
        return this.manager.operationMode;
    }
}

export default [
    PutMode,
    GetMode
];