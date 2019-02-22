import { ILogger } from "@app/services";
import { fail } from "assert";
import { expect } from "chai";
import "mocha";
import { Retry } from "../app/helper/Retry";
import "./suppress-console";

// tslint:disable: no-unused-expression
// tslint:disable: no-empty
describe("Retry", () => {
    it("async function", async () => {
        const retries = 5;
        let i = 0;

        try {
            await Retry(async () => { ++i; throw new Error(("abc")); }, null as unknown as ILogger, retries, 0, false);
            fail("Should not be reached");
        } catch (e) {
            expect(retries).to.equal(i);
        }
    });

    it("return Promise", async () => {
        const retries = 5;
        let i = 0;

        try {
            await Retry(() => { ++i; return Promise.reject("abc"); }, null as unknown as ILogger, retries, 0, false);
            fail("Should not be reached");
        } catch (e) {
            expect(retries).to.equal(i);
        }
    });

    it("check success", async () => {
        try {
            await Retry(async () => { });
        } catch (e) {
            fail("Should not be reached");
        }
    });

    it("nesting", async () => {
        const retries = 5;
        let i = 0;

        try {
            await (
                async () => await (
                    async () => await Retry(
                        async () => { ++i; throw new Error(("abc")); }, null as unknown as ILogger, retries, 0, false)
                )()
            )();

            fail("Should not be reached");
        } catch (e) {
            expect(retries).to.equal(i);
        }
    });
});
