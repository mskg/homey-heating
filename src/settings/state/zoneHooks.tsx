import { useEffect } from "react";
import { zoneAPI } from "../api/zones";
import { usePlanDispatch, usePlanGlobalState } from "./PlanProvider";

let loadingZones = false;
export const useZones = (keep?: boolean) => {
    const dispatch = usePlanDispatch();
    const zones = usePlanGlobalState("zones");

    if (!keep && !loadingZones) {
        loadingZones = true;
        throw zoneAPI.fetchHeatingZones().then((z) => {
            dispatch({ type: "loadZones", zones: z });
        });
    }

    useEffect(() => {
        return () => {
            loadingZones = false;
        };
    }, [keep]);

    return zones;
};
