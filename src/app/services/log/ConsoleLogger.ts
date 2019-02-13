import { ILogger } from "./types";

export class ConsoleLogger implements ILogger {

    public information(...args: any[]) {
        // tslint:disable-next-line: no-console
        console.log(...args);
    }

    public debug(...args: any[]) {
        // tslint:disable-next-line: no-console
        console.log(...args);
    }

    public error(...args: any[]) {
        // tslint:disable-next-line: no-console
        console.error(...args);
    }
}
