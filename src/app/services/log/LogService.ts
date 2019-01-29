
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

    public information(message: any) {
        this.loggers.forEach((e) => {
            e.debug(message);
        });
    }

    public debug(message: any) {
        this.loggers.forEach((e) => {
            e.debug(message);
        });
    }

    public error(message: any) {
        this.loggers.forEach((e) => {
            e.error(message);
        });
    }

    private loggers: ILogger[] = [new ConsoleLogger()];

    private static instance = new LogService();
    private constructor() { }
}
