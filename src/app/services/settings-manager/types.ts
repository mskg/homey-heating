
export enum Settings {
    LogCategory = "consolere",
    LogEnabled = "logenabled",
    Plans = "plans",

    NotifyModeChange = "notify_modechange",
    NotifySetSuccess = "notify_settempsuccess",
    NotifySetError = "notify_settemperror",
}

export enum InternalSettings {
    OperationMode = "mode",
    LogApi = "logapi",
    SetTemperaturePolicy = "temperaturepolicy",
    SetTemperatureThrottle = "temperatureThrottle",
    SchedulerTimeSlots = "schedulerTimeslots",
    DriverDebounce = "driverdebounce",
}

export type AllSettings = Settings | InternalSettings;
