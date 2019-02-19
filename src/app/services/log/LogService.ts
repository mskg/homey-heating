
import { isEmpty } from "lodash";
import { container } from "tsyringe";
import { Settings, SettingsManagerService } from "../settings-manager";
import { AppLogger } from "./AppLogger";
import { ConsoleLogger } from "./ConsoleLogger";
import { ILogger, INeedsCleanup } from "./types";

export class LogService implements ILogger {

    public static get defaultLog(): ILogger {
        return LogService.instance;
    }

    public static init(app) {
        const manager = container.resolve(SettingsManagerService);
        manager.onChanged.subscribe((v, e) => {
            if (e.setting === Settings.ConsoleReLogEnabled
                || e.setting === Settings.ConsoleReLogCategory
                || e.setting === Settings.SentryEnabled) {

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
        this.loggers.forEach((l) => {
            try {
                l.information(...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        });
    }

    public debug(...args: any[]) {
        this.loggers.forEach((l) => {
            try {
                l.debug(...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        });
    }

    public error(exception, ...args: any[]) {
        this.loggers.forEach((l) => {
            try {
                l.error(exception, ...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        });
    }

    private evaluateLogger(app) {
        const newLoggers = [];

        const manager = container.resolve(SettingsManagerService);
        const channel = manager.get(Settings.ConsoleReLogCategory) as string;
        const logEnabled = manager.get(Settings.ConsoleReLogEnabled, false) as boolean;
        const sentryEnabled = manager.get(Settings.SentryEnabled, true) as boolean;

        if (sentryEnabled === true) {
            const SentryLogger = require("./SentryLogger").SentryLogger;
            newLoggers.push(new SentryLogger());
        } else {
            LogService.instance.information("********** Sentry is disabled.");
        }

        if (!isEmpty(channel) && logEnabled) {
            const ConsoleReLogger = require("./ConsoleReLogger").ConsoleReLogger;
            newLoggers.push(new ConsoleReLogger(channel));
        }

        if (app != null && __PRODUCTION__) {
            newLoggers.push(new AppLogger(app));
        } else {
            newLoggers.push(new ConsoleLogger());
        }

        const tearDowns = this.loggers.map((l) => {
            if ((l as any).hasOwnProperty("teardown")) {
                return (l as unknown as INeedsCleanup).teardown();
            }
        });

        this.loggers = newLoggers;

        if (tearDowns.length > 0) {
            Promise.all(tearDowns)
                .catch((r) => {
                    LogService.instance.error("Could not teardown loggers", r);
                });
        }
    }
}
