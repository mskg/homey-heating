import { NormalOperationMode, ThermostatMode } from "@app/model";
import { Device } from "homey";

export interface IVirtualThermostat extends Device {
    changeThermostatMode(mode: ThermostatMode | NormalOperationMode): Promise<void>;
}
