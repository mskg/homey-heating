export enum CapabilityType {
    TargetTemperature = "target_temperature",
    MeasureTemperature = "measure_temperature",

    // Can not be called mode as this is a standard capability
    ThermostatOverride = "thermostat_override",
}

export const CLASS_THERMOSTAT: string = "thermostat";

// from Capability — target_temperature
export const TARGET_TEMPERATURE_MIN = 4;
export const TARGET_TEMPERATURE_MAX = 35;

export {
    IDevice, ICapability, ICapabilityInstance, IDeviceManager,
    IZone, IZoneManager, EventHandler, StringHashMap, HomeyAPI,
} from "athom-api";
