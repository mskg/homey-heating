// must not be removed
import "reflect-metadata";
// position must not be changed
import { container } from "tsyringe";
import { CompatibilityWrapper } from "./compat";
import { DebuggerOff as DebuggerOffClass, DebuggerOn as DebuggerOnClass } from "./debugger";
import { GetMode as GetModeClass, PutMode as PutModeClass } from "./mode";
import {
    DeletePlan as DeletePlanClass,
    GetPlan as GetPlanClass,
    GetPlans as GetPlansClass,
    GetResetPlans as GetResetPlansClass,
    PutPlan as PutPlanClass,
} from "./plans";
import { GetSchedule as GetScheduleClass } from "./schedule";
import { GetSettings as GetSettingsClass, PutSettings as PutSettingsClass } from "./settings";
import { GetDevices as GetDevicesClass, GetZones as GetZonesClass } from "./utility";

// tslint:disable-next-line: no-console
console.info(`Bootstrapping API v${__VERSION} (${__BUILD})`);

export const DebuggerOn = CompatibilityWrapper(container.resolve(DebuggerOnClass));
export const DebuggerOff = CompatibilityWrapper(container.resolve(DebuggerOffClass));

export const GetSettings = CompatibilityWrapper(container.resolve(GetSettingsClass));
export const PutSettings = CompatibilityWrapper(container.resolve(PutSettingsClass));

export const GetMode = CompatibilityWrapper(container.resolve(GetModeClass));
export const PutMode = CompatibilityWrapper(container.resolve(PutModeClass));

export const DeletePlan = CompatibilityWrapper(container.resolve(DeletePlanClass));
export const GetPlan = CompatibilityWrapper(container.resolve(GetPlanClass));
export const PutPlan = CompatibilityWrapper(container.resolve(PutPlanClass));
export const GetPlans = CompatibilityWrapper(container.resolve(GetPlansClass));
export const GetResetPlans = CompatibilityWrapper(container.resolve(GetResetPlansClass));

export const GetDevices = CompatibilityWrapper(container.resolve(GetDevicesClass));
export const GetZones = CompatibilityWrapper(container.resolve(GetZonesClass));

export const GetSchedule = CompatibilityWrapper(container.resolve(GetScheduleClass));
