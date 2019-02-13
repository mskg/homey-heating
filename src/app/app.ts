// must not be removed
import "reflect-metadata";
// position must not be changed

import { Actions } from "@app/flows";
import { asynctrycatchlog, DeviceManagerService, HeatingManagerService, HeatingPlanRepositoryService,
    HeatingSchedulerService, ILogger, LoggerFactory, LogService, SettingsManagerService } from "@app/services";
import { App as HomeyApp } from "homey";
import { container, injectable } from "tsyringe";

@injectable()
export class HeatingSchedulerApp {
    private logger: ILogger;

    constructor(
        private loggerFactory: LoggerFactory,
        private settingsManager: SettingsManagerService,
        private repositoryService: HeatingPlanRepositoryService,
        private heatingScheduler: HeatingSchedulerService,
        private deviceManager: DeviceManagerService,
        private heatingManager: HeatingManagerService) {

        this.logger = this.loggerFactory.createLogger("App");
    }

    // whatever goes wrong - we log, hide and dump it
    @asynctrycatchlog(true)
    public async run() {
        this.logger.information("Bootstrapping");

        process.on("uncaughtException", (err) => {
            this.logger.error(err);
        });

        process.on("unhandledRejection", (reason, p) => {
            this.logger.error("Unhandled Rejection at:", p, "reason:", reason);
        });

        // prepare device caches
        await this.deviceManager.init();

        // load plans
        this.repositoryService.load();

        // apply what we have
        await this.heatingManager.applyPlans();

        // startup scheduler
        await this.heatingScheduler.start();

        // Flow hooks
        this.runFlowHooks();
    }

    private runFlowHooks() {
        const ctx = {
            logger: this.loggerFactory.createLogger("Flow"),
            manager: this.heatingManager,
            repository: this.repositoryService,
            scheduler: this.heatingScheduler,
            settings: this.settingsManager,
        };

        Actions.forEach((action) => action(ctx));
    }
}

/***
 * Bootstrapper for the dependency container
 */
export default class App extends HomeyApp {
    public async onInit() {
        // tslint:disable-next-line: no-console
        console.log("Bootstrapping App");
        LogService.init(this);

        // we let the container do our stuff
        const app = container.resolve(HeatingSchedulerApp);
        await app.run();
    }
}

// // we are a script, but the startup class is still bound to the export
declare var module;
module.exports = App;
