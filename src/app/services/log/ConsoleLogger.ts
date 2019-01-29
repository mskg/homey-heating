import { ILogger } from "./declarations";

export class ConsoleLogger implements ILogger {

    public information(message: any) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }

    public debug(message: any) {
        // tslint:disable-next-line: no-console
        console.log(message);
    }

    public error(message: any) {
        // tslint:disable-next-line: no-console
        console.error(message);
    }
}
