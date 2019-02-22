
export interface ILogger {
    debug(...args: any[]): void;
    information(...args: any[]): void;
    error(exception: any, ...args: any[]): void;
}

export interface INeedsCleanup {
    teardown(): Promise<boolean>;
}

export interface ICategoryLogger extends ILogger {
    createSubLogger(category: string): ICategoryLogger;
}
