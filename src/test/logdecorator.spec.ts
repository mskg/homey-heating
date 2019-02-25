import { setAllowCatchAll, trycatchlog } from "@app/services";
import { fail } from "assert";
import { expect } from "chai";
import "mocha";
import "./suppress-console";

class Test {
    constructor(private mustFail: boolean) {
    }

    @trycatchlog(true)
    public testThrowCatchAll() {
        if (this.mustFail === true) { throw new Error("sync function"); }
        return true;
    }

    @trycatchlog(true)
    public get testGetCatchAll(): any {
        if (this.mustFail === true) { throw new Error("sync get"); }
        return true;
    }

    @trycatchlog(true)
    public async testAsyncCatchAll() {
        if (this.mustFail === true) { throw new Error("async function"); }
        return true;
    }

    @trycatchlog(true)
    public get testGetAsyncCatchAll(): Promise<any> {
        if (this.mustFail === true) { throw new Error("async get"); }
        return Promise.resolve(true);
    }

    @trycatchlog()
    public testThrow() {
        if (this.mustFail === true) { throw new Error("sync function"); }
        return true;
    }

    @trycatchlog()
    public get testGet(): any {
        if (this.mustFail === true) { throw new Error("sync get"); }
        return true;
    }

    @trycatchlog()
    public async testAsyncThrow() {
        if (this.mustFail === true) { throw new Error("async function"); }
        return true;
    }

    @trycatchlog()
    public get testGetAsync(): Promise<any> {
        if (this.mustFail === true) { throw new Error("async get"); }
        return Promise.resolve(true);
    }
}

beforeEach(async () => {
    setAllowCatchAll(true);
});

// tslint:disable: no-unused-expression
// tslint:disable: only-arrow-functions
// tslint:disable: no-empty
describe("Log Decorator", () => {
    describe("#async", () => {
        it("Method must fail and throw", async () => {
            try {
                expect(null).to.equal(await new Test(true).testAsyncThrow());
                fail("Should not be reached");
            } catch (e) {}
        });

        it("Method must fail and throw", async () => {
            try {
                expect(null).to.equal(await new Test(true).testGetAsync);
                fail("Should not be reached");
            } catch (e) {}
        });

        it("Method must catch fail and return null", async () => {
            expect(null).to.equal(await new Test(true).testAsyncCatchAll());
        });

        it("Method must catch fail and return true", async () => {
            expect(null).to.equal(await new Test(true).testGetAsyncCatchAll);
        });
    });

    describe("#sync", () => {
        it("Method must fail and throw", () => {
            try {
                expect(true).to.equal(new Test(true).testThrow());
                fail("Should not be reached");
            } catch (e) {}
        });

        it("Method must fail and throw", () => {
            try {
                expect(null).to.equal(new Test(true).testGet);
                fail("Should not be reached");
            } catch (e) {}
        });

        it("Method must catch fail and return null", () => {
            expect(null).to.equal(new Test(true).testThrowCatchAll());
        });

        it("Method must catch fail and return null", () => {
            expect(null).to.equal(new Test(true).testGetCatchAll);
        });
    });
});
