import { ICategoryLogger, ILogger } from "./types";

export class CategoryLogger implements ILogger, ICategoryLogger {
    constructor(private logger: ILogger, private category: string) {
        if (this.category.length > 10) {
            this.logger.debug(`Category ${category} is too big.`);
        }
    }

    public createSubLogger(category: string): ICategoryLogger {
        return new CategoryLogger(this, category);
    }

    public information(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.information(`[INFO ] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            this.logger.information(`[INFO ] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public debug(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.debug(`[DEBUG] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            this.logger.debug(`[DEBUG] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public error(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.error(`[ERROR] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            this.logger.error(`[ERROR] [${this.category.padEnd(10)}]`, ...args);
        }
    }
}
