import { App } from "homey";
import { ILogger } from "./types";

export class AppLogger implements ILogger {
    private app: any;

    public constructor(app: App) {
        this.app = app;
    }

    public information(...args: any[]) {
        this.app.log("[INFO ]", ...args);
    }

    public debug(...args: any[]) {
        this.app.log("[DEBUG]", ...args);
    }

    public error(exception: any, ...args: any[]) {
        this.app.error("[ERROR]", ...args, exception);
    }
}
