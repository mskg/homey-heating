import { ICategoryLogger, ILogger } from "./types";

export class CategoryLogger implements ILogger, ICategoryLogger {
    constructor(private logger: ILogger, private category: string) {
    }

    public createSubLogger(category: string): ICategoryLogger {
        return new CategoryLogger(this, category);
    }

    public information(...args: any[]) {
        this.logger.information(`[${this.category.padEnd(10)}]`, ...args);
    }

    public debug(...args: any[]) {
        this.logger.debug(`[${this.category.padEnd(10)}]`, ...args);
    }

    public error(exception, ...args: any[]) {
        this.logger.error(exception, `[${this.category.padEnd(10)}]`, ...args);
    }
}
