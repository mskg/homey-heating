import { useEffect } from "react";
import { deviceAPI } from "../api/devices";
import { usePlanDispatch, usePlanGlobalState } from "./PlanProvider";

let loadingDevices = false;
export const useDevices = (keep?: boolean) => {
    const dispatch = usePlanDispatch();
    const devices = usePlanGlobalState("devices");

    if (!keep && !loadingDevices) {
        loadingDevices = true;
        throw deviceAPI.fetchHeatingDevices().then((d) => {
            dispatch({ type: "loadDevices", devices: d });
        });
    }

    useEffect(() => {
        return () => {
            loadingDevices = false;
        };
    }, [keep]);

    return devices;
};
