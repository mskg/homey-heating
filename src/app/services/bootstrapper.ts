// tslint:disable: no-console

import { Mutex } from "@app/helper";
import { App as HomeyApp } from "homey";
import process = require("process");
import { container } from "tsyringe";
import { DeviceManagerService } from "../services/device-manager";
import { HeatingPlanRepositoryService } from "./heating-plan-repository";
import { LogService } from "./log";
import { SettingsManagerService } from "./settings-manager";

const mutex: Mutex = new Mutex();
let ran: boolean = false;

export async function BootStrapper(app: HomeyApp, silent = false) {
    const unlock = await mutex.lock();
    {
        if (ran) {
            if (!silent) { console.info(`********* APPLICATION STARTUP SKIPPED *********`); }

            unlock();
            return;
        }

        try {
            // tslint:disable-next-line: no-console
            if (!silent) { console.info(`********* APPLICATION STARTUP v${__VERSION} (${__BUILD}) *********`); }

            // global hack
            process.env.TZ = app.homey.clock.getTimezone();

            // // enables some websocket debug messages
            // if (!__PRODUCTION__) {
            //     process.env.DEBUG = "*";
            // }

            // depends on logger -> settings -> ...
            const settingsManager: SettingsManagerService = container.resolve(SettingsManagerService);
            await settingsManager.init(app.homey.settings);

            // make that available
            LogService.init(app);

            const deviceManager = container.resolve(DeviceManagerService);
            const repositoryService = container.resolve(HeatingPlanRepositoryService);

            // prepare device caches
            await deviceManager.init(app);

            // load data
            repositoryService.load();

            if (!silent) { console.info(`********* APPLICATION STARTUP DONE *********`); }
            ran = true;
        } catch (e) {
            console.error("BootStrapper failed", e);
        }
    }
    unlock();
}
