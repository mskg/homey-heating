
import { App } from "homey";
import { isEmpty } from "lodash";
import { container } from "tsyringe";
import { Settings, SettingsManagerService } from "../settings-manager";
import { AppLogger } from "./AppLogger";
import { ConsoleLogger } from "./ConsoleLogger";
import { ILogger, INeedsCleanup } from "./types";

export class LogService implements ILogger {

    public static get transportLog(): ILogger {
        return LogService.instance.loggers[0];
    }

    public static get default(): ILogger {
        return LogService.instance;
    }

    public static init(app: App) {
        const manager = container.resolve(SettingsManagerService);

        // handle settings change
        manager.onChanged.subscribe((_v, e) => {
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
        for (const logger of this.loggers) {
            try {
                logger.information(...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        }
    }

    public debug(...args: any[]) {
        for (const logger of this.loggers) {
            try {
                logger.debug(...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        }
    }

    public error(exception: any, ...args: any[]) {
        for (const logger of this.loggers) {
            try {
                logger.error(exception, ...args);
            // tslint:disable-next-line: no-console
            } catch (e) { console.error("Failed to log", e); }
        }
    }

    private evaluateLogger(app: any /* don't want to import here */) {
        let newLogger: ILogger;
        const newTransports = [];

        const manager = container.resolve(SettingsManagerService);
        const channel = manager.get(Settings.ConsoleReLogCategory) as string;
        const logEnabled = manager.get(Settings.ConsoleReLogEnabled, false) as boolean;
        const sentryEnabled = manager.get(Settings.SentryEnabled, true) as boolean;

        // load only if required
        if (sentryEnabled === true) {
            const SentryLogger = require("./SentryLogger").SentryLogger;
            newTransports.push(new SentryLogger());
        }

        // load only if required
        if (!isEmpty(channel) && logEnabled === true) {
            const ConsoleReLogger = require("./ConsoleReLogger").ConsoleReLogger;
            newTransports.push(new ConsoleReLogger(channel));
        }

        if (app != null && __PRODUCTION__) {
            newLogger = new AppLogger(app);
        } else {
            newLogger = new ConsoleLogger();
        }

        const tearDowns: Array<Promise<boolean>> = this.loggers.map((l: ILogger) => {
            if (typeof (l as any).teardown === "function") {
                return (l as unknown as INeedsCleanup).teardown();
            }

            return Promise.resolve(true);
        }).filter(Boolean);

        this.loggers = [newLogger, ...newTransports];

        if (tearDowns.length > 0) {
            setImmediate(async () => await Promise.all(tearDowns).catch((r: any) => {
                LogService.instance.error(r, "Could not teardown loggers");
            }));
        }
    }
}
