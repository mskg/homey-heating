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
        const result: {
            [key: string]: any,
        } = {};
        // const manager = this.myApp.getService(SettingsManagerService);

        forEach(Object.keys(Settings), (s: any) => {
            result[s] = this.manager.get((Settings as any)[s]);
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

        forEach([...Object.keys(Settings), ...Object.keys(InternalSettings)], (publicKey: string) => {
            // @ts-ignore
            const privateKey: string = Settings[publicKey];

            if (settings.hasOwnProperty(publicKey)) {
                if (this.manager.get(privateKey as AllSettings) !== settings[publicKey]) {
                    this.manager.set(privateKey as AllSettings, settings[publicKey]);
                } else {
                    this.logger.debug(`Setting ${privateKey} did not change.`);
                }
            }
        });

        return SUCCESS;
    }
}

export default [
    GetSettings,
    PutSettings,
];
