import { AllowedSetting, ManagerSettings } from "homey";
import { EventDispatcher } from "strongly-typed-events";
import { singleton } from "tsyringe";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { AllSettings } from "./types";

@singleton()
export class SettingsManagerService {
    private logger: ILogger;
    private onChangedDispatcher = new EventDispatcher<SettingsManagerService, {
        setting: string,
        value: any,
    }>();

    private devSettings: { [key: string]: any } = {};

    constructor(factory: LoggerFactory) {
        this.logger = factory.createLogger("Settings");
    }

    public get onChanged() {
        return this.onChangedDispatcher.asEvent();
    }

    public get<T extends AllowedSetting>(setting: AllSettings, def: T): T;
    public get<T extends AllowedSetting>(setting: AllSettings): T | undefined;

    // Catastrophic failure, cannot be handeled here.
    @trycatchlog()
    public get<T extends AllowedSetting>(setting: AllSettings, def?: T): T | undefined {
        let val = __PRODUCTION__
            ? ManagerSettings.get<T>(setting)
            : this.devSettings[setting];

        if (val == null) { val = def; }

        this.logger.debug(`Get '${setting}' => '${val}'`);
        return val;
    }

    // Catastrophic failure, cannot be handeled here.
    @trycatchlog()
    public set<T extends AllowedSetting>(setting: AllSettings, val: T) {
        this.logger.debug(`Put '${setting}' <= '${val}'`);

        // tslint:disable: one-line
        try {
            if (__PRODUCTION__) {
                if (val == null) { ManagerSettings.unset(setting); }
                else { ManagerSettings.set(setting, val); }
            } else {
                if (val == null) { delete this.devSettings[setting]; }
                else { this.devSettings[setting] = val; }
            }
        } finally {
            this.onChangedDispatcher.dispatch(this, {
                setting,
                value: val,
            });
        }
    }
}
