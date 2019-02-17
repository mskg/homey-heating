import { ILogger } from "./types";

const ansiForeGroundColor = (c) => "\u001b[" + c + "m";
const RESET_FG = ansiForeGroundColor("39");

// 2bit colors
const RED = ansiForeGroundColor("31");
const GRAY = ansiForeGroundColor("90");
const YELLOW = ansiForeGroundColor("33");

// tslint:disable: no-console
export class ConsoleLogger implements ILogger {

    public information(...args: any[]) {
        console.log(YELLOW, ...args, RESET_FG);
    }

    public debug(...args: any[]) {
        // tslint:disable-next-line: no-console
        console.log(GRAY, ...args, RESET_FG);
    }

    public error(...args: any[]) {
        // tslint:disable-next-line: no-console
        console.error(RED, ...args, RESET_FG);
    }
}
