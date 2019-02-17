import { expect } from "chai";
import "mocha";
import { AsyncDebounce } from "../app/helper/AsyncDebounce";
import "./suppress-console";
import { fail } from "assert";

// tslint:disable: no-unused-expression
// tslint:disable: no-empty
describe("Debounce", () => {
    it("Check trail", async () => {
        let i = 0;

        let t = AsyncDebounce(async () => { ++i; }, 100);
        await Promise.all([1, 2, 3, 5, 6, 7, 8, 9, 10].map(async (m) => await t()));

        expect(1).to.equal(i);
    });

    it("Check leading", async () => {
        let i = 0;

        let t = AsyncDebounce(async () => { i = i === 0 ? 100 : i + 1; }, 100, true);
        await Promise.all([1, 2, 3, 5, 6, 7, 8, 9, 10].map(async (m) => await t()));

        expect(100).to.equal(i);
    });

    it("Check error", async () => {
        try {

            let t = AsyncDebounce(async () => { throw new Error("test"); }, 100, true);
            await t();

            fail("Should not be reached");

        } catch (e) { }
    });

    it("Check params", async () => {
        try {

            let t = AsyncDebounce(async (a, b, c) => {
                expect(1).equal(a);
                expect(2).equal(b);
                expect(3).equal(c);
            }, 100, true);
            await t(1, 2, 3);

            fail("Should not be reached");

        } catch (e) { }
    });
});
