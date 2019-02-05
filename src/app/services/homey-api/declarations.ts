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


// from Capability — target_temperature
export const TARGET_TEMPERATURE_MIN = 4;
export const TARGET_TEMPERATURE_MAX = 35;

export interface ICapabilityInstance<T> {
    value: T;
    setValue(val: T);
    destroy();
}

type EventHandler<T> = (param: T) => void;

// interface IEventHandler<E, T> {
//     on(s: E, cb: EventHandler<T>);
// }

export interface ICapability {
    id: string,
    uri: string
    title: string,
    desc: string,
    type: "boolean" | "number" | "string" | "enum"
    getable: boolean,
    setable: boolean,
    chartType: "line" | "area" | "stepLine" | "column" | "spline" | "splineArea" | "scatter",
    decimals: number,
    min: number,
    max: number,
    step: number,
    units: string,

    value: any;
    values: [{
        id: string,
        title: string,
    }],

    on(s: "$update", cb: EventHandler<ICapability>);
    on(s: "$delete", cb: EventHandler<void>);
}

export type StringHashMap<T> = {
    [id: string]: T;
} /*& ArrayLike<T>*/;

export interface IDevice {
    id: string;
    name: string;
    driverUri: string,
    driverId: string,    
    zone: string;
    icon: string,
    
    settings?: {[key: string]: string|boolean|number},
    // true if settings exist
    settingObj: boolean,

    class: string;
    virtualClass: string;

    ui: {
        quickAction?: string,
        components: [{
            id: string,
            capabilities: string[]
        }],
    },

    ready: boolean;
    available: boolean;
    unavailableMessage: string;
    iconObj?: {
        id: string;
        url: string;
    }

    makeCapabilityInstance<T>(id: string, callback?: EventHandler<IDevice>): Promise<ICapabilityInstance<T>>;

    setting: {},
    capabilities: string[],
    capabilitiesObj: {
        [key: string]: ICapability
    }
    capabilitiesOptions: any,

    repair: boolean,
    unpair: boolean,
    images: [
        {
            type: string,
            id: string,
            imageObj: any
        }
    ],
    insights: {
        uri: string,
        id: string,
        title: string,
        titleTrue: string,
        titleFalse: string,
        units: string,
        decimals: number
    },
    color: string
}

export interface IZoneManager {
    getZones(): Promise<StringHashMap<IZone>>;

    on(s: "zone.create" | "zone.update" | "zone.delete", cb: EventHandler<IZone>);
    destroy();
}

export interface IDeviceManager {
    getDevices(): Promise<StringHashMap<IDevice>>;

    getDevice(opts: {id: string}): Promise<IDevice>;

    setCapabilityValue(options: {
        deviceId: string,
        capabilityId: string,
        value: any,
        opts?: {},
        transactionId?: string
    }): Promise<any>;

    getCapability(options: {
        uri: string,
        id: string
    }): Promise<ICapability>;

    on(s: "device.create" | "device.update" | "device.delete", cb: EventHandler<IDevice>);
    on(s: "capability.create" | "capability.update" | "capability.delete", cb: EventHandler<ICapability>);

    destroy();
}

export interface IHomeyAPI {
    zones: IZoneManager;
    devices: IDeviceManager;
}
