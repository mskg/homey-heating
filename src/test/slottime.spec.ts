import { slotTime } from "@app/helper";
import { expect } from "chai";
import "mocha";
import "./suppress-console";

// tslint:disable: no-unused-expression
// tslint:disable: no-empty
describe("Time slots", () => {
    it("Round 15", async () => {
        const test = (t) => slotTime(t.getMinutes());

        const d = new Date();

        d.setMinutes(0);
        expect(0).to.equal(test(d));

        d.setMinutes(14);
        expect(0).to.equal(test(d));

        d.setMinutes(15);
        expect(15).to.equal(test(d));

        d.setMinutes(29);
        expect(15).to.equal(test(d));

        d.setMinutes(30);
        expect(30).to.equal(test(d));

        d.setMinutes(44);
        expect(30).to.equal(test(d));

        d.setMinutes(45);
        expect(45).to.equal(test(d));

        d.setMinutes(58);
        expect(45).to.equal(test(d));
    });

    it("Round 5", async () => {
        const test = (t) => slotTime(t.getMinutes(), 60 / 5);

        const d = new Date();

        d.setMinutes(0);
        expect(0).to.equal(test(d));

        d.setMinutes(14);
        expect(10).to.equal(test(d));

        d.setMinutes(15);
        expect(15).to.equal(test(d));

        d.setMinutes(52);
        expect(50).to.equal(test(d));
    });
});
