import { IScheduleInformation } from "@app/model";
import { HeatingManagerService, HeatingSchedulerService } from "@app/services";
import { injectable } from "tsyringe";
import { ApiBase } from "./types";

@injectable()
class GetSchedule extends ApiBase {
    constructor(
        private manager: HeatingManagerService,
        private scheduler: HeatingSchedulerService,
    ) {
        super("GET", "/schedule");
    }

    protected async execute() {
        return {
            mode: this.manager.operationMode,
            nextDate: this.scheduler.nextSchedule,
            temperatures: await this.manager.evaluateActivePlans(),
        } as IScheduleInformation;
    }
}

export default [
    GetSchedule,
];
