import { ILogger } from "./types";

export class AppLogger implements ILogger {
    private app: any;

    public constructor(app: any) {
        this.app = app;
    }
    
    public information(...args: any[]) {
        this.app.log(...args);
    }

    public debug(...args: any[]) {
        this.app.log(...args);
    }

    public error(...args: any[]) {
        this.app.error(...args);
    }
}
