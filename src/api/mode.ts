import { OperationMode } from "../app/model";
import { ApiBase } from "./types";

class PutMode extends ApiBase {
    constructor() {
        super("PUT", "/mode");
    }

    public async fn(args, callback) {
        this.logger.debug("PUT mode");

        const mode: number = args.body.mode;
        this.myApp.manager.operationMode = mode as OperationMode;

        await this.myApp.manager.applyPlans();
        await this.myApp.scheduler.start();

        callback(null, null);
    }
}

class GetMode extends ApiBase {
    constructor() {
        super("GET", "/mode");
    }

    public fn(args, callback) {
        this.logger.debug("GET mode");
        callback(null, this.myApp.manager.operationMode);
    }
}


export default [
    new PutMode(),
    new GetMode()
];