
import { Day, IHeatingPlan, ISetPoint } from "@app/model";
import { findLastIndex as loadashFindLastIndex, sortBy } from "lodash";
import { injectable } from "tsyringe";
import { ILogger, LoggerFactory } from "../log";

@injectable()
export class HeatingPlanCalculator {
    private logger: ILogger;

    constructor(loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Calculator");
    }

    /**
     * Get the next date when a scheduler needs to apply the heating plan.
     *
     * @param zone The heating zone to look at
     * @param date The point in time to check
     */
    public getNextSchedule({ schedule }: IHeatingPlan, date: Date = new Date()): Date | null {
        // tslint:disable-next-line: max-line-length
        this.logger.debug(`Searching next trigger for ${Day[date.getDay()]}@${date.getHours()}:${date.getMinutes()}`);
        if (schedule == null || schedule.length === 0) { return null; }

        // can be done in the model
        const sortedSchedule = sortBy(schedule, [(d) => this.transposeDay(d.day), "hour", "minute"]);
        const lastIndex = this.findLastIndex(sortedSchedule, date);

        let point: ISetPoint;

        // if nothing is found, this is still valid
        if (lastIndex + 1 < sortedSchedule.length) {
            point = sortedSchedule[lastIndex + 1];
        } else {
            point = sortedSchedule[0];
        }

        this.logger.debug(`> set point is ${Day[point.day]}@${point.hour}:${point.minute}`);
        const returnValue: Date = date;

        // if we found something that is earlier than today, this means one week later
        // this can be the case for only one setpoint on the same day before now
        if (point.day === date.getDay()
            && (point.hour < date.getHours() ||
                // we include now to be next week, too
                (point.hour === date.getHours() && point.minute <= date.getMinutes())
            )) {
            returnValue.setDate(returnValue.getDate() + 7);
        }

        // set time
        returnValue.setHours(point.hour, point.minute, 0, 0);

        let diff = 0;

        // today
        if (point.day === date.getDay()) {
            diff = 0;
            // later this week
        } else if (this.transposeDay(point.day) > this.transposeDay(date.getDay())) {
            diff = this.transposeDay(point.day) - this.transposeDay(date.getDay());
            // the week after
        } else {
            diff = 7 - this.transposeDay(date.getDay()) + this.transposeDay(point.day);
        }

        returnValue.setDate(date.getDate() + diff);
        this.logger.debug(`> calculated date is ${returnValue.toLocaleString()}`);

        return returnValue;
    }

    /**
     * Returns the active setpoint for a given zone and date
     *
     * @param zone The heating zone to look at
     * @param now The point in time to check
     */
    public getSetPoint({ schedule }: IHeatingPlan, now: Date = new Date()): ISetPoint | null {
        this.logger.debug(`Investigating ${Day[now.getDay()]}@${now.getHours()}:${now.getMinutes()}`);
        if (schedule == null || schedule.length === 0) { return null; }

        const sortedSchedule = sortBy(schedule, [(d) => this.transposeDay(d.day), "hour", "minute"]);
        let lastIndex = this.findLastIndex(sortedSchedule, now);

        if (lastIndex === -1) {
            this.logger.debug(`> No trigger for today, looking at yesterday`);

            const newDate = now;
            newDate.setDate(now.getDate() - 1); // substract one day
            newDate.setHours(23, 59);

            // cycle on the same day not yet reached, we search the previous day for the last cycle
            lastIndex = this.findLastIndex(sortedSchedule, newDate);

            if (lastIndex === -1) { return null; }
        }

        const setPoint = sortedSchedule[lastIndex];

        // tslint:disable-next-line:max-line-length
        this.logger.debug(`> Target temperature is ${setPoint.targetTemperature} (${Day[setPoint.day]}@${setPoint.hour}:${setPoint.minute})`);
        return setPoint;
    }

    private findLastIndex(points: ISetPoint[], date: Date): number {
        // search for the highest index that we are greater than
        // |-------|--------|-------|
        //            ^ now
        //         ^ result
        return loadashFindLastIndex(points, (sp) => {
            if (this.transposeDay(date.getDay()) > this.transposeDay(sp.day)) {
                return true;
            }

            if (this.transposeDay(date.getDay()) === this.transposeDay(sp.day)) {
                if (date.getHours() > sp.hour) {
                    return true;
                }

                // if we are on that time, we must take the next schedule
                if (date.getHours() === sp.hour && date.getMinutes() >= sp.minute) {
                    return true;
                }
            }

            return false;
        });
    }

    /**
     * We must change the order of days to be Monday - Sunday
     */
    private transposeDay(d: Day): number {
        if (d === Day.Sunday) { return 7; }
        return d;
    }
}
