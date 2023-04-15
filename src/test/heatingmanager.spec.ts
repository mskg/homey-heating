import { DEFAULT_HEATING_PLAN } from "@app/helper";
import { IHeatingPlan, ISetPoint } from "@app/model";
import { BootStrapper, HeatingManagerService, setAllowCatchAll } from "@app/services";
import { expect } from "chai";
import "mocha";
import { container } from "tsyringe";
import { FakeDate, patchDate, revertDate } from "./mocks/date";
import "./suppress-console";
import { App } from 'homey';

before(async () => {
    await BootStrapper(new App(), true);
});

beforeEach(async () => {
    patchDate();
    setAllowCatchAll(false);
});

afterEach(() => {
    revertDate();
    setAllowCatchAll(true);
});

// tslint:disable: no-unused-expression
describe("HeatingManager", () => {
    const scheduler = container.resolve<HeatingManagerService>(HeatingManagerService);

    it("Cap", () => {
        const cap = {
            min: 3,
            max: 5,
            step: 0.5,
        };

        const test = (target: any) => {
            if (target > cap.max) {
                target = cap.max;
            } else if (target < cap.min) {
                target = cap.min;
            } else {
                // adjust fraction
                // tslint:disable: one-line
                if (cap.step === 0) { target = Math.round(target); }
                else { target = Math.round(target / cap.step) * cap.step; }
            }

            return target;
        };

        expect(test(0)).to.equal(3);

        expect(test(2)).to.equal(3);
        expect(test(6)).to.equal(5);

        expect(test(3.2)).to.equal(3);
        expect(test(3.5)).to.equal(3.5);

        expect(test("")).to.equal(3);
    });

    it("0 temperature", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30);
        FakeDate.dateNow.setHours(9, 0, 0, 0);

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p: IHeatingPlan) => p.id === "1");
        plan.schedule.forEach((s: ISetPoint) => { s.targetTemperature = "" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.empty;
    });

    it("Correct, fractionless temperature", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30);
        FakeDate.dateNow.setHours(9, 0, 0, 0);

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p: IHeatingPlan) => p.id === "1");
        plan.schedule.forEach((s: ISetPoint) => { s.targetTemperature = "16,3" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.not.empty;
        expect(temps[0].targetTemperature).to.equal(16);
    });

    it("Correct, fraction temperature", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30);
        FakeDate.dateNow.setHours(9, 0, 0, 0);

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p: IHeatingPlan) => p.id === "1");
        plan.schedule.forEach((s: ISetPoint) => { s.targetTemperature = "16.3" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.not.empty;
        expect(temps[0].targetTemperature).to.equal(16.3);
    });
});
