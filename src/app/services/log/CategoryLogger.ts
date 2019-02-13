import { LogService } from "./LogService";
import { ILogger } from "./types";

export class CategoryLogger implements ILogger {
    private category: any;

    public constructor(category: string) {
        this.category = category;

        if (this.category.length > 10) {
            LogService.defaultLog.debug(`Category ${category} is too big.`);
        }
    }

    public information(...args: any[]) {
        if (args != null && args.length == 1 && typeof args[0] === "string") {
            LogService.defaultLog.information(`[INFO ] [${this.category.padEnd(10)}] ${args[0]}`);
        }
        else {
            LogService.defaultLog.information(`[INFO ] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public debug(...args: any[]) {
        if (args != null && args.length == 1 && typeof args[0] === "string") {
            LogService.defaultLog.information(`[DEBUG] [${this.category.padEnd(10)}] ${args[0]}`);
        }
        else {
            LogService.defaultLog.information(`[DEBUG] [${this.category.padEnd(10)}]`, ...args);
        }
    }

    public error(...args: any[]) {
        if (args != null && args.length == 1 && typeof args[0] === "string") {
            LogService.defaultLog.information(`[ERROR] [${this.category.padEnd(10)}] ${args[0]}`);
        }
        else {
            LogService.defaultLog.information(`[ERROR] [${this.category.padEnd(10)}]`, ...args);
        }
    }
}
