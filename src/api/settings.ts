import { AllSettings, InternalSettings, Settings, SettingsManagerService } from "@app/services";
import { forEach } from "lodash";
import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

@injectable()
class GetSettings extends ApiBase {
    constructor(private manager: SettingsManagerService) {
        super("GET", "/settings");
    }

    protected async execute() {
        const result = {};
        // const manager = this.myApp.getService(SettingsManagerService);

        forEach(Object.keys(Settings), (s) => {
            result[s] = this.manager.get(Settings[s]);
        });

        return result;
    }
}

type Body = {[key: string]: string; };

@injectable()
class PutSettings extends ApiBase {
    constructor(private manager: SettingsManagerService) {
        super("PUT", "/settings");
    }

    protected async execute(args: IAPIParams<Body>) {
        const settings = args.body;

        forEach(Object.keys(Settings), (publicKey) => {
            const privateKey = Settings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                this.manager.set(privateKey, settings[publicKey]);
            }
        });

        // also allow internal settings
        forEach(Object.keys(InternalSettings), (publicKey) => {
            const privateKey = InternalSettings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                this.manager.set(privateKey, settings[publicKey]);
            }
        });

        return SUCCESS;
    }
}

export default [
    GetSettings,
    PutSettings,
];
