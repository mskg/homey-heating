
import { Mutex, slotTime, synchronize } from "@app/helper";
import { IHeatingPlan, NormalOperationMode, OverrideMode, ThermostatMode } from "@app/model";
import { ManagerCron } from "homey";
import { first, groupBy, map, sortBy, unionBy } from "lodash";
import { inject, singleton } from "tsyringe";
import { HeatingPlanCalculator } from "../calculator";
import { FlowService } from "../flow-service";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { ICategoryLogger, LoggerFactory, trycatchlog } from "../log";
import { InternalSettings, SettingsManagerService } from "../settings-manager";

declare type TaskNames = "schedule" | "cleanup";

@singleton()
export class HeatingSchedulerService {
    private static Lock = new Mutex();

    // api only, null is ok
    @trycatchlog(true, null)
    public get nextSchedule(): Date | null {
        return this.next;
    }

    private logger: ICategoryLogger;
    private next: Date | null = null;
    private isRunning = false;

    constructor(
        private manager: HeatingManagerService,
        private calculator: HeatingPlanCalculator,
        private repository: HeatingPlanRepositoryService,
        private settings: SettingsManagerService,
        @inject("FlowService") private flow: FlowService,

        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Scheduler");

        this.repository.onChanged.subscribe(this.handleOnChanged.bind(this));
        this.manager.onModeChanged.subscribe(this.handleOnChanged.bind(this));
    }

    // we live on our own, ok to kill
    @trycatchlog(true)
    @synchronize(HeatingSchedulerService.Lock)
    public async stop() {
        this.logger.information("Stop");
        await ManagerCron.unregisterAllTasks();
    }

    // we live on our own, ok to kill
    @trycatchlog(true)
    public async start() {
        this.logger.information("Start");
        await this.registerTasks();
    }

    // we live on our own, ok to kill
    @trycatchlog(true)
    private async handleOnChanged() {
        if (!this.isRunning) {
            await this.start();
        } else {
            this.logger.debug("Ignoring event, running");
        }
    }

    // we live on our own, ok to kill
    @trycatchlog(true)
    private async scheduleTask(plans: IHeatingPlan[]) {
        try {
            this.isRunning = true;
            const logger = this.logger.createSubLogger("Plans");
            logger.information("Running", plans.map((p) => `${p.name} (${p.id})`));

            await Promise.all(
                plans.map(async (p) =>
                    await this.manager.applyPlan(p)));
        } finally {
            this.isRunning = false;
            await this.registerTasks();
        }
    }

    // we live on our own, ok to kill
    @trycatchlog(true)
    private async cleanupTask(plans: IHeatingPlan[]) {
        try {
            this.isRunning = true;
            const logger = this.logger.createSubLogger("Overrides");
            logger.information("Running");

            const allPlans = await this.repository.plans;
            const modifiedPlans: IHeatingPlan[] = [];

            allPlans.forEach((plan) => {
                if (plan.thermostatMode === ThermostatMode.OverrideDay) {
                    logger.information(`Reset thermostat mode of ${plan.id}`);

                    plan.thermostatMode = NormalOperationMode.Automatic;
                    modifiedPlans.push(plan);
                }
            });

            if (modifiedPlans.length !== 0) {
                await this.repository.update(modifiedPlans);
            }

            if (this.manager.operationMode === OverrideMode.DayAtHome
                || this.manager.operationMode === OverrideMode.DayAway
                || this.manager.operationMode === OverrideMode.Sleep) {

                logger.information("Reverting to normal mode");
                this.manager.operationMode = NormalOperationMode.Automatic;

                // this applies all plans
                await this.manager.applyPlans();
            } else {
                // we only apply those that should have been applied or were modified
                await Promise.all(unionBy(plans || [], modifiedPlans, (p: IHeatingPlan) => p.id).map(async (p: IHeatingPlan) => {
                    await this.manager.applyPlan(p);
                }));
            }

        } finally {
            this.isRunning = false;
            await this.registerTasks();
        }
    }

