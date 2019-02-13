import { filter, forEach, isEmpty, map, remove, sortBy } from "lodash";
import { Day, IHeatingPlan, ISetPoint, OverrideMode, Overrides } from "../../app/model";
import { HashType as DeviceHashType } from "../api/devices";
import { HashType as ZoneHashType } from "../api/zones";

export type IndexedSetPoint = {
    index: number,
} & ISetPoint;

const defaultSetpoint: IndexedSetPoint = {
    index: -1,
    day: 0,
    hour: 0,
    minute: 0,
    targetTemperature: 0
};

export const initialState = {
    loaded: false,

    dirty: false,
    savePoint: null,

    setPoint: {
        ...defaultSetpoint,
    },

    zones: {} as ZoneHashType,
    devices: {} as DeviceHashType,

    plan: {
        id: '',
        enabled: false,
        name: '',
        zones: [] as string[],
        devices: [] as string[],
        schedule: [] as IndexedSetPoint[],
        overrides: null as Overrides
    },

    selectedDay: {
        last: null as IndexedSetPoint,
        schedules: [] as IndexedSetPoint[]
    },
};

export type State = typeof initialState;

export type Action =
    // plan
    | { type: 'loadZones', zones: ZoneHashType }
    | { type: 'loadDevices', devices: DeviceHashType }

    // plan
    | { type: 'loadPlan', plan: IHeatingPlan }
    | { type: 'setName', name: string }
    | { type: 'toggleDevice', device: string }
    | { type: 'toggleZone', zone: string }
    | { type: 'toggleEnabled' }

    // save state in history allows dialogs
    | { type: 'savePoint' }
    | { type: 'commit' }
    | { type: 'undo' }

    // overrides
    | { type: 'clearOverride', mode: OverrideMode }
    | { type: 'setOverride', temperature: number, mode: OverrideMode }

    // schedule dialog
    | { type: 'copyDays', source: Day, targets: Day[] }
    | { type: 'addSetPoint', setPoint: ISetPoint }
    | { type: 'selectDay', day: Day }

    // setpoint
    | { type: 'loadSetPoint', setPoint: IndexedSetPoint }
    | { type: 'setStart', start: string | Date }
    | { type: 'setTargetTemperature', temperature: number }

    | { type: 'updateSetPoint', setPoint: IndexedSetPoint }
    | { type: 'removeSetPoint', index: number }
    | { type: 'newSetPoint', day: Day }
;

const sortList = (newList) => sortBy(newList, [(d: IndexedSetPoint) => (d.day == 0 ? 7 : d.day), "hour", "minute"])
    .map<IndexedSetPoint>((sp, i) => { return { ...sp, index: i }; }) as IndexedSetPoint[];

