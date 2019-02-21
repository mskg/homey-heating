import { ILogger } from "./types";

const ansiForeGroundColor = (c: string) => "\u001b[" + c + "m";
const RESET_FG = ansiForeGroundColor("39");

// 2bit colors
const RED = ansiForeGroundColor("31");
const GRAY = ansiForeGroundColor("90");
const YELLOW = ansiForeGroundColor("33");

// tslint:disable: no-console
export class ConsoleLogger implements ILogger {

    public information(msg: string, ...args: any[]) {
        console.log(`${YELLOW}${msg}`, ...[...args, RESET_FG]);
    }

    public debug(msg: string, ...args: any[]) {
        console.log(`${GRAY}${msg}`, ...[...args, RESET_FG]);
    }

    public error(exception: any, msg: string, ...args: any[]) {
        console.error(`${RED}${msg}`, ...[...args, exception, RESET_FG]);
    }
}
