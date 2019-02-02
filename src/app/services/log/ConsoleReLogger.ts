import * as ConsoleRe from "console-remote-client";
import { ILogger } from "./declarations";

export class ConsoleReLogger implements ILogger {
    private consolere: any = null;

    constructor(channel: string) {
        this.consolere = ConsoleRe.connect("console.re", "80", channel);
    }

    public information(...args: any[]) {
        (console as any).re.information(...args);
    }

    public debug(...args: any[]) {
        (console as any).re.log(...args);
    }

    public error(...args: any[]) {
        (console as any).re.error(...args);
    }
}
