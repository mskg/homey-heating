import { ICategoryLogger, ILogger } from "./types";

export class CategoryLogger implements ILogger, ICategoryLogger {
    private category: string;

    constructor(private logger: ILogger, category: string, modify = true) {
        if (!modify) {
            this.category = category;
        } else {
            this.category = `[${category.padEnd(10)}]`;
        }
    }

    public createSubLogger(newCategory: string): ICategoryLogger {
        return new CategoryLogger(this.logger, `${this.category} [${newCategory.padEnd(10)}]`, false);
    }

    public information(...args: any[]) {
        this.logger.information(this.category, ...args);
    }

    public debug(...args: any[]) {
        this.logger.debug(this.category, ...args);
    }

    public error(exception, ...args: any[]) {
        this.logger.error(exception, this.category, ...args);
    }
}
