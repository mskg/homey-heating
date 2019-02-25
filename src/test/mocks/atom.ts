import { flatten, keyBy } from "lodash";
import * as mock from "mock-require";
import { mockEventHandler } from "./mockEventHandler";

let allZones: string[] = [];
const allDevices: string[] = ["Device A", "Device B", "Device C"];

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
                    capabilities: ["target_temperature", "measure_temperature"],
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

import { DEFAULT_HEATING_PLAN } from "@app/helper";

// @ts-ignore
allZones = flatten(DEFAULT_HEATING_PLAN.map((p) => p.zones));
// allDevices  = flatten(DEFAULT_HEATING_PLAN.map((p) => p.devices));
