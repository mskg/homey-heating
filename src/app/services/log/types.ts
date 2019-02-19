
export interface ILogger {
    debug(...args: any[]);
    information(...args: any[]);
    error(exception, ...args: any[]);
}

export interface INeedsCleanup {
    teardown(): Promise<boolean>;
}

export interface ICategoryLogger extends ILogger {
    createSubLogger(category: string): ICategoryLogger;
}
