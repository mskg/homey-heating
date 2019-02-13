import { singleton } from "tsyringe";
import { ILogger } from "./types";
import { CategoryLogger } from "./CategoryLogger";

@singleton()
export class LoggerFactory {
    constructor() {
    }

    public createLogger(name: string): ILogger {
        return new CategoryLogger(name);
    }   
}
