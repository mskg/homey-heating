import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

@injectable()
class DebuggerOn extends ApiBase {
    constructor() {
        super("GET", "/debugger/on");
        this.public = !__PRODUCTION__ || __VERSION === "0.0.0";
    }

    protected async execute(_args: IAPIParams) {
        if (__VERSION !== "0.0.0") { throw new Error("Access denied."); }

        const inspector = require("inspector");
        inspector.open(9229, "0.0.0.0", false);

        return SUCCESS;
    }
}

class DebuggerOff extends ApiBase {
    constructor() {
        super("GET", "/debugger/off");
        this.public = !__PRODUCTION__ || __VERSION === "0.0.0";
    }

    protected async execute(_args: IAPIParams) {
        if (__VERSION !== "0.0.0") { throw new Error("Access denied."); }

        const inspector = require("inspector");
        inspector.close();

        return SUCCESS;
    }
}

export default [
    DebuggerOn,
    DebuggerOff,
];
