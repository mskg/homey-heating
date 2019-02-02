
import { ManagerSettings } from "homey";
import { isEmpty } from "lodash";
import { Settings } from "../../model/constants";
import { AppLogger } from "./AppLogger";
import { CategoryLogger } from "./CategoryLogger";
import { ConsoleLogger } from "./ConsoleLogger";
import { ConsoleReLogger } from "./ConsoleReLogger";
import { ILogger } from "./declarations";

export class LogService implements ILogger {
    public static init(app) {
        LogService.instance.loggers = [];

        const channel = ManagerSettings.get(Settings.LogCategory);
        if (!isEmpty(channel) && ManagerSettings.get(Settings.LogEnabled) === true) {
            LogService.instance.loggers.push(new ConsoleReLogger(channel));
        } else if (app != null) {
            LogService.instance.loggers.push(new AppLogger(app));
        } else {
            new ConsoleLogger();
        }
    }

    public static createLogger(name: string): ILogger {
        return new CategoryLogger(name);
    }

    public static get defaultLog(): ILogger {
        return LogService.instance;
    }

    public information(...args: any[]) {
        this.loggers.forEach((e) => {
            e.debug(...args);
        });
    }

    public debug(...args: any[]) {
        this.loggers.forEach((e) => {
            e.debug(...args);
        });
    }

    public error(...args: any[]) {
        this.loggers.forEach((e) => {
            e.error(...args);
        });
    }

    private loggers: ILogger[] = [new ConsoleLogger()];

    private static instance = new LogService();
    private constructor() { }
}
