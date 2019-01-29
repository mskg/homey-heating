import * as AthomAPI from "athom-api";
import { LogService } from "../log";
import { IHomeyAPI } from "./declarations";

export class HomeyAPIService {
    public static async getInstance(): Promise<IHomeyAPI> {
        if (HomeyAPIService.homeyAPI == null) {
            LogService.defaultLog.debug("Connecting to API");
            HomeyAPIService.homeyAPI = await AthomAPI.HomeyAPI.forCurrentHomey();
        }

        return HomeyAPIService.homeyAPI;
    }

    private static homeyAPI = null;

    private constructor() {}
}
