import { ILogger, InternalSettings, LoggerFactory, SettingsManagerService } from "@app/services";
import { container } from "tsyringe";

type UnkownParameters = { [k: string]: string; };

/***
 * Success for APIs not returning a value.
 */
export const SUCCESS = "OK";

export interface IAPIParams<B = any, P = UnkownParameters, Q = UnkownParameters> {
    body: B;
    params: P;
    query: Q;
}

type CallBack = (error: any, result: any) => void;
type Method = "GET" | "POST" | "PUT" | "DELETE";

export interface IAPIFunction<B = any, P = UnkownParameters, Q = UnkownParameters> {
    readonly method: Method | Method[];
    readonly path: string;
    readonly public: boolean;

    fn: (args: IAPIParams<B, P, Q>, callback: CallBack) => void;
}

/**
 * Base class for API methods.
 */
export abstract class ApiBase<B = any, P = UnkownParameters, Q = UnkownParameters> implements IAPIFunction<B, P, Q> {

    get logger(): ILogger {
        return ApiBase.logger;
    }

    /**
     * static initializer
     */
    public static initialize() {
        if (ApiBase.initialized) { return; }

        const settings = container.resolve<SettingsManagerService>(SettingsManagerService);
        settings.onChanged.subscribe((s, v) => {
            if (v.setting === InternalSettings.LogApi) {
                ApiBase.logApi = v.value;
            }
        });

        ApiBase.logApi = settings.get(InternalSettings.LogApi, false);
        ApiBase.logger = container.resolve<LoggerFactory>(LoggerFactory).createLogger("Api");
        ApiBase.initialized = true;
    }
    private static logger: ILogger = null;
    private static logApi = false;
    private static initialized = false;

    public readonly method;
    public readonly path;
    public readonly public = !__PRODUCTION__;

    constructor(method: string, path: string) {
        ApiBase.initialize();

        this.method = method;
        this.path = path;
        this.logger.information(`Bound endpoint ${method} ${path}`);
    }

    public async fn(args: IAPIParams<B, P, Q>, callback: CallBack) {
        try {
            if (ApiBase.logApi) {
                this.logger.debug(`${this.method} ${this.path} ${JSON.stringify(args)}`);
            } else {
                this.logger.debug(`${this.method} ${this.path}`);
            }

            const result = await (this.execute(args));

            if (ApiBase.logApi) {
                this.logger.debug(`${this.method} ${this.path}`,
                    "Request:", JSON.stringify(args),
                    "Response:", JSON.stringify(result));
            }

            callback(null, result);
        } catch (e) {
            this.logger.error(e, `${this.method} ${this.path} failed`, args);
            callback (e, null);
        }
    }

    protected abstract async execute(args: IAPIParams<B, P, Q>): Promise<any>;
}
