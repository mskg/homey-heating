import { singleton } from "tsyringe";
import { CategoryLogger } from "./CategoryLogger";
import { LogService } from "./LogService";
import { ICategoryLogger } from "./types";

@singleton()
export class LoggerFactory {
    public createLogger(category: string): ICategoryLogger {
        return new CategoryLogger(LogService.defaultLog, category);
    }
}
