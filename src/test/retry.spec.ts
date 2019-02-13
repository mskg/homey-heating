import { fail } from "assert";
import 'mocha';
import { expect } from "chai";
import { Retry } from "../app/helper/Retry";

import "./suppress-console";

describe('Retry', function () {
    it('async function', async () => {
        const retries = 5;
        let i = 0;

        try {
            await Retry(async () => { ++i; throw ("abc") }, null, retries, 0, false);
            fail("Should not be reached");
        }
        catch (e) {
            expect(retries).to.equal(i);
        }
    });

    it('return Promise', async () => {
        const retries = 5;
        let i = 0;

        try {
            await Retry(() => { ++i; return Promise.reject("abc") }, null, retries, 0, false);
            fail("Should not be reached");
        }
        catch (e) {
            expect(retries).to.equal(i);
        }
    });

    it('check success', async () => {
        try {
            await Retry(async () => { });
        }
        catch (e) {
            fail("Should not be reached");
        }
    });

    it('nesting', async () => {
        const retries = 5;
        let i = 0;

        try {
            await (
                async () => await (
                        async () => await Retry(
                                async () => { ++i; throw ("abc") }, null, retries, 0, false)
                )()
            )();

            fail("Should not be reached");
        }
        catch (e) {
            expect(retries).to.equal(i);
        }
    });});
