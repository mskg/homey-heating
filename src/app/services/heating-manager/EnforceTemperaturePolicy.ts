import { Retry } from "@app/helper";
import { injectable, registry } from "tsyringe";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { asynctrycatchlog, ICategoryLogger, LoggerFactory } from "../log";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@injectable()
@registry([{ token: PolicyType.Enforce, useToken: EnforceTemperaturePolicy }])
export class EnforceTemperaturePolicy implements ISetTemperaturePolicy {
    private logger: ICategoryLogger;

    constructor(factory: LoggerFactory,
                private deviceManager: DeviceManagerService,
    ) {
        this.logger = factory.createLogger("ST/Enforce");
    }

    // we mask, because everything is masked anyway
    @asynctrycatchlog(true, { success: false, error: "unhandeled" })
    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        const logger = this.logger.createSubLogger(__PRODUCTION__ ? device.id : device.name);

        if (!device.ready) {
            logger.information(`> Device is not ready: ${device.unavailableMessage}`);
            return {
                success: false,
                skipped: false,
                error: "not_ready",
            };
        }

        try {
            if (__PRODUCTION__) {
                // incremental backoff, 5 retries, max 20s
                await Retry(async () => {
                    logger.information(`Set temperature to ${targetTemperature}`);
                    await this.deviceManager.setTargetTemperature(device, targetTemperature);
                    logger.debug(`Done.`);
                }, logger, 5, 1000, true, 20000);
            } else {
                logger.debug(`***** Would set to ${targetTemperature}`);
            }

            return { success: true, skipped: false };
        } catch (e) {
            logger.error(e, `Failed to set temperature`);

            return {
                success: false,
                skipped: false,
                error: e.name,
            };
        }
    }
}
