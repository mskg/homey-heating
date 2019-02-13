import { AuditedDevice } from "../device-manager";

type SetTemperatureResult = {
    success: boolean;
    skipped: boolean;
    error?: string;
};

export interface ISetTemperaturePolicy {
    setTargetTemperature(d: AuditedDevice, targetTemperature: number): Promise<SetTemperatureResult>;
}

export enum PolicyType {
    Enforce = "enforce_policy",
    CheckTemperature = "check_policy",

    Throttled_Enforce = "throttled_enforce_policy",
    Throttled_CheckTemperature = "throttled_check_policy",
}
