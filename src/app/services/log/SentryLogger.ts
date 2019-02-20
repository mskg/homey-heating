import * as Sentry from "@sentry/node";
import { env } from "homey";
import { ILogger, INeedsCleanup } from "./types";

export class SentryLogger implements ILogger, INeedsCleanup {
    private enabled = false;

    constructor() {
        if (env.SENTRY_DSN == null || env.SENTRY_DSN === "" || env.SENTRY_DSN === "do-not-store") {
            // tslint:disable-next-line: no-console
            console.error(`sentry cannot be enabled without a valid DSN, check configuration`);
        } else {
            // tslint:disable-next-line: no-console
            console.info("********* sentry has been enabled");

            this.enabled = true;

            Sentry.init({
                dsn: env.SENTRY_DSN,
                debug: !__PRODUCTION__,
                integrations: (i) => i.filter(i => i.name !== "Console" && i.name !== "Http"),
                release: `homey-heating@${__VERSION}`,
            });
        }
    }

    public teardown() {
        if (!this.enabled) { return Promise.resolve(true); }
        return Sentry.close();
    }

    public information(category: string, message, ...args: any[]) {
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

    public debug(category: string, message, ...args: any[]) {
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

    public error(exception, ...args: any[]) {
        if (this.enabled) {
            Sentry.configureScope((scope) => {
                scope.setExtra("messages", args);
                Sentry.captureException(exception);
            });
        }
    }
}
