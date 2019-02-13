
import { isEmpty } from "lodash";
import { container } from "tsyringe";
import { Settings, SettingsManagerService } from "../settings-manager";
import { AppLogger } from "./AppLogger";
import { ConsoleLogger } from "./ConsoleLogger";
import { ConsoleReLogger } from "./ConsoleReLogger";
import { ILogger } from "./types";

export class LogService implements ILogger {

    public static get defaultLog(): ILogger {
        return LogService.instance;
    }

    public static setupForTest() {
        LogService.instance.loggers = [];
    }

    public static init(app) {
        const manager = container.resolve(SettingsManagerService);
        manager.onChanged.subscribe((v, e) => {
            if (e.setting === Settings.LogEnabled || e.setting === Settings.LogCategory) {
                LogService.instance.information("Reload due to settings change.");
                LogService.instance.evaluateLogger(app);
            }
        });

        LogService.instance.evaluateLogger(app);
    }

    private static instance = new LogService();

    private loggers: ILogger[] = [new ConsoleLogger()];
    private constructor() { }

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
    private evaluateLogger(app) {
        const newLoggers = [];

        const manager = container.resolve(SettingsManagerService);
        const channel = manager.get<string>(Settings.LogCategory);
        const logEnabled = manager.get<boolean>(Settings.LogEnabled, false);

        // console.re also outputs to standard console
        if (!isEmpty(channel) && logEnabled) {
            newLoggers.push(new ConsoleReLogger(channel));
        } else if (app != null) {
            newLoggers.push(new AppLogger(app));
        } else {
            newLoggers.push(new ConsoleLogger());
        }

        this.loggers = newLoggers;
    }
}
