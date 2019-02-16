export enum CapabilityType {
    OnOff = "onoff",
    TargetTemperature = "target_temperature",
    MeasureTemperature = "measure_temperature",
}

export const CLASS_THERMOSTAT: string = "thermostat";

// from Capability — target_temperature
export const TARGET_TEMPERATURE_MIN = 4;
export const TARGET_TEMPERATURE_MAX = 35;

export {
    IDevice, ICapability, ICapabilityInstance, IDeviceManager,
    IZone, IZoneManager, EventHandler, StringHashMap, HomeyAPI,
} from "athom-api";
