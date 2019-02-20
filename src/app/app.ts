// must not be removed
import "reflect-metadata";
// position must not be changed

import {
    asynctrycatchlog, BootStrapper, FlowService, HeatingManagerService,
    HeatingSchedulerService, ILogger, LoggerFactory, LogService,
} from "@app/services";
import { App as HomeyApp } from "homey";
import { container, injectable } from "tsyringe";

@injectable()
export class HeatingSchedulerApp {
    private logger: ILogger;

    constructor(
        private loggerFactory: LoggerFactory,
        private heatingScheduler: HeatingSchedulerService,
        private heatingManager: HeatingManagerService,
        private flowService: FlowService) {

        this.logger = this.loggerFactory.createLogger("App");
    }

    // whatever goes wrong - we log, hide and dump it
    @asynctrycatchlog(true)
    public async run() {
        this.logger.information(`Bootstrapping App v${__VERSION} (${__BUILD})`);

        process.on("uncaughtException", (err) => {
            this.logger.error(err, "uncought Exception");
        });

        process.on("unhandledRejection", (reason, p) => {
            this.logger.error(reason, "Unhandled Rejection at:", p, "reason:", reason);
        });

        // Flow hooks
        await this.flowService.init();

        // apply what we have
        await this.heatingManager.applyPlans();

        // startup scheduler
        await this.heatingScheduler.start();
    }
}

/***
 * Bootstrapper for the dependency container
 */
export default class App extends HomeyApp {
    public async onInit() {
        // tslint:disable-next-line: no-console
        console.info(`Bootstrapping App v${__VERSION} (${__BUILD})`);
        LogService.init(this);

        await BootStrapper();

        // we let the container do our stuff
        const app = container.resolve(HeatingSchedulerApp);
        await app.run();
    }
}

// // we are a script, but the startup class is still bound to the export
declare var module;
module.exports = App;
