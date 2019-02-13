import { AuditedDevice } from "../device-manager";

type SetTemperatureResult = {
    success: boolean,
    error?: string
}

export interface ISetTemperaturePolicy {
    setTargetTemperature(d: AuditedDevice, targetTemperature: number): Promise<SetTemperatureResult>;
}

export enum PolicyType {
    Enforce = "enforce_policy",
    CheckTemperature = "check_policy",

    Throtteled_Enforce = "throttled_enforce_policy",
    Throtteled_CheckTemperature = "throttled_check_policy"
}

