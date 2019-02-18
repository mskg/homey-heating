
import { Mutex, slotTime } from "@app/helper";
import { IHeatingPlan, NormalOperationMode, OverrideMode, ThermostatMode } from "@app/model";
import { ManagerCron } from "homey";
import { first, groupBy, map, sortBy } from "lodash";
import { singleton } from "tsyringe";
import { HeatingPlanCalculator } from "../calculator";
import { HeatingManagerService } from "../heating-manager";
import { HeatingPlanRepositoryService } from "../heating-plan-repository";
import { asynctrycatchlog, ICategoryLogger, LoggerFactory, trycatchlog } from "../log";
import { InternalSettings, SettingsManagerService } from "../settings-manager";

@singleton()
export class HeatingSchedulerService {

    // api only, null is ok
    @trycatchlog(true, null)
    public get nextSchedule(): Date {
        return this.next;
    }

    private mutex: Mutex = new Mutex();
    private logger: ICategoryLogger;
    private next: Date = null;
    private isRunning = false;

    constructor(
        private manager: HeatingManagerService,
        private calculator: HeatingPlanCalculator,
        private repository: HeatingPlanRepositoryService,
        private settings: SettingsManagerService,

        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Scheduler");

        this.repository.onChanged.subscribe(this.handleOnChanged.bind(this));
        this.manager.onModeChanged.subscribe(this.handleOnChanged.bind(this));
    }

    // we live on our own, ok to kill
    @asynctrycatchlog(true)
    public async stop() {
        const unlock = await this.mutex.lock();

        try {
            this.logger.information("Stop");
            await ManagerCron.unregisterAllTasks();
        } finally {
            unlock();
        }
    }

    // we live on our own, ok to kill
    @asynctrycatchlog(true)
    public async start() {
        const unlock = await this.mutex.lock();

        try {
            this.logger.information("Start");
            await this.registerTasks();
        } finally {
            unlock();
        }
    }

    // we live on our own, ok to kill
    @asynctrycatchlog(true)
    private async handleOnChanged() {
        if (!this.isRunning) {
            await this.start();
        } else {
            this.logger.debug("Ignoring event, running");
        }
    }

    // we live on our own, ok to kill
    @asynctrycatchlog(true)
    private async applyPlans(plans: IHeatingPlan[]) {
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
    @asynctrycatchlog(true)
    private async clearOverrides() {
        try {
            this.isRunning = true;
            const logger = this.logger.createSubLogger("Overrides");
            logger.information("Running");

            const plans = await this.repository.plans;
            const modifiedPlans = [];

            plans.forEach((plan) => {
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
            }

            // this applies all plans at least once a day, even on holidays and out of season
            await this.manager.applyPlans();
        } finally {
            this.isRunning = false;
            await this.registerTasks();
        }
    }

    // TODO: We are dump now => we check everything.
    //  Should only apply the plan with a schedule now?
    private async registerTasks() {
        /**
         * There is a bug in the SDK 2.0 that prevents registring more than one task a time.
         * This is why workarrounds are implemented here.
         */
        await ManagerCron.unregisterAllTasks();

        // check again tomorrow
        const END_OF_DAY = new Date();
        END_OF_DAY.setHours(0, 0, 0, 0);
        END_OF_DAY.setDate(END_OF_DAY.getDate() + 1);

        let plansToExecute: IHeatingPlan[] = [];

        // is this true?
        if (this.manager.operationMode === OverrideMode.Holiday
            || this.manager.operationMode === OverrideMode.OutOfSeason) {
            this.logger.information(`Mode is ${OverrideMode[this.manager.operationMode]}, no check required.`);

            this.next = null;
        } else {
            type TempArray = { date: Date, plan: IHeatingPlan };
            const allSchedules: TempArray[] = [];
            const slots = this.settings.get<number>(InternalSettings.SchedulerTimeSlots, 12);

            // we get the next schedule for all active plans
            const activePlans = await this.repository.activePlans;
            activePlans.forEach((plan) => {
                this.logger.debug(`Checking plan ${plan.id}`);

                const next = this.calculator.getNextSchedule(plan);
                if (next != null) {
                    // There could be a flaw here: If the execution of the next slot is too close
                    // (difference vs. runtime), we would miss the execution

                    // we group all in 20 blocks à 5 minutes
                    next.setMinutes(slotTime(next.getMinutes(), slots), 0, 0);
                    allSchedules.push({ date: next, plan });
                }
            });

            // we group by date
            const grouped = map(
                groupBy(allSchedules, (d: TempArray) => d.date),
                (gPlans, date) => ({
                    date: new Date(date),
                    plans: gPlans.map((gp) => gp.plan),
                }));

            // we sort by date, and return the lowest
            const lowestDate = first(sortBy(grouped, (g) => g.date));

            // if there is one -> this is all plans to look at
            this.next = lowestDate != null ? lowestDate.date : null;
            if (this.next == null) {
                this.logger.debug(`No setpoint execution planned.`);
            } else {
                plansToExecute = lowestDate.plans;
            }
        }

        let taskName = "schedule";

        // this next is for schedules only!
        if (this.next == null || this.next > END_OF_DAY) {
            this.next = END_OF_DAY;
            taskName = "cleanup";
        }

        this.logger.information(`Next execution is at ${this.next.toLocaleString()}`, plansToExecute.map((p) => `${p.name} (${p.id})`));
        const task = await ManagerCron.registerTask(taskName, this.next, plansToExecute);

        if (this.next === END_OF_DAY) {
            task.once("run", this.clearOverrides.bind(this));
        } else {
            task.once("run", this.applyPlans.bind(this));
        }
    }
}
