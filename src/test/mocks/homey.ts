import * as mock from "mock-require";
import { mockEventHandler } from "./mockEventHandler";
import { DEFAULT_HEATING_PLAN } from "@app/helper";
import { flatten, keyBy } from "lodash";

class App {
    public log = (...args: string[]) => {
        console.log(args);
    }

    homey = {
        ManagerSettings: {
            get: () => {
                return null;
            },

            set: () => { },
        }
    }
}

var allZones: string[] = [];
const allDevices: string[] = ["Device A", "Device B", "Device C"];

class HomeyAPIApp {
    devices = {
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
    }

    zones = {
        // @ts-ignore
        ...mockEventHandler(),
        // @ts-ignore
        getZones: () => keyBy(allZones.map((d) => ({
            id: d,
            name: d,
        })), (d) => d.id),
    }
}

// tslint:disable: no-empty
// tslint:disable: no-console
mock("homey", {
    App
});


mock("homey-api", {
    HomeyAPIApp,
});

mock("homey-api", {
    HomeyAPIApp,
});

// @ts-ignore
allZones = flatten(DEFAULT_HEATING_PLAN.map((p) => p.zones));
