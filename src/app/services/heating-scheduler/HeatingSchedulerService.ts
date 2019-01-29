
import { ManagerCron } from "homey";
import { find, first, forEach, sortBy } from "lodash";
import { Mutex } from "../../helper/Mutex";
import { IHeatingPlan, NormalOperationMode, OverrideMode } from "../../model/heating";
import { HeatingManagerService } from "../heating-manager";
import { IZone } from "../homey-api";
import { ILogger, LogService } from "../log";

export class HeatingSchedulerService {
    private mutex: Mutex = new Mutex();
    private logger: ILogger;
    private manager: HeatingManagerService;

    constructor(manager: HeatingManagerService) {
        this.logger = LogService.createLogger("Scheduler");
        this.manager = manager;
    }

    public async stop() {
        const unlock = await this.mutex.lock();

        try {
            this.logger.information("Stop");
            await ManagerCron.unregisterAllTasks();
        } finally {
            unlock();
        }
    }

    public async start() {
        const unlock = await this.mutex.lock();

        try {
            this.logger.information("Start");
            await this.registerTasks();
        } finally {
            unlock();
        }
    }

    // we are dump now => we check everything
    private async registerTasks() {
        this.logger.debug("Updating Cron");

        await ManagerCron.unregisterAllTasks();

        if (this.manager.operationMode == OverrideMode.Holiday) {
            this.logger.information(`Mode is away, no check required.`);
            return;
        }

        let resetMode = false;

        const allDates: Date[] = [];
        if (this.manager.operationMode == OverrideMode.DayAtHome 
            || this.manager.operationMode == OverrideMode.Sleep 
            || this.manager.operationMode == OverrideMode.DayAway)
        {
            // check again tomorrow
            const eod = new Date();                
            eod.setHours(0,0,0,0);
            eod.setDate(eod.getDate() + 1);

            // Test
            // eod.setSeconds(eod.getSeconds()+10);

            resetMode = true;
            allDates.push(eod);
        }
        else {
            const plans = await this.manager.repository.activePlans;
            plans.forEach((plan) => {
                this.logger.debug(`Checking plan ${plan.id}`);
            
                const next = this.manager.calculator.getNextSchedule(plan);
                if (next != null) {
                    allDates.push(next);
                }
            });
        }

        // do we need to convert to ms?
        const next = first(sortBy(allDates, ((d: Date) => d)));

        if (next == null) {
            this.logger.information(`No execution planned.`);
            return;
        }

        this.logger.information(`Next execution is at ${next.toLocaleString()}`);

        const task = await ManagerCron.registerTask("HeatingManagerService", next, resetMode);
        task.once("run", (data) => {
            try {
                if (data) {
                    this.logger.information("Reverting to normal mode");
                    this.manager.operationMode = NormalOperationMode.Automatic;
                }

                this.logger.information("Execute");
                this.manager.applyPlans();
            } finally {
                this.registerTasks();
            }
        });
    }
}
