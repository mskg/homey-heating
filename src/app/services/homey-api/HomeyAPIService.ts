import { HomeyAPI } from "athom-api";
import { singleton } from "tsyringe";
import { LoggerFactory } from "../log";

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
    public async getInstance(): Promise<HomeyAPI> {
        if (this.homeyAPI == null) {
            try {
                this.logger.debug("Connecting to API");
                this.homeyAPI = await HomeyAPI.forCurrentHomey();
            } catch (e) {
                this.logger.error("CATASTROPHIC FAILURE **** CANNOT BE HANDELED *****", e);

                this.homeyAPI = null;
                throw e;
            }
        }

        return this.homeyAPI;
    }
}
