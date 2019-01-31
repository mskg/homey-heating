export interface IZone {
    id: string;
    name: string;
    // order: number;
    // parent?: string;
    icon: string;
}

export const TARGET_TEMPERATURE: string = "target_temperature";
export const MEASURE_TEMPERATURE: string = "measure_temperature";
export const CLASS_THERMOSTAT: string = "thermostat";

export interface ICapabilityInstance<T> {
    value: T;
    setValue(val: T);
    destroy();
}

export type HashedList<T> = {
    [key: string]: T;
  } & ArrayLike<T>;

export interface IDevice {
    id: string;
    name: string;
    zone: string;
    class: string;
    ready: boolean;
    available: boolean;
    unavailableMessage: string;
    iconObj?: {
        id: string;
        url: string;
    }

    makeCapabilityInstance<T>(id: string): Promise<ICapabilityInstance<T>>;
}

type EventHandler<T> = (zone: T) => void; 

export interface IZoneManager {
    getZones(): Promise<HashedList<IZone>>;
    destroy();

    on: (event: string, callback: EventHandler<IZone>) => void;
}

export interface IDeviceManager {
    getDevices(): Promise<HashedList<IDevice>>;
    destroy();

    on: (event: string, callback: EventHandler<IDevice>) => void;
}

export interface IHomeyAPI {
    zones: IZoneManager;
    devices: IDeviceManager;
}
