
export enum Settings {
    SentryEnabled = "sentry",

    ConsoleReLogCategory = "consolere",
    ConsoleReLogEnabled = "logenabled",

    Plans = "plans",

    NotifyModeChange = "notify_modechange",
    NotifySetSuccess = "notify_settempsuccess",
    NotifySetError = "notify_settemperror",
}

export enum InternalSettings {
    OperationMode = "mode",
    LogApi = "logapi",

    PlanConflictPolicy = "planconflictpolicy",

    SetTemperaturePolicy = "temperaturepolicy",
    SetTemperatureThrottle = "temperatureThrottle",
    SchedulerTimeSlots = "schedulerTimeslots",
    DriverDebounce = "driverdebounce",

    DeviceUpdateInterval = "deviceupdateinterval",
}

export type AllSettings = Settings | InternalSettings;
