export interface IZone {
    id: string;
    name: string;
    // order: number;
    // parent?: string;
    icon: string;
}

export interface ICapabilityInstance<T> {
    readonly lastChanged: Date;
    readonly capability: ICapability;
    readonly value: T;
    readonly id: string;
    readonly getable: boolean;
    readonly setable: boolean;
    readonly values: string[];
    readonly type: string;
    readonly min: number;
    readonly max: number;
    readonly decimals: number;
    readonly step: number;
    readonly title: string;
    readonly units: string;
    readonly desc: Date;

    setValue(val: T): Promise<void>;
    destroy(): void;
}

type EventHandler<T> = (param: T) => void;

// interface IEventHandler<E, T> {
//     on(s: E, cb: EventHandler<T>);
// }

export interface ICapability {
    id: string;
    uri: string;
    title: string;
    desc: string;
    type: "boolean" | "number" | "string" | "enum";
    getable: boolean;
    setable: boolean;
    chartType: "line" | "area" | "stepLine" | "column" | "spline" | "splineArea" | "scatter";
    decimals: number;
    min: number;
    max: number;
    step: number;
    units: string;

    value: any;
    values: [{
        id: string,
        title: string,
    }];

    on(s: "$update", cb: EventHandler<ICapability>): void;
    on(s: "$delete", cb: EventHandler<void>): void;
}

export type StringHashMap<T> = {
    [id: string]: T;
}; /*& ArrayLike<T>*/

export interface IDevice {
    id: string;
    name: string;
    driverUri: string;
    driverId: string;
    zone: string;
    icon: string;

    settings?: {[key: string]: string|boolean|number};
    // true if settings exist
    settingObj: boolean;

    class: string;
    virtualClass: string;

    ui: {
        quickAction?: string,
        components: [{
            id: string,
            capabilities: string[],
        }],
    };

    ready: boolean;
    available: boolean;
    unavailableMessage: string;
    iconObj?: {
        id: string;
        url: string;
    };

    setting: {};
    capabilities: string[];
    capabilitiesObj: {
        [key: string]: ICapability,
    };
    capabilitiesOptions: any;

    repair: boolean;
    unpair: boolean;
    images: [
        {
            type: string,
            id: string,
            imageObj: any,
        }
    ];
    insights: {
        uri: string,
        id: string,
        title: string,
        titleTrue: string,
        titleFalse: string,
        units: string,
        decimals: number,
    };
    color: string;

    makeCapabilityInstance<T>(id: string, callback?: EventHandler<IDevice>): Promise<ICapabilityInstance<T>>;
}

export interface IZoneManager {
    getZones(): Promise<StringHashMap<IZone>>;

    on(s: "zone.create" | "zone.update" | "zone.delete", cb: EventHandler<IZone>): void;
    destroy(): void;
}

export interface IDeviceManager {
    getDevices(): Promise<StringHashMap<IDevice>>;

    getDevice(opts: {id: string}): Promise<IDevice>;

    setCapabilityValue(options: {
        deviceId: string,
        capabilityId: string,
        value: any,
        opts?: {},
        transactionId?: string,
    }): Promise<any>;

    getCapability(options: {
        uri: string,
        id: string,
    }): Promise<ICapability>;

    on(s: "device.create" | "device.update" | "device.delete", cb: EventHandler<IDevice>): void;
    on(s: "capability.create" | "capability.update" | "capability.delete", cb: EventHandler<ICapability>): void;

    destroy(): void;
}

export interface HomeyAPI {
    zones: IZoneManager;
    devices: IDeviceManager;
}

export module HomeyAPI {
    export function forCurrentHomey(): HomeyAPI;
}
