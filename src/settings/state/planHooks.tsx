import { useCallback, useEffect, useState } from "react";
import * as uuidv1 from "uuid/v1";
import { OverrideMode } from "../../app/model";
import { planAPI } from "../api/heating";
import { usePlanDispatch, usePlanGlobalState } from "./PlanProvider";

export const useHistory = () => {
    const dispatch = usePlanDispatch();
    const loaded = usePlanGlobalState("loaded");

    const savePoint = useCallback(() => dispatch({ type: "savePoint" }), [dispatch]);
    const undo = useCallback(() => dispatch({ type: "undo" }), [dispatch]);
    const commit = useCallback(() => dispatch({ type: "commit" }), [dispatch]);

    useEffect(() => {
        savePoint();
    }, [loaded]);

    return {
        savePoint, undo, commit,
    };
};

export const useModifyPlan = () => {
    const dispatch = usePlanDispatch();

    const setName = useCallback((evt) => dispatch({ type: "setName", name: evt.target.value }), [dispatch]);
    const toggleState = useCallback(() => dispatch({ type: "toggleEnabled" }), [dispatch]);
    const toggleZone = useCallback((id) => dispatch({ type: "toggleZone", zone: id }), [dispatch]);
    const toggleDevice = useCallback((id) => dispatch({ type: "toggleDevice", device: id }), [dispatch]);

    return { setName, toggleState, toggleZone, toggleDevice };
};

export const useModifyExceptions = () => {
    const dispatch = usePlanDispatch();
    const [isDirty, setDirty] = useState<boolean>(false);

    const setOverride = useCallback((mode, temp) => {
        dispatch({ type: "setOverride", mode, temperature: temp });
        setDirty(true);
    }, [dispatch]);

    const clearOverride = useCallback((mode) => {
        dispatch({ type: "clearOverride", mode });
        setDirty(true);
    }, [dispatch]);

    const updateOverride = useCallback((mode: OverrideMode, target: number) => {
        if (target === 0) { clearOverride(mode); } else { setOverride(mode, target); }
    }, [dispatch]);

    useEffect(() => {
        setDirty(false);
    }, []);

    return { isDirty, setOverride, clearOverride, updateOverride };
};

export const useModifySetPoints = () => {
    const [isDirty, setDirty] = useState<boolean>(false);

    const dispatch = usePlanDispatch();

    const selectDay = useCallback((day) => { dispatch({ type: "selectDay", day }); }, [dispatch]);
    const selectedDay = usePlanGlobalState("selectedDay");
    const setPoint = usePlanGlobalState("setPoint");

    const copyDays = useCallback((source, days) => {
        if (days != null && days.length > 0) {
            setDirty(true);
            dispatch({ type: "copyDays", source, targets: days });
        }
    }, [dispatch]);

    const removeSetPoint = useCallback((idx) => { setDirty(true);  dispatch({ type: "removeSetPoint", index: idx }); }, [dispatch]);

    const loadSetPoint = useCallback((point) => { dispatch({ type: "loadSetPoint", setPoint: point }); }, [dispatch]);
    const newSetPoint = useCallback((day) => { dispatch({ type: "newSetPoint", day }); }, [dispatch]);

    const saveSetPoint = useCallback((s) => {
        if (s.index === -1) {
            dispatch({type: "addSetPoint", setPoint: s});
        } else {
            dispatch({type: "updateSetPoint", setPoint: s});
        }
    }, [dispatch]);

    const setStart = useCallback((date: Date | string) => dispatch({type: "setStart", start: date}), [dispatch]);
    const setTargetTemperature = useCallback((evt) => dispatch({type: "setTargetTemperature", temperature: parseFloat(evt.target.value)}), [dispatch]);

    useEffect(() => {
        setDirty(false);
    }, []);

    return { setDirty, isDirty, selectedDay, setPoint, copyDays, removeSetPoint, loadSetPoint, newSetPoint, selectDay, saveSetPoint, setStart, setTargetTemperature };
};

export const usePlan = (id: string, keep: boolean = true) => {
    const dispatch = usePlanDispatch();

    const plan = usePlanGlobalState("plan");
    const loaded = usePlanGlobalState("loaded");
    const isDirty = usePlanGlobalState("dirty");

    useEffect(() => {
        if (!keep || !loaded) {
            if (id == null || id === "new") {
                dispatch({ type: "loadPlan", plan: {
                    id: uuidv1(),
                    enabled: false,
                    name: "",
                    zones: [],
                    devices: [],
                    schedule: [],
                    overrides: null,
                }});
            } else {
                (async () => {
                    const result = await Promise.all([
                        await planAPI.fetchPlanById(id),
                    ]);

                    dispatch({ type: "loadPlan", plan: result[0] });
                })();
            }
        }
    }, [id, keep]);

    return { plan, isDirty, loaded };
};
