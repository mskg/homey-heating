import { singleton } from "tsyringe";
import { CategoryLogger } from "./CategoryLogger";
import { ILogger } from "./types";

@singleton()
export class LoggerFactory {
    public createLogger(name: string): ILogger {
        return new CategoryLogger(name);
    }
}
