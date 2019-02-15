import { Day } from "../../../app/model";
import translate from "../../i18n/Translation";
import { IndexedSetPoint } from "../../state/PlanReducer";
import { MIN_DATE } from "./SVGGenerator";

const translateDay = (day: Day) => {
    switch (day) {
        case Day.Sunday: return translate("schedule.Sunday");
        case Day.Monday: return translate("schedule.Monday");
        case Day.Tuesday: return translate("schedule.Tuesday");
        case Day.Wednesday: return translate("schedule.Wednesday");
        case Day.Thursday: return translate("schedule.Thursday");
        case Day.Friday: return translate("schedule.Friday");
        case Day.Saturday: return translate("schedule.Saturday");
        default: return "XX";
    }
};

const translateTemperature = (n) => {
    if (n <= 16) {
        return "LOW";
    }

    if (n <= 18.5) {
        return "MEDIUM";
    }

    return "HIGH";
};

export class SeriesElement {
    public static fullDay(day, temperature) {
        return new SeriesElement({
            hour: 0,
            minute: 0,
            targetTemperature: temperature,
            index: -1,
            day,
        });
    }

    public static firstHalf(from: IndexedSetPoint, to: IndexedSetPoint) {
        return new SeriesElement({
            hour: 0,
            minute: 0,
            targetTemperature: from ? from.targetTemperature : to.targetTemperature,
            index: -1,
            day: to.day,
        }, to);
    }

    public readonly start = new Date(MIN_DATE);
    public readonly end = new Date(MIN_DATE);

    public readonly temperature: number;
    public readonly taskName: string;

    public readonly color: "LOW" | "MEDIUM" | "HIGH";

    constructor(from?: IndexedSetPoint, to?: IndexedSetPoint) {
        this.temperature = from ? from.targetTemperature : to.targetTemperature;

        this.start.setHours(from ? from.hour : 0, from ? from.minute : 0);
        this.end.setHours(to ? to.hour : 24, to ? to.minute : 0);

        this.taskName = translateDay(from ? from.day : to.day);
        this.color = translateTemperature(this.temperature);
    }
}
