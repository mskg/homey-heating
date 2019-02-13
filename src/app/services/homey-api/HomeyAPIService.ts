import * as AthomAPI from "athom-api";
import { singleton } from "tsyringe";
import { asynctrycatchlog, LoggerFactory } from "../log";
import { IHomeyAPI } from "./declarations";

@singleton()
// @injectable()
export class HomeyAPIService {
    private logger;
    private homeyAPI = null;

    public constructor(loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("APISvc");
    }

    // if that fails we're dead anyhow
    //  All pathes capture the failure
    public async getInstance(): Promise<IHomeyAPI> {
        if (this.homeyAPI == null) {
            try {
                this.logger.debug("Connecting to API");
                this.homeyAPI = await AthomAPI.HomeyAPI.forCurrentHomey();
            } catch (e) {
                this.logger.console.error("CATASTROPHIC FAILURE **** CANNOT BE HANDELED *****", e);

                this.homeyAPI = null;
                throw e;
            }
        }

        return this.homeyAPI;
    }
}
