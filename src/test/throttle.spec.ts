import { fail } from "assert";
import 'mocha';
import { expect } from "chai";
import { Retry } from "../app/helper/Retry";
import { AsyncThrottle } from "../app/helper/AsyncThrottle";

import "./suppress-console";

describe('Throttle', function () {
    it('Check execute', async () => {
        let i = 0;

        var t = AsyncThrottle(async () => { ++i; }, 0);
        await Promise.all([1, 2, 3].map(async m => await t()));

        expect(3).to.equal(i);
    });


    it('Check with retry no error', async () => {
        let i = 0;

        var t = AsyncThrottle(async () => await Retry(async () => { ++i; }, null, 3), 0);
        await Promise.all([1, 2, 3].map(async m => await t()));

        expect(3).to.equal(i);
    });


    it('Check with retry and error', async () => {
        let i = 0;

        var throttle = AsyncThrottle(async () => await Retry(async () => {
            ++i;
            if ((i % 2) == 0) { throw new Error("a"); }
        }, null, 3, 0, false), 0);

        await Promise.all([1, 2, 3].map(async m => await throttle()));

        // 1 2->3 4->5
        expect(5).to.equal(i);
    });

    it('Check success', async () => {
        var throttle = AsyncThrottle(async () => await Retry(async () => {
        }), 0);

        await throttle();
    });
});
