import { IHeatingDevice, IHeatingPlan, IHeatingZone, IScheduleInformation, OperationMode } from "../../app/model";
import { deviceAPI } from "./devices";
import { modeAPI, planAPI } from "./heating";
import { settingsAPI, SettingsHashMap } from "./settings";
import { HookReturnType, HookSetType, useSuspendableState } from "./suspendableState";
import { zoneAPI } from "./zones";

type PlansType = {
    plans: IHeatingPlan[],
    setPlans: HookSetType<IHeatingPlan[]>,
    loadPlans(force?: boolean): HookReturnType,
};

type DevicesType = {
    devices: IHeatingDevice[],
    setDevices: HookSetType<IHeatingDevice[]>,
    loadDevices: HookReturnType,
};

type ZonesType = {
    zones: IHeatingZone[],
    setZones: HookSetType<IHeatingZone[]>,
    loadZones: HookReturnType,
};

type ScheduleInformationType = {
    scheduleInformation: IScheduleInformation,
    setScheduleInformation: HookSetType<IScheduleInformation>,
    loadScheduleInformation: HookReturnType,
};

type SettingsType = {
    settings: SettingsHashMap,
    setSettings: HookSetType<SettingsHashMap>,
    loadSettings: HookReturnType,
};

type ModeType = {
    mode: OperationMode,
    setMode: HookSetType<OperationMode>,
    loadMode: HookReturnType,
};

export const usePlans = useSuspendableState<PlansType>("plans", planAPI.fetchPlans);
export const useDevices = useSuspendableState<DevicesType>("devices", deviceAPI.fetchHeatingDevices);
export const useZones = useSuspendableState<ZonesType>("zones", zoneAPI.fetchHeatingZones);
export const useScheduleInformation = useSuspendableState<ScheduleInformationType>("scheduleInformation", planAPI.fetchSchedule);
export const useSettings = useSuspendableState<SettingsType>("settings", settingsAPI.fetchSettings);
export const useMode = useSuspendableState<ModeType>("mode", modeAPI.fetchMode);
