import { expect } from "chai";
import * as _ from "lodash";
import "mocha";
import { container } from "tsyringe";
import { COOL, DEFAULT_HEATING_PLAN, INTERMEDIATE, WARM } from "../app/helper/defaultPlan";
import { IHeatingPlan, ThermostatMode } from "../app/model/heating";
import { HeatingPlanCalculator } from "../app/services/calculator";

// tslint:disable: no-unused-expression
// tslint:disable: no-empty
describe("Scheduler", () => {
    const scheduler = container.resolve(HeatingPlanCalculator);
    const nextSchedulePlan: IHeatingPlan = _.find(DEFAULT_HEATING_PLAN, (p) => p.name === "Living Room");

    const MONDAY = new Date(1979, 1, 29, 0, 0, 0, 0);
    const tests = [
        {
            time: { h: 0, m: 0 },
            setPoint: { h: 23, m: 0, t: COOL },
            schedule: { h: 17, m: 0 },
        },
        {
            time: { h: 17, m: 0 },
            setPoint: { h: 17, m: 0, t: INTERMEDIATE },
            schedule: { h: 18, m: 30, t: WARM },
        },
        {
            time: { h: 18, m: 0 },
            setPoint: { h: 17, m: 0, t: INTERMEDIATE },
            schedule: { h: 18, m: 30, t: WARM },
        },
        {
            time: { h: 18, m: 30 },
            setPoint: { h: 18, m: 30, t: WARM },
            schedule: { h: 23, m: 0, t: COOL },
        },
        {
            time: { h: 23, m: 30 },
            setPoint: { h: 23, m: 0, t: COOL },
            schedule: { h: 17, m: 0, t: INTERMEDIATE },
        },
    ];

    _.forEach(tests, (test) => {
        it(`Checking nextSchedule ${test.time.h}:${test.time.m}`, () => {
            const ref = new Date(MONDAY);
            ref.setHours(test.time.h, test.time.m);

            const calcDate = scheduler.getNextSchedule(nextSchedulePlan, ref);
            expect(calcDate.getHours()).to.equal(test.schedule.h);
            expect(calcDate.getMinutes()).to.equal(test.schedule.m);
        });

        it(`Checking setPoint ${test.time.h}:${test.time.m}`, () => {
            const ref = new Date(MONDAY);
            ref.setHours(test.time.h, test.time.m);

            const sp = scheduler.getSetPoint(nextSchedulePlan, ref);
            expect(sp.hour, "Hour").to.equal(test.setPoint.h);
            expect(sp.minute, "Minute").to.equal(test.setPoint.m);

            expect(sp.targetTemperature, "Target").to.equal(test.setPoint.t);
        });
    });

    // it ("OverrideDay", (test) => {
    //     const plan: IHeatingPlan = _.find(DEFAULT_HEATING_PLAN, (p) => p.name === "OverrideDay");

    //     const calcDate = scheduler.getNextSchedule(nextSchedulePlan, MONDAY);
    //     expect(calcDate).to.be.null;
    // });

    // it ("FullManual", (test) => {
    //     const plan: IHeatingPlan = _.find(DEFAULT_HEATING_PLAN, (p) => p.name === "FullManual");

    //     const calcDate = scheduler.getNextSchedule(nextSchedulePlan, MONDAY);
    //     expect(calcDate).to.be.null;
    // });
});
