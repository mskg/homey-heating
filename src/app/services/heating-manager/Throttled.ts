import { AsyncThrottle } from "@app/helper";
import { registry } from "tsyringe";
import { AuditedDevice } from "../device-manager";
import { InternalSettings, SettingsManagerService } from "../settings-manager";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@registry([{
    token: PolicyType.Throttled_Enforce, useFactory: (c) => new ThrottledTemperaturePolicy(
        c.resolve(PolicyType.Enforce),
        c.resolve(SettingsManagerService)),
}])
@registry([{
    token: PolicyType.Throttled_CheckTemperature, useFactory: (c) => new ThrottledTemperaturePolicy(
        c.resolve(PolicyType.CheckTemperature),
        c.resolve(SettingsManagerService)),
}])
export class ThrottledTemperaturePolicy implements ISetTemperaturePolicy {
    private setMethod: CallableFunction;

    constructor(inner: ISetTemperaturePolicy, settings: SettingsManagerService) {
        const throttle = parseInt(settings.get<string>(InternalSettings.SetTemperatureThrottle, "2000"), 10);
        this.setMethod = AsyncThrottle(async (d, n) => await inner.setTargetTemperature(d, n), throttle);
    }

    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        return await this.setMethod(device, targetTemperature);
    }
}
