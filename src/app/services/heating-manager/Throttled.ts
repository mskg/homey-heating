import { AsyncThrottle } from "@app/helper";
import { injectable, registry } from "tsyringe";
import { AuditedDevice } from "../device-manager";
import { InternalSettings, SettingsManagerService } from "../settings-manager";
import { CheckTemperaturePolicy } from "./CheckTemperaturePolicy";
import { EnforceTemperaturePolicy } from "./EnforceTemperaturePolicy";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@injectable()
@registry([{ token: PolicyType.Throttled_Enforce, useToken: ThrottledEnforce }])
class ThrottledEnforce implements ISetTemperaturePolicy {
    private logger;
    private setMethod;

    constructor(inner: EnforceTemperaturePolicy, settings: SettingsManagerService) {
        const throttle = parseInt(settings.get(InternalSettings.SetTemperatureThrottle, "2000"), 10);
        this.setMethod = AsyncThrottle(async (d, n) => await inner.setTargetTemperature(d, n), throttle);
    }

    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        return await this.setMethod(device, targetTemperature);
    }
}

@injectable()
@registry([{ token: PolicyType.Throttled_CheckTemperature, useToken: ThrottledCheck }])
class ThrottledCheck implements ISetTemperaturePolicy {
    private logger;
    private setMethod;

    constructor(inner: CheckTemperaturePolicy, settings: SettingsManagerService) {
        const throttle = parseInt(settings.get(InternalSettings.SetTemperatureThrottle, "2000"), 10);
        this.setMethod = AsyncThrottle(async (d, n) => await inner.setTargetTemperature(d, n), throttle);
    }

    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        return await this.setMethod(device, targetTemperature);
    }
}
