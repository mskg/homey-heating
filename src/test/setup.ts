import { flatten, keyBy } from "lodash";
import "mocha";
import * as mock from "mock-require";
import "reflect-metadata";

(global as any).__PRODUCTION__ = false;
// @ts-ignore
const mockEventHandler = (args) => ({
    _args: args,
    _evt: {},

    date: args && args[0],
    handBack: args && args[1],
    // @ts-ignore
    callEventHandler(evt) { return this._evt[evt](this.handBack); },
    // @ts-ignore
    on(evt, func) { this._evt[evt] = func; },
    // @ts-ignore
    once(evt, func) { this._evt[evt] = func; },
});

// @ts-ignore
let allZones = [];
let allDevices = ["Device A", "Device B", "Device C"]

mock("athom-api", {
    HomeyAPI: {
        forCurrentHomey: () => ({
            devices: {
                // @ts-ignore
                ...mockEventHandler(),
                getDevices: () => keyBy(allDevices.map((d) => ({
                    driverUri: "fake",
                    id: d,
                    name: d,
                    capabilities: [CapabilityType.TargetTemperature, CapabilityType.MeasureTemperature],
                    // @ts-ignore
                    zone: allZones[0],
                })), (d) => d.id),
            },

            zones: {
                // @ts-ignore
                ...mockEventHandler(),
                // @ts-ignore
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
        // @ts-ignore
        registerTask(name, ...args) {
            // @ts-ignore
            this._tasks[name] = mockEventHandler(args);
            // @ts-ignore
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
// @ts-ignore
allZones = flatten(DEFAULT_HEATING_PLAN.map((p) => p.zones));
// allDevices  = flatten(DEFAULT_HEATING_PLAN.map((p) => p.devices));
