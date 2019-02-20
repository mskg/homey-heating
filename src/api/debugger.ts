import { LogService } from "@app/services";
import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

@injectable()
class DebuggerOn extends ApiBase {
    constructor() {
        super("get", "/debugger/on");
        this.public = !__PRODUCTION__ || __VERSION === "0.0.0";
    }

    protected async execute(args: IAPIParams<Body>) {
        if (__VERSION !== "0.0.0") { throw new Error("Access denied."); }

        const inspector = require("inspector");
        inspector.open(9229, "0.0.0.0", false);

        return SUCCESS;
    }
}

class DebuggerOff extends ApiBase {
    constructor() {
        super("get", "/debugger/off");
        this.public = !__PRODUCTION__ || __VERSION === "0.0.0";
    }

    protected async execute(args: IAPIParams<Body>) {
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
