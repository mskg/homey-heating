import { sortBy } from "lodash";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IHeatingDevice, IHeatingPlan, IHeatingZone, IScheduleInformation, NormalOperationMode, OperationMode } from "../../app/model";
import { deviceAPI } from "./devices";
import { modeAPI, planAPI } from "./heating";
import { settingsAPI, SettingsHashMap } from "./settings";
import { zoneAPI } from "./zones";

/***
 * Call the apiMethod asynchronously.
 *
 * If the method fails, throw the exception inside set SetStateAction of the hook.
 * This allows to catch the error "in the ErrorBoundary."
 */
async function tryApiMethod<T>(apiMethod: () => Promise<T>, setStateAction: Dispatch<SetStateAction<T>>): Promise<T> {
    try {
        setStateAction(await apiMethod());
    } catch (e) {
        // required for the error to popup the hierarchy
        setStateAction ((t) => { throw e; });
    }

    // not reached
    return null;
}

export const usePlans = () => {
    const [plans, setPlans] = useState<IHeatingPlan[]>([]);

    const loadPlans = async () => {
        await tryApiMethod(async () => sortBy(await planAPI.fetchPlans(), (p) => p.name), setPlans);
    };

    useEffect(() => {
        loadPlans();
    }, []);

    return { plans, loadPlans };
};

export const useDevices = () => {
    const [devices, setDevices] = useState<ArrayLike<IHeatingDevice>>([]);

    const loadDevices = async () => {
        await tryApiMethod(deviceAPI.fetchHeatingDevices, setDevices);
    };

    useEffect(() => {
        loadDevices();
    }, []);

    return { devices, loadDevices };
};

export const useZones = () => {
    const [zones, setZones] = useState<ArrayLike<IHeatingZone>>([]);

    const loadZones = async () => {
        await tryApiMethod(zoneAPI.fetchHeatingZones, setZones);
    };

    useEffect(() => {
        loadZones();
    }, []);

    return { zones, loadZones };
};

export const useScheduleInformation = () => {
    const [scheduleInformation, setSchedules] = useState<IScheduleInformation>({
        mode: NormalOperationMode.Automatic,
        temperatures: [],
    });

    const loadScheduleInformation = async () => {
        await tryApiMethod(planAPI.fetchSchedule, setSchedules);
    };

    useEffect(() => {
        loadScheduleInformation();
    }, []);

    return { scheduleInformation, loadScheduleInformation };
};

export const useSettings =  () => {
    const [settings, setSettings] = useState<SettingsHashMap>({});

    const loadSettings = async () => {
        await tryApiMethod(settingsAPI.fetchSettings, setSettings);
    };

    useEffect(() => {
        loadSettings();
    }, []);

    return { settings, setSettings, loadSettings };
};

export const useMode = () => {
    const [mode, setMode] = useState<OperationMode>(NormalOperationMode.Automatic);

    const loadMode = async () => {
        await tryApiMethod(modeAPI.fetchMode, setMode);
    };

    useEffect(() => {
        loadMode();
    }, []);

    return { mode, loadMode };
};
