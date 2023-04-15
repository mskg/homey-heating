import { App as HomeyApp } from "homey";
import { HomeyAPIApp } from "homey-api";
import { singleton } from "tsyringe";
import { ICategoryLogger, LoggerFactory } from "../log";
import { StableHomeyAPI } from "./api";

type Homey = HomeyApp["homey"];

@singleton()
export class HomeyAPIService {
    private logger: ICategoryLogger;
    private homeyAPI: StableHomeyAPI | null = null;

    public constructor(loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("APISvc");
    }

    // if that fails we're dead anyhow
    //  All pathes capture the failure
    public async getInstance(homey: Homey | null): Promise<StableHomeyAPI> {
        if (this.homeyAPI == null) {
            try {
                this.logger.debug("Connecting to API");
                this.homeyAPI = new HomeyAPIApp({ homey, debug: !__PRODUCTION__ }) as StableHomeyAPI;
            } catch (e) {
                this.logger.error(e, "CATASTROPHIC FAILURE **** CANNOT BE HANDELED *****");

                this.homeyAPI = null;
                throw e;
            }
        }

        return this.homeyAPI;
    }
}
