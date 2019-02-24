import { sortBy } from "lodash";
import { Day, IHeatingPlan, ISetPoint } from "../../app/model";
import { IndexedSetPoint } from "./PlanReducer";

export const sortSchedules = (newList: ISetPoint[]) => sortBy(newList, [(d: ISetPoint) => (d.day === 0 ? 7 : d.day), "hour", "minute"])
    .map<IndexedSetPoint>((sp: ISetPoint, i: number) => ({ ...sp, index: i })) as IndexedSetPoint[];

function calculateLast(day: Day, plan: IHeatingPlan, daySchedule: ISetPoint[]): ISetPoint | null {
    // no elements
    if (plan.schedule.length === 0) {
        return null;
    }

    // first element is first element
    if (daySchedule.length !== 0 && (daySchedule[0] as IndexedSetPoint).index === 0) {
        if (plan.schedule[plan.schedule.length - 1].day !== daySchedule[0].day) {
            return plan.schedule[plan.schedule.length - 1];
        }
        return null;
    }

    if (daySchedule.length === 0) {
        let nd = day - 1;
        if (nd < 0) {
            nd = 6;
        }
        // we search from right to left
        while (nd >= 0) {
            const last = plan.schedule.filter((sp) => sp.day === nd);
            if (last.length > 0) {
                // already sorted
                return last[last.length - 1];
            }
            nd -= 1;
        }

        // cannot happen
        return null;
    }

    // highest from last schedule
    return plan.schedule[(daySchedule[0] as IndexedSetPoint).index - 1];
}

export function calculateDay(plan: IHeatingPlan, day: Day) {
    // filtered and sorted based on day
    const daySchedule = plan.schedule.filter((sp) => sp.day === day);

    return {
        last: calculateLast(day, plan, daySchedule),
        schedules: daySchedule as IndexedSetPoint[],
    };
}
