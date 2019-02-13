import { useEffect } from "react";
import { zoneAPI } from "../api/zones";
import { usePlanDispatch, usePlanGlobalState } from "./PlanProvider";

export const useZones = (keep?: boolean) => {
    const dispatch = usePlanDispatch();
    const loaded = usePlanGlobalState("loaded");
    const zones = usePlanGlobalState("zones");

    useEffect(() => {
        if (!keep || loaded) {
            (async () => {
                const result = await Promise.all([
                    await zoneAPI.fetchHeatingZones(),
                ]);

                dispatch({ type: "loadZones", zones: result[0] });
            })();
        }
    }, [keep, loaded && (zones == null || zones.length === 0)]);

    return zones;
};
