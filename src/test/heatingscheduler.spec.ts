import { BootStrapper, HeatingSchedulerService, setAllowCatchAll } from "@app/services";
import { expect } from "chai";
import { ManagerCron } from "homey";
import "mocha";
import { container } from "tsyringe";
import { FakeDate, patchDate, revertDate } from "./mocks/date";
import "./suppress-console";

before(async () => {
    await BootStrapper(true);
});

beforeEach(async () => {
    patchDate();
    FakeDate.dateNow.setMinutes(0, 0, 0);

    setAllowCatchAll(false);
});

afterEach(() => {
    revertDate();
    setAllowCatchAll(true);
});

// tslint:disable: only-arrow-functions
// tslint:disable: no-empty
// tslint:disable: no-unused-expression
describe("HeatingSchedulerService", () => {
    const scheduler = container.resolve<HeatingSchedulerService>(HeatingSchedulerService);

    function checkSchedule(hour: number, minute: number, task: "schedule" | "cleanup" = "schedule", day = FakeDate.dateNow.getDate()) {
        // @ts-ignore
        expect(day, "Next Date").to.equal(scheduler.nextSchedule.getDate());
        // @ts-ignore
        expect(hour, "Next Hour").to.equal(scheduler.nextSchedule.getHours());
        // @ts-ignore
        expect(minute, "Next Minute").to.equal(scheduler.nextSchedule.getMinutes());

        expect(ManagerCron._tasks[task], "Task").to.not.be.null;
        expect(ManagerCron._tasks[task]._args, "Task args").to.not.be.null;
        expect(ManagerCron._tasks[task].date, "Task date").to.not.be.null;

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

    it("07:30", async () => {
        FakeDate.dateNow.setFullYear(1979, 0, 29); // TUESDAY
        FakeDate.dateNow.setHours(7, 30, 0, 0);
        await scheduler.start();

        checkSchedule(9, 0);
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
