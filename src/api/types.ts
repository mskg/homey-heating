import { app } from "homey";
import { HeatingSchedulerApp } from "../app/app";
import { ILogger } from "../app/services/log";

declare var PRODUCTION: boolean;

export interface IAPIParams {
    body: any;
    params: { [k: string]: string };
    query: { [k: string]: string };
}

export type CallBack = (error: any, result: any) => void;
export type Methods = "GET" | "POST" | "PUT" | "DELETE";

export interface IAPIFunction {
    readonly method: Methods | Methods[],
    readonly path: string,
    readonly public: boolean,

    fn: (args: IAPIParams, callback: CallBack) => void
}

export abstract class ApiBase implements IAPIFunction {
    public method;
    public path;
    public public = !PRODUCTION;

    _logger: ILogger = null;

    get myApp() {
        return app as HeatingSchedulerApp;
    }

    get logger() {
        if (this._logger == null) {
            this._logger = this.myApp.createLogger("Api");
        }

        return this._logger;
    }

    constructor(method: string, path: string) {
        this.method = method;
        this.path = path;
    }

    public abstract fn(args, callback): void;
}
