
export interface ILogger {
    debug(...args: any[]);
    information(...args: any[]);
    error(...args: any[]);
}

export interface ICategoryLogger extends ILogger {
    createSubLogger(category: string): ICategoryLogger;
}
