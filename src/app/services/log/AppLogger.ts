import { ILogger } from "./declarations";

export class AppLogger implements ILogger {
    private app: any;

    public constructor(app: any) {
        this.app = app;
    }
    
    public information(message: any) {
        this.app.log(message);
    }

    public debug(message: any) {
        this.app.log(message);
    }

    public error(message: any) {
        this.app.error(message);
    }
}
