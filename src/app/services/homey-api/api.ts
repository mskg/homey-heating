
import {
    HomeyAPIV2, HomeyAPIV3,
} from "homey-api";

type EventHandler<T> = (param: T) => void;

export type StringHashMap<T> = {
    [id: string]: T;
}; /*& ArrayLike<T>*/

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

export type IDeviceManager = /* HomeyAPIV2.ManagerDevices & */ {
    getDevices(): Promise<StringHashMap<IDevice>>;
    getDevice(opts: { id: string }): Promise<IDevice>;

    on(s: "device.create" | "device.update" | "device.delete", cb: EventHandler<IDevice>): void;
    on(s: "capability.create" | "capability.update" | "capability.delete", cb: EventHandler<ICapability>): void;
    destroy(): void;

    setCapabilityValue(
        opts: {
            capabilityId: string,
            deviceId: string,
            value: string | number | boolean,
            opts?: object,
            transactionId?: string,
        },
    ): Promise<any>;
};

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

export type IZone = HomeyAPIV2.ManagerZones.Zone;
export type IZoneManager = /* HomeyAPIV2.ManagerZones & */ {
    getZones(): Promise<StringHashMap<IZone>>;

    on(s: "zone.create" | "zone.update" | "zone.delete", cb: EventHandler<IZone>): void;
    destroy(): void;
};

export type StableHomeyAPI = HomeyAPIV3 & {
    devices: IDeviceManager;
    zones: IZoneManager;
};
