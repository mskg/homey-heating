// tslint:disable: no-console

import { Mutex } from "@app/helper";
import { App as HomeyApp } from "homey";
import { container } from "tsyringe";
import { DeviceManagerService } from "../services/device-manager";
import { HeatingPlanRepositoryService } from "./heating-plan-repository";

const mutex: Mutex = new Mutex();
let ran: boolean = false;

export async function BootStrapper(app: HomeyApp, silent = false) {
    const unlock = await mutex.lock();
    {
        if (ran) {
            unlock();
            return;
        }

        if (!silent) { console.info(`********* APPLICATION STARTUP v${__VERSION} (${__BUILD}) *********`); }
        const deviceManager = container.resolve(DeviceManagerService);
        const repositoryService = container.resolve(HeatingPlanRepositoryService);

        // prepare device caches
        await deviceManager.init(app);

        // load data
        repositoryService.load();

        ran = true;
    }
    unlock();
}