    private async determineNextSchedule() {
        let nextExecution: Date | null = null;
        let plansToExecute: IHeatingPlan[] = [];

        if (this.manager.operationMode === OverrideMode.Holiday
            || this.manager.operationMode === OverrideMode.OutOfSeason) {
            this.logger.information(`Mode is ${OverrideMode[this.manager.operationMode]}, no schedule required`);
        } else {
            type TempArray = {
                date: Date;
                plan: IHeatingPlan;
            };

            // type GroupedTempArray = { date: Date, plans: IHeatingPlan[] };
            const allSchedules: TempArray[] = [];

            // 60 / 12 = 5 minutes
            const slots = this.settings.get<number>(InternalSettings.SchedulerTimeSlots, 12);

            // we get the next schedule for all active plans
            const activePlans = await this.repository.activePlans;
            activePlans.forEach((plan) => {
                this.logger.debug(`Checking plan ${plan.id}`);
                const nextSchedule = this.calculator.getNextSchedule(plan);

                if (nextSchedule != null) {
                    // If the execution of the next slot is too close (difference vs. runtime),
                    // we would miss the execution. Such we slot the time to a runtime of 5 minutes.
                    nextSchedule.setMinutes(slotTime(nextSchedule.getMinutes(), slots), 0, 0);
                    allSchedules.push({ date: nextSchedule, plan });
                }
            });

            // group by slotted date, join all plans together
            const grouped = map(groupBy(allSchedules, (d: TempArray) => d.date), (gPlans, date) => ({
                date: new Date(date),
                plans: gPlans.map((gp) => gp.plan),
            }));

            // we sort and lowest
            const lowestDate = first(sortBy(grouped, (g) => g.date));

            // if there is one -> this is all plans to look at
            nextExecution = lowestDate != null ? lowestDate.date : null;

            if (nextExecution == null) {
                this.logger.debug(`No setpoint execution planned.`);
            } else {
                // @ts-ignore
                plansToExecute = lowestDate.plans;
            }
        }

        return {
            date: nextExecution,
            plans: plansToExecute,
        };
    }

    private getEndOfDay() {
        const eod = new Date();
        eod.setHours(0, 0, 0, 0);
        eod.setDate(eod.getDate() + 1);

        return eod;
    }

    @synchronize(HeatingSchedulerService.Lock)
    private async registerTasks() {
        /**
         * There is a bug in the SDK 2.0 that prevents registring more than one task a time.
         * We switch between two types of tasks.
         */
        await ManagerCron.unregisterAllTasks();

        const END_OF_DAY = this.getEndOfDay();

        let taskName: TaskNames = "schedule";
        let taskFunc = this.scheduleTask.bind(this);
        let { date: nextDate, plans: plansToExecute } = await this.determineNextSchedule();

        // As a workaround to issue #114 and #120, we must ensure the schedules are refreshed for all plans every 5 minutes in worst cases
        const currentDate = new Date(Date.now());
        const maxDate = new Date(+currentDate);
        maxDate.setMinutes(currentDate.getMinutes() + 5);

        // If we have a setpoint neat EOD, we still have to cleanup
        if (nextDate == null || nextDate >= END_OF_DAY || nextDate > maxDate) {
            if (END_OF_DAY < maxDate) {
                nextDate = END_OF_DAY;
                taskName = "cleanup";
                taskFunc = this.cleanupTask.bind(this);
            } else {
                // As a workaround to issue #114 and #120, we ensure the schedules are refreshed in 5 minutes
                this.logger.debug("As a workaround to issue #114 and #120, we ensure the schedules are refreshed in 5 minutes: ", maxDate);

                nextDate = maxDate;
                plansToExecute = await this.repository.plans;
            }
        }

        if (nextDate <= new Date(Date.now())) {
            this.logger.error(new Error("Schedule is calculated wrong, earlier than today!"), new Date(Date.now()), await this.repository.activePlans);

            // check again one hour later
            nextDate = new Date();
            nextDate.setHours(nextDate.getHours() + 1);
            plansToExecute = [];
        }

        this.next = nextDate;
        this.logger.information(`Next execution is at ${nextDate.toLocaleString()}`, plansToExecute.map((p) => `${p.name} (${p.id})`));

        const task = await ManagerCron.registerTask(taskName, nextDate, plansToExecute);
        task.once("run", taskFunc);

        if (this.flow.nextDate != null) {
            this.flow.nextDate.setValue(nextDate.toLocaleString());
        }
    }
}
