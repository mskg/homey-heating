import { ICategoryLogger } from "./LoggerFactory";
import { LogService } from "./LogService";
import { ILogger } from "./types";

export class SubCategoryLogger implements ILogger, ICategoryLogger {
    constructor(private logger: ILogger, private subcateogry: string) {}

    public createSubLogger(category: string): ICategoryLogger {
        return new SubCategoryLogger(this, category);
    }

    public information(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.information(`[${this.subcateogry}] ${args[0]}`);
        } else {
            this.logger.information(`[${this.subcateogry}]`, ...args);
        }
    }

    public debug(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.debug(`[${this.subcateogry}] ${args[0]}`);
        } else {
            this.logger.debug(`[${this.subcateogry}]`, ...args);
        }
    }

    public error(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger.error(`[${this.subcateogry}] ${args[0]}`);
        } else {
            this.logger.error(`[${this.subcateogry}]`, ...args);
        }
    }
}

export class CategoryLogger implements ILogger, ICategoryLogger {
    constructor(private category: string) {
        if (this.category.length > 10) {
            LogService.defaultLog.debug(`Category ${category} is too big.`);
        }
    }

    public createSubLogger(category: string): ICategoryLogger {
        return new SubCategoryLogger(this, category);
    }

    public information(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            LogService.defaultLog.information(`[INFO ] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            LogService.defaultLog.information(`[INFO ] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public debug(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            LogService.defaultLog.debug(`[DEBUG] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            LogService.defaultLog.debug(`[DEBUG] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public error(...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            LogService.defaultLog.error(`[ERROR] [${this.category.padEnd(10)}] ${args[0]}`);
        } else {
            LogService.defaultLog.error(`[ERROR] [${this.category.padEnd(10)}]`, ...args);
        }
    }
}
