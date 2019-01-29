import * as ConsoleRe from "console-remote-client";
import { ILogger } from "./declarations";

export class ConsoleReLogger implements ILogger {
    private consolere: any = null;

    constructor(channel: string) {
        this.consolere = ConsoleRe.connect("console.re", "80", channel);
    }

    public information(message: any) {
        (console as any).re.information(message);
    }

    public debug(message: any) {
        (console as any).re.log(message);
    }

    public error(message: any) {
        (console as any).re.error(message);
    }
}
