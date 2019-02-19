import { flatten, keyBy } from "lodash";
import "mocha";
import * as mock from "mock-require";
import "reflect-metadata";

(global as any).__PRODUCTION__ = false;

const mockEventHandler = (args?) => ({
    _args: args,
    _evt: {},

    date: args && args[0],
    handBack: args && args[1],

    callEventHandler(evt) { return this._evt[evt](this.handBack); },

    on(evt, func) { this._evt[evt] = func; },
    once(evt, func) { this._evt[evt] = func; },
});

let allZones = [];
let allDevices = ["Device A", "Device B", "Device C"]

mock("athom-api", {
    HomeyAPI: {
        forCurrentHomey: () => ({
            devices: {
                ...mockEventHandler(),
                getDevices: () => keyBy(allDevices.map((d) => ({
                    driverUri: "fake",
                    id: d,
                    name: d,
                    capabilities: [CapabilityType.TargetTemperature, CapabilityType.MeasureTemperature],
                    zone: allZones[0],
                })), (d) => d.id),
            },

            zones: {
                ...mockEventHandler(),
                getZones: () => keyBy(allZones.map((d) => ({
                    id: d,
                    name: d,
                })), (d) => d.id),
            },
        }),
    },
});

// tslint:disable: no-empty
// tslint:disable: no-console
mock("homey", {
    ManagerSettings: {
        get: () => {
            console.log("Called.");
            return null;
        },

        set: () => { },
    },

    ManagerCron: {
        _tasks: {},

        unregisterAllTasks() { this._tasks = {}; },
        registerTask(name, ...args) {
            this._tasks[name] = mockEventHandler(args);
            return Promise.resolve(this._tasks[name]);
        },
    },
});

// tslint:disable: no-var-requires
mock("@app/model", require("../app/model"));
mock("@app/helper", require("../app/helper"));
mock("@app/services", require("../app/services"));

import { DEFAULT_HEATING_PLAN } from "@app/helper";
import { CapabilityType } from "@app/services";
allZones = flatten(DEFAULT_HEATING_PLAN.map((p) => p.zones));
// allDevices  = flatten(DEFAULT_HEATING_PLAN.map((p) => p.devices));
