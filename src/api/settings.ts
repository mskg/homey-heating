import { ManagerSettings } from "homey";
import { forEach } from "lodash";
import { Settings } from "../app/model";
import { ApiBase } from "./types";

class GetSettings extends ApiBase {
    constructor() {
        super("GET", "/settings");
    }

    public fn(args, callback) {
        this.logger.debug("GET settings");

        var result = {};

        forEach(Object.keys(Settings), s => {
            result[s] = ManagerSettings.get(Settings[s]);
        });

        callback(null, result);
    }
}

class PutSettings extends ApiBase {
    constructor() {
        super("PUT", "/settings");
    }

    public fn(args, callback) {
        this.logger.debug("PUT settings");

        const settings = args.body;

        forEach(Object.keys(Settings), publicKey => {
            var privateKey = Settings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                ManagerSettings.set(privateKey, settings[publicKey]);
            }
        });

        this.myApp.refreshConfig();
        callback(null, null);
    }
}

export default [
    new GetSettings(),
    new PutSettings()
];