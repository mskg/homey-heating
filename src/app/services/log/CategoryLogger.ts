import { ICategoryLogger, ILogger } from "./types";

export class CategoryLogger implements ILogger, ICategoryLogger {
    constructor(private root: boolean, private logger: ILogger, private category: string) {
        if (!__PRODUCTION__ && this.root && this.category.length > 10) {
            this.logger.error(`Category ${category} is too big.`);
        }
    }

    public createSubLogger(category: string): ICategoryLogger {
        return new CategoryLogger(false, this, category);
    }

    public information(...args: any[]) {
        this.log("information", ...args);
    }

    public debug(...args: any[]) {
        this.log("debug", ...args);
    }

    public error(...args: any[]) {
        this.log("error", ...args);
    }

    private log(level: "debug" | "error" | "information", ...args: any[]) {
        if (args != null && args.length === 1 && typeof args[0] === "string") {
            this.logger[level](`${this.formatLevelandCategory(level)} ${args[0]}`);
        } else {
            this.logger[level](this.formatLevelandCategory(level), ...args);
        }
    }

    private formatLevelandCategory(level: string) {
        // this is not the most beautiful solution :)
        if (level === "information") { level = "INFO"; }

        if (this.root) {
            return `[${level.toUpperCase().padEnd(5)}] [${this.category.padEnd(10)}]`;
        } else {
            return `[${this.category}]`;
        }
    }
}
