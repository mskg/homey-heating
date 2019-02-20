import { DEFAULT_HEATING_PLAN } from "@app/helper";
import { BootStrapper, HeatingManagerService, setAllowCatchAll } from "@app/services";
import { expect } from "chai";
import "mocha";
import { container } from "tsyringe";
import "./mocks";
import "./suppress-console";

class FakeDate extends Date {
    public static dateNow = new Date();

    constructor(...args) {
        super();

        if (args.length !== 0) { return new (OldDate as any)(...args) as any; }
        return new OldDate(FakeDate.dateNow) as any;
    }

    public now(): number { return FakeDate.dateNow.valueOf(); }
}

let OldDate = Date;
before(async () => {
    OldDate = Date;
    await BootStrapper(true);
});

beforeEach(async () => {
    (Date as any) = FakeDate;
    setAllowCatchAll(false);
});

afterEach(() => {
    (Date as any) = OldDate;
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

        const test = (target) => {
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

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p) => p.id === "1");
        plan.schedule.forEach((s) => { s.targetTemperature = "" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.empty;
    });

    it("Correct, fractionless temperature", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30);
        FakeDate.dateNow.setHours(9, 0, 0, 0);

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p) => p.id === "1");
        plan.schedule.forEach((s) => { s.targetTemperature = "16,3" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.not.empty;
        expect(temps[0].targetTemperature).to.equal(16);
    });

    it("Correct, fraction temperature", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30);
        FakeDate.dateNow.setHours(9, 0, 0, 0);

        const plan = JSON.parse(JSON.stringify(DEFAULT_HEATING_PLAN)).find((p) => p.id === "1");
        plan.schedule.forEach((s) => { s.targetTemperature = "16.3" as unknown as number; });

        const temps = await scheduler.evaluatePlan(plan);

        expect(temps).to.be.an("array");
        expect(temps).to.be.not.empty;
        expect(temps[0].targetTemperature).to.equal(16.3);
    });
});
