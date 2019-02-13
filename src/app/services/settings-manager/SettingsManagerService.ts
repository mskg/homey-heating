import { ManagerSettings } from "homey";
import { EventDispatcher } from "strongly-typed-events";
import { singleton } from "tsyringe";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { AllSettings } from "./types";

@singleton()
export class SettingsManagerService {
    private logger: ILogger;
    private onChangedDispatcher = new EventDispatcher<SettingsManagerService, {
        setting: AllSettings,
        value: any
    }>();

    private devSettings: { [key: string]: string } = {};

    constructor(factory: LoggerFactory) {
        this.logger = factory.createLogger("Settings");
    }

    public get onChanged() {
        return this.onChangedDispatcher.asEvent();
    }

    // Catastrophic failure, cannot be handeled here.
    @trycatchlog()
    public get<T>(setting: AllSettings, def: T = null) {
        let val = PRODUCTION
            ? ManagerSettings.get(setting)
            : this.devSettings[setting];

        if (val == null || val == undefined) val = def;

        this.logger.debug(`Get '${setting}' => '${val}'`);
        return val;
    }

    // Catastrophic failure, cannot be handeled here.
    @trycatchlog()
    public set<T>(setting: AllSettings, val: T) {
        this.logger.debug(`Put '${setting}' <= '${val}'`);

        try {
            if (PRODUCTION) {
                if (val == null) ManagerSettings.unset(setting);
                else ManagerSettings.set(setting, val);
            }
            else {
                if (val == null) delete this.devSettings[setting];
                else this.devSettings[setting] = "" + val;
            }
        } finally {
            this.onChangedDispatcher.dispatch(this, {
                setting: setting,
                value: val
            });
        }
    }
}
