// import { ICategoryLogger, LoggerFactory } from "../log";
import { App as HomeyApp } from "homey";
import { singleton } from "tsyringe";
import { ICategoryLogger, LoggerFactory } from "../log";

type Homey_ = HomeyApp["homey"];

@singleton()
export class NotificationService {
    private logger: ICategoryLogger;
    private homey!: Homey_;

    constructor(
        // @ts-ignore
        loggerFactory: LoggerFactory,
    ) {
        this.logger = loggerFactory.createLogger("NotificationsService");
    }

    public async send(name: string, args?: {}) {
        this.logger.debug("Sending", name, args);

        await this.homey.notifications.createNotification({
        excerpt: this.homey.__(`Notification.${name}`, args),
       });
    }

    public async init(homey: Homey_) {
        this.homey = homey;
    }
}
