import { Settings, SettingsManagerService, InternalSettings, AllSettings } from "@app/services";
import { forEach } from "lodash";
import { ApiBase, SUCCESS, IAPIParams } from "./types";
import { injectable } from "tsyringe";

@injectable()
class GetSettings extends ApiBase {
    constructor(private manager: SettingsManagerService) {
        super("GET", "/settings");
    }

    protected async execute() {
        var result = {};
        // const manager = this.myApp.getService(SettingsManagerService);

        forEach(Object.keys(Settings), s => {
            result[s] = this.manager.get(Settings[s]);
        });

        return result;
    }
}

type Body = {[key: string]: string }

@injectable()
class PutSettings extends ApiBase {
    constructor(private manager: SettingsManagerService) {
        super("PUT", "/settings");
    }

    protected async execute(args: IAPIParams<Body>) {
        const settings = args.body;

        forEach(Object.keys(Settings), publicKey => {
            var privateKey = Settings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                this.manager.set(privateKey, settings[publicKey]);
            }
        });

        // also allow internal settings
        forEach(Object.keys(InternalSettings), publicKey => {
            var privateKey = InternalSettings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                this.manager.set(privateKey, settings[publicKey]);
            }
        });

        return SUCCESS;
    }
}

export default [
    GetSettings,
    PutSettings
];