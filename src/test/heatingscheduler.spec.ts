import { BootStrapper, HeatingSchedulerService } from "@app/services";
import { expect } from "chai";
import { ManagerCron } from "homey";
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
});

after(() => {
    (Date as any) = OldDate;
});

// tslint:disable: only-arrow-functions
// tslint:disable: no-empty
// tslint:disable: no-unused-expression
describe("HeatingSchedulerService", () => {
    const scheduler = container.resolve<HeatingSchedulerService>(HeatingSchedulerService);

    function checkSchedule(hour, minute, task: "schedule" | "cleanup" = "schedule", day = FakeDate.dateNow.getDate()) {
        expect(day, "Next Date").to.equal(scheduler.nextSchedule.getDate());
        expect(hour, "Next Hour").to.equal(scheduler.nextSchedule.getHours());
        expect(minute, "Next Minute").to.equal(scheduler.nextSchedule.getMinutes());

        expect(ManagerCron._tasks[task], "Task").to.not.be.null;
        expect(ManagerCron._tasks[task]._args, "Task args").to.not.be.null;

        const nextRun = ManagerCron._tasks[task].date;
        expect(day, "Task Date").to.equal(nextRun.getDate());
        expect(hour, "Task Hour").to.equal(nextRun.getHours());
        expect(minute, "Task Minute").to.equal(nextRun.getMinutes());

        expect(ManagerCron._tasks[task].handBack, "Task on handback").to.be.an("array");
        expect(ManagerCron._tasks[task]._evt.run, "Task run function").to.be.a("function");
    }

    it("17:00", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30); // TUESDAY
        FakeDate.dateNow.setHours(9, 0, 0, 0);
        await scheduler.start();

        checkSchedule(17, 0);
    });

    it("18:30", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30); // TUESDAY
        FakeDate.dateNow.setHours(17, 0, 0, 0);
        await scheduler.start();

        checkSchedule(18, 30);
    });

    it("23:00", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30); // TUESDAY
        FakeDate.dateNow.setHours(18, 30, 0, 0);
        await scheduler.start();

        checkSchedule(23, 0);
    });

    it("00:00", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30); // TUESDAY
        FakeDate.dateNow.setHours(23, 30, 0, 0);
        await scheduler.start();

        checkSchedule(0, 0, "cleanup", FakeDate.dateNow.getDate() + 1);
    });

    it("06:00+1", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 31); // TUESDAY
        FakeDate.dateNow.setHours(0, 0, 0, 0);
        await scheduler.start();

        checkSchedule(6, 0, "schedule", FakeDate.dateNow.getDate());
    });

    it("run clenaup", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 30); // TUESDAY
        FakeDate.dateNow.setHours(23, 30, 0, 0);
        await scheduler.start();

        checkSchedule(0, 0, "cleanup", FakeDate.dateNow.getDate() + 1);

        FakeDate.dateNow.setDate(31);
        FakeDate.dateNow.setHours(0, 0, 0, 0);
        await ManagerCron._tasks.cleanup.callEventHandler("run");

        checkSchedule(6, 0, "schedule");
    });
});
