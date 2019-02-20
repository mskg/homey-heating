import * as ConsoleRe from "console-remote-client";
import { ILogger, INeedsCleanup } from "./types";

export class ConsoleReLogger implements ILogger, INeedsCleanup {
    private consolere: any = null;

    constructor(channel: string) {
        console.log("********** console.re enabled");
        this.consolere = ConsoleRe.connect("console.re", "443", channel);

        this.consolere.toServerRe.client = false;
        this.consolere.re.client = false;
    }

    public teardown() {
        this.consolere.disconnect();
        delete this.consolere;

        return Promise.resolve(true);
    }

    public information(category, message, ...args: any[]) {
        (console as any).re.info(`${category} ${message}`, ...args);
    }

    public debug(category, message, ...args: any[]) {
        (console as any).re.debug(`${category} ${message}`, ...args);
    }

    public error(exception, ...args: any[]) {
        (console as any).re.error(...args, exception);
    }
}
