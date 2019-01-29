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

export interface IDevice {
    id: string;
    name: string;
    zone: string;
    class: string;
    iconObj?: {
        id: string;
        url: string;
    }

    makeCapabilityInstance<T>(id: string): Promise<ICapabilityInstance<T>>;
}

export interface IZoneManager {
    getZones(): Promise<IZone[]>;
    destroy();
}

export interface IDeviceManager {
    getDevices(): Promise<IDevice[]>;
    destroy();
}

export interface IHomeyAPI {
    zones: IZoneManager;
    devices: IDeviceManager;
}
