import { HomeyAPI } from "athom-api";
import { singleton } from "tsyringe";
import { ICategoryLogger, LoggerFactory } from "../log";

@singleton()
export class HomeyAPIService {
    private logger: ICategoryLogger;
    private homeyAPI: HomeyAPI | null = null;

    public constructor(loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("APISvc");
    }

    // if that fails we're dead anyhow
    //  All pathes capture the failure
    public async getInstance(): Promise<HomeyAPI> {
        if (this.homeyAPI == null) {
            try {
                this.logger.debug("Connecting to API");
                this.homeyAPI = await HomeyAPI.forCurrentHomey();
            } catch (e) {
                this.logger.error(e, "CATASTROPHIC FAILURE **** CANNOT BE HANDELED *****");

                this.homeyAPI = null;
                throw e;
            }
        }

        return this.homeyAPI;
    }
}
