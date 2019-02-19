export enum Day {
    Monday = 1,
    Tuesday =  2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 0,
}

export enum NormalOperationMode {
    Automatic = 0,
}

export enum OverrideMode {
    DayAtHome = 1,
    DayAway = 2,
    Sleep = 3,
    Holiday = 4,
    OutOfSeason = 5,
}

export enum ThermostatMode {
    OverrideDay = 6,
    FullManual = 7,
}

export type OperationMode = NormalOperationMode | OverrideMode;
export type AllowedOverrides = OverrideMode | ThermostatMode;

export interface ITemperatureOverride {
    targetTemperature: number;
}

export interface IExternalReference {
    id: string;
    name?: string;
}

export interface ISetPoint {
    day: Day;

    hour: number;
    minute: number;

    targetTemperature: number;
}

// & ThermostatMode]
export type Overrides =  { [key in keyof typeof OverrideMode]?: ITemperatureOverride };

// defined schedules
// assignement of schedules to zones
export interface IHeatingPlan extends IExternalReference {
    description?: string;
    enabled: boolean;

    schedule: ISetPoint[];
    devices?: string[];
    zones?: string[];

    overrides?: Overrides;
    thermostatMode?: ThermostatMode | NormalOperationMode;
}

export interface IHeatingDevice extends IExternalReference {
    icon?: string;
}

export interface IHeatingZone extends IExternalReference {
    icon?: string;
}

export interface IScheduleInformation {
    mode: OperationMode;
    nextDate?: Date;
    temperatures: ICalculatedTemperature[];
}

export interface ICalculatedTemperature {
    device: IHeatingDevice;

    temperature?: number;
    targetTemperature: number;
    plan: IExternalReference;
}
