import { ILogger } from "./declarations";
import { LogService } from "./LogService";

export class CategoryLogger implements ILogger {
    private category: any;

    public constructor(category: string) {
        this.category = category;

        if (this.category.length > 10) {
            LogService.defaultLog.debug(`Category ${category} is too big.`);
        }
    }

    public information(message: any) {
        LogService.defaultLog.information(`[INFO ] [${this.category.padEnd(10)}] ${message}`);
    }

    public debug(message: any) {
        LogService.defaultLog.debug(`[DEBUG] [${this.category.padEnd(10)}] ${message}`);
    }

    public error(message: any) {
        LogService.defaultLog.error(`[ERROR] [${this.category.padEnd(10)}] ${message}`);
    }
}