const reducerImplementation = (state: State, action: Action) => {
    switch (action.type) {
         /** 
         * Load devices
         */
        case 'loadDevices': {
            return {
                ...state,
                devices: action.devices
            }
        };

         /** 
         * Load zones
         */
        case 'loadZones': {
            return {
                ...state,
                zones: action.zones
            }
        };

        /** 
         * Save the current state
         */
        case 'savePoint': {
            return {                
                ...state,
                // latest wins
                savePoint: JSON.stringify({...state, history: null})
            }
        };

        /**
         * Restore from last known state
         */
        case 'undo': {
            if (state.savePoint == null) { return state; }
            return JSON.parse(state.savePoint);
        };

        /**
         * Throw away savepoint
         */
        case 'commit': {
            return {
                ...state,
                savePoint: null,
            }
        };

        /**
         * Set override for given mode
         */
        case 'setOverride': {
            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    overrides: {
                        ...state.plan.overrides,
                        [OverrideMode[action.mode]]: {
                            targetTemperature: action.temperature,
                        }
                    }
                }
            }
        };

        /**
         * Clear override for given mode
         */
        case 'clearOverride': {
            const overrides = state.plan.overrides || {};
            delete overrides[action.mode];
            delete overrides[OverrideMode[action.mode]];

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    overrides: overrides,
                }
            }
        };


        /**
         * Set current setPoint state
         */
        case 'loadSetPoint': {
            return {
                ...state,
                setPoint: action.setPoint,
            }
        };

        /**
         * Set start of current setPoint
         */
        case 'setStart': {
            let date = null; 
            if (typeof action.start === "string") {
                date = new Date('1970-01-01T'+action.start+"Z");
            } else {
                date = action.start;
            }

            return {
                ...state,
                setPoint: {
                    ...state.setPoint,
                    hour: date.getUTCHours(),
                    minute: date.getUTCMinutes(),
                }
            }
        };

        /**
         * Set target temperature of current setpoint
         */
        case 'setTargetTemperature': {
            return {
                ...state,
                setPoint: {
                    ...state.setPoint,
                    targetTemperature: action.temperature
                }
            }
        };

        /**
         * Initialize a new setpoint for the given day
         */
        case 'newSetPoint': {
            return {
                ...state,
                setPoint: {...defaultSetpoint, day: action.day},
            }
        };

        /**
         * Toogle plan enabled
         */
        case 'toggleEnabled': return {
            ...state,
            dirty: true,
            plan: {
                ...state.plan,
                enabled: !state.plan.enabled
            }
        };

        /**
         * Set name of plan
         */
        case 'setName': return {
            ...state,
            dirty: true,
            plan: {
                ...state.plan,
                name: action.name,
            }
        };

        /**
         * Toggle device membership in plan
         */
        case 'toggleDevice': {
            const devices = state.plan.devices || [];

            if (isEmpty(remove<string>(devices, d => d === action.device))) {
                devices.push(action.device);
            }

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    devices: devices,
                },
            }
        };

        /**
         * Toggle zone membership in plan
         */
        case 'toggleZone': {
            const zones = state.plan.zones || [];

            if (isEmpty(remove<string>(zones, z => z === action.zone))) {
                zones.push(action.zone);
            }

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    zones: zones,
                },
            }
        };

        /**
         * Copy day to other days
         */
        case 'copyDays': {
            var templateDay = filter(state.plan.schedule, s => s.day == action.source);
            var newSchedule = map(state.plan.schedule, s => ({ ...s }));

            forEach(action.targets, (target: Day) => {
                // remove all
                remove(newSchedule, old => old.day == target);

                // new from template
                forEach(templateDay, s => { newSchedule.push({ ...s, day: target }) });
            });

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    schedule: sortList(newSchedule),
                },
            };
        };

        /**
         * Add given setpoint to plan
         */
        case 'addSetPoint': {
            const newList = [...state.plan.schedule];
            newList.push({ ...action.setPoint, index: -1 });

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    schedule: sortList(newList),
                }
            }
        };

        /**
         * Update given setpoint in plan
         */
        case 'updateSetPoint': {
            const newList = [...state.plan.schedule];
            newList[action.setPoint.index] = action.setPoint;

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    schedule: sortList(newList),
                },
            }
        };

        /** 
         * Remove setpoint
         */
        case 'removeSetPoint': {
            const newList = [...state.plan.schedule];
            newList.splice(action.index, 1);

            return {
                ...state,
                dirty: true,
                plan: {
                    ...state.plan,
                    schedule: sortList(newList),
                },
            }
        };

        /**
         * Select day from plan
         */
        case 'selectDay': {
            // filtered and sorted based on day
            const newSchedules = state.plan.schedule.filter(sp => sp.day == action.day);

            // previous is last
            const lastSchedule = (() => {
                // no elements
                if (state.plan.schedule.length == 0) { return null; }

                // first element is first element
                if (newSchedules.length != 0 && newSchedules[0].index == 0) {
                    if (state.plan.schedule[state.plan.schedule.length - 1].day !== newSchedules[0].day) {
                        return state.plan.schedule[state.plan.schedule.length - 1];
                    }

                    return null;
                }

                if (newSchedules.length == 0) {
                    let nd = action.day - 1;
                    if (nd < 0) nd = 6;

                    // we search from right to left
                    while (nd >= 0) {
                        let last = state.plan.schedule.filter(sp => sp.day == action.day);
                        if (last.length > 0) {
                            // already sorted
                            return last[last.length - 1];
                        }

                        nd -= 1;
                    }

                    // cannot happen
                    return null;
                }

                // highest from last schedule
                return state.plan.schedule[newSchedules[0].index - 1];
            })();

            return {
                ...state,
                selectedDay: {
                    last: lastSchedule,
                    schedules: newSchedules
                }
            }
        };

        /**
         * Load plan and set default values
         */
        case 'loadPlan': {            
            return {
                // we definitly want an unrelated copy of the loaded structure
                ...JSON.parse(JSON.stringify(state)),
                loaded: true,
                dirty: false,
                plan: {
                    ...action.plan,
                    // needs default values
                    name: action.plan.name || '',
                    zones: action.plan.zones || [],
                    devices: action.plan.devices || [],
                    overrides: action.plan.overrides || {},
                    schedule: sortList([...action.plan.schedule]),
                }
            };
        }

        default: return state;
    }
};

const loggingReducer = (state: State, action: Action) => {
    let newState;
    try {
        newState = reducerImplementation(state, action);
        return newState;
    }
    finally {
        console.log(action.type, newState,
        {
            action: action, 
            state: state, 
        });
    }
};

declare var PRODUCTION: boolean;
export const reducer = PRODUCTION
    ? reducerImplementation
    : loggingReducer;
