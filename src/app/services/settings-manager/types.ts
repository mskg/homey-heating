
export enum Settings {
    LogCategory = "consolere",
    LogEnabled = "logenabled",
    Plans = "plans",
}

export enum InternalSettings {
    OperationMode = "mode",
    LogApi = "logapi",
    SetTemperaturePolicy = "temperaturepolicy",
    SetTemperatureThrottle = "temperatureThrottle",
}

export type AllSettings = Settings | InternalSettings;
