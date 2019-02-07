import { IScheduleInformation } from "../app/model";
import { ApiBase } from "./types";

class GetSchedule extends ApiBase {
    constructor() {
        super("GET", "/schedule");
    }

    public async fn(args, callback) {
        this.logger.debug("GET schedule");

        const result: IScheduleInformation = {
            mode: this.myApp.manager.operationMode,
            nextDate: this.myApp.scheduler.nextSchedule,
            temperatures: await this.myApp.manager.evaluateActivePlans(),
        };

        // callback follows ( err, result )
        callback(null, result);
    }
}



export default [
    new GetSchedule(),
];