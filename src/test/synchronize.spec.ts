import { Mutex, synchronize } from "@app/helper";
import { fail } from "assert";
import { expect } from "chai";
import "mocha";

/**
 * This code forces context switches on the add50 function
 */
class ForceCS {
    public accountBalance = 0;

    public async getAccountBalance() {
        return this.accountBalance;
    }

    public async setAccountBalance(value: number) {
        this.accountBalance = value;
    }

    public async increment(value: number, incr: number) {
        return value + incr;
    }

    @synchronize()
    public async add$50Sync() {
        let balance: number;
        let newBalance: number;

        balance = await this.getAccountBalance();
        newBalance = await this.increment(balance, 50);

        await this.setAccountBalance(newBalance);
    }

    public async add$50() {
        let balance: number;
        let newBalance: number;

        balance = await this.getAccountBalance();
        newBalance = await this.increment(balance, 50);

        await this.setAccountBalance(newBalance);
    }
}

class Test {
    public static m = new Mutex();

    public i = 0;

    @synchronize()
    public get newNumber(): Promise<number> {
        return Promise.resolve(this.i++);
    }

    @synchronize()
    public get tryget() {
        return Promise.resolve(true);
    }

    @synchronize()
    public tryit() {
        return Promise.resolve(true);
    }

    @synchronize()
    public tryfail() {
        // tslint:disable-next-line: no-string-throw
        throw "fail";
    }

    @synchronize(Test.m)
    public tryitGlobal() {
        return Promise.resolve(true);
    }

    @synchronize(Test.m)
    public tryfailGlobal() {
        // tslint:disable-next-line: no-string-throw
        throw "fail";
    }

    @synchronize()
    public syncresult() {
        return true;
    }
}

describe("synchronize", () => {
    describe("parallal", () => {
        it("must increment wrong", async () => {
            const t = new ForceCS();

            const transaction1 = t.add$50();
            const transaction2 = t.add$50();

            await transaction1;
            await transaction2;

            expect(50).equal(await t.getAccountBalance());
        });

        it("must incement correctly", async () => {
            const t = new ForceCS();

            const transaction1 = t.add$50Sync();
            const transaction2 = t.add$50Sync();

            await transaction1;
            await transaction2;

            expect(100).equal(await t.getAccountBalance());
        });
    });

    describe("local", () => {
        it("call", async () => {
            try {
                expect(true).to.equal(await new Test().tryit());
            } catch (e) {
                fail("Should not be reached");
            }
        });

        it("get", async () => {
            try {
                expect(true).to.equal(await new Test().tryget);
            } catch (e) {
                fail("Should not be reached");
            }
        });

        it("throw", async () => {
            try {
                expect(true).to.equal(await new Test().tryfail());
                fail("Should not be reached");
            } catch (e) {
                expect("fail").to.equal(e);
            }
        });

        it("sync", async () => {
            try {
                await new Test().syncresult();
                fail("Should not be reached");
            } catch (e) {
                expect(e).to.be.an("error");
            }
        });
    });

    describe("global", () => {
        it("call", async () => {
            try {
                expect(true).to.equal(await new Test().tryitGlobal());
            } catch (e) {
                fail("Should not be reached");
            }
        });

        it("throw", async () => {
            try {
                expect(true).to.equal(await new Test().tryfailGlobal());
                fail("Should not be reached");
            } catch (e) {
                expect("fail").to.equal(e);
            }
        });
    });
});
