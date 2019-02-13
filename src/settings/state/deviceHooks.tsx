import { useEffect } from "react";
import { deviceAPI } from "../api/devices";
import { usePlanDispatch, usePlanGlobalState } from "./PlanProvider";

export const useDevices = (keep?: boolean) => {
    const dispatch = usePlanDispatch();
    const devices = usePlanGlobalState("devices");
    const loaded = usePlanGlobalState("loaded");

    useEffect(() => {
        if (!keep || loaded) {
            (async () => {
                const result = await Promise.all([
                    await deviceAPI.fetchHeatingDevices(),
                ]);

                dispatch({ type: "loadDevices", devices: result[0] });
            })();
        }
    }, [keep, loaded && (devices == null || devices.length === 0)]);

    return devices;
};
