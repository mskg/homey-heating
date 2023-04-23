// must not be removed
import "reflect-metadata";
// position must not be changed

import {
    BootStrapper, FlowService, HeatingManagerService, HeatingSchedulerService,
    ILogger,
    LoggerFactory,
    NotificationService,
    TranslationService, trycatchlog,
} from "@app/services";
import { App as HomeyApp } from "homey";
import { container, inject, injectable } from "tsyringe";

@injectable()
export class HeatingSchedulerApp {
    private logger: ILogger;

    constructor(
        private loggerFactory: LoggerFactory,
        private heatingScheduler: HeatingSchedulerService,
        private heatingManager: HeatingManagerService,
        private translation: TranslationService,
        private notification: NotificationService,

        // @ts-ignore
        @inject("FlowService") private flowService: FlowService) {
        this.logger = this.loggerFactory.createLogger("App");
    }

    // whatever goes wrong - we log, hide and dump it
    @trycatchlog(true)
    public async run(app: HomeyApp) {
        this.logger.information(`Bootstrapping HeatingScheduler`);

        process.on("uncaughtException", (err) => {
            this.logger.error(err, "uncought Exception");
        });

        process.on("unhandledRejection", (reason, p) => {
            this.logger.error(reason, "Unhandled Rejection at:", p, "reason:", reason);
        });

        await this.translation.init(app.homey.__);
        await this.notification.init(app.homey);

        // Flow hooks
        await this.flowService.init(app);

        // apply what we have
        await this.heatingManager.init();

        // startup scheduler
        await this.heatingScheduler.start();
    }
}

/***
 * Bootstrapper for the dependency container
 */
export default class App extends HomeyApp {
    public async onInit() {
        // we don't let homey wait for the init cycle to finish
        (async () => {
            await BootStrapper(this);

            // we let the container do our stuff
            const app = container.resolve(HeatingSchedulerApp);
            await app.run(this);
        })();
    }
}

// // we are a script, but the startup class is still bound to the export
declare var module: NodeModule;
module.exports = App;
