import { singleton } from "tsyringe";
import { CategoryLogger } from "./CategoryLogger";
import { ILogger } from "./types";

export interface ICategoryLogger extends ILogger {
    createSubLogger(category: string): ICategoryLogger;
}

@singleton()
export class LoggerFactory {
    public createLogger(category: string): ICategoryLogger {
        return new CategoryLogger(category);
    }
}
