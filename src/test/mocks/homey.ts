import * as mock from "mock-require";
import { mockTask } from "./mockTask";

// tslint:disable: no-empty
// tslint:disable: no-console
mock("homey", {
    ManagerSettings: {
        get: () => {
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
            this._tasks[name] = mockTask(...args);
            // @ts-ignore
            return Promise.resolve(this._tasks[name]);
        },
    },
});