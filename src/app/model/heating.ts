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
    Automatic = 0
}

export enum OverrideMode {
    DayAtHome = 1,
    DayAway = 2,
    Sleep = 3,
    Holiday = 4
}

export type OperationMode = NormalOperationMode | OverrideMode;

export interface ITemperatureOverride {
    targetTemperature: number,
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

export type Overrides =  { [key in keyof typeof OverrideMode]?: ITemperatureOverride };

// defined schedules
// assignement of schedules to zones
export interface IHeatingPlan extends IExternalReference {
    enabled: boolean;
    schedule: ISetPoint[];

    devices?: string[];
    zones?: string[];

    overrides?: Overrides
}

export interface IHeatingDevice extends IExternalReference {
    icon?: string;
}

export interface IHeatingZone extends IExternalReference {
    icon?: string;
}

export interface ICalculatedTemperature {
    device: IHeatingDevice;

    temperature?: number;
    targetTemperature: number;
    plan: IExternalReference;
}