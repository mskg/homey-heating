import * as Sentry from "@sentry/node";
import { env } from "homey";
import {LogService} from "./LogService";
import { ILogger, INeedsCleanup } from "./types";

export class SentryLogger implements ILogger, INeedsCleanup {
    private enabled = false;

    constructor() {
        if (env.SENTRY_DSN == null || env.SENTRY_DSN === "" || env.SENTRY_DSN === "do-not-store") {
            // tslint:disable-next-line: no-console
            LogService.transportLog.error(new Error("NO DSN"), `sentry cannot be enabled without a valid DSN, check configuration`);
        } else {
            // tslint:disable-next-line: no-console
            LogService.transportLog.information("sentry has been enabled");

            this.enabled = true;

            Sentry.init({
                dsn: env.SENTRY_DSN,
                debug: !__PRODUCTION__,
                integrations: (i) => i.filter((i) => i.name !== "Console" && i.name !== "Http"),
                release: `homey-heating@${__VERSION}`,
            });
        }
    }

    public teardown(): Promise<boolean> {
        if (!this.enabled) { return Promise.resolve(true); }

        LogService.transportLog.information("Sentry cleaned up");
        return Sentry.close();
    }

    public information(category: string, message: string, ...args: any[]) {
        if (this.enabled) {
            // we assume category logger
            Sentry.addBreadcrumb({
                category,
                message,
                data: args,
                level: Sentry.Severity.Info,
            });
        }
    }

    public debug(category: string, message: string, ...args: any[]) {
        if (this.enabled) {
            // we assume category logger
            Sentry.addBreadcrumb({
                category,
                message,
                data: args,
                level: Sentry.Severity.Debug,
            });
        }
    }

    public error(exception: any, ...args: any[]) {
        if (this.enabled) {
            Sentry.configureScope((scope) => {
                scope.setExtra("messages", args);
                const eventId = Sentry.captureException(exception);
                LogService.transportLog.debug(`Sentry eventId`, eventId);
            });
        }
    }
}
