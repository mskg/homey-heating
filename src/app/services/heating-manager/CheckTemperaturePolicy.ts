import { Retry } from "@app/helper";
import { injectable, registry } from "tsyringe";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { asynctrycatchlog, ICategoryLogger, LoggerFactory } from "../log";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@injectable()
@registry([{ token: PolicyType.CheckTemperature, useToken: CheckTemperaturePolicy }])
export class CheckTemperaturePolicy implements ISetTemperaturePolicy {
    private logger: ICategoryLogger;

    constructor(factory: LoggerFactory,
                private deviceManager: DeviceManagerService,
    ) {
        this.logger = factory.createLogger("ST/Check");
    }

    // we mask, because everything is masked anyway
    @asynctrycatchlog(true, { success: false, error: "unhandeled" })
    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        const logger = this.logger.createSubLogger(PRODUCTION ? device.id : device.name);

        logger.debug(`Checking temperature ${targetTemperature}°`);
        if (!device.ready) {
            logger.error(`Device not ready: ${device.unavailableMessage}`);
            return {
                success: false,
                skipped: true,
                error: "not_ready",
            };
        }

        try {
            const value = this.deviceManager.getTargetTemperature(device);
            if (value !== targetTemperature) {
                if (PRODUCTION) {
                    await Retry(async () => {
                        logger.information(`Set temperature to ${targetTemperature}`);
                        await this.deviceManager.setTargetTemperature(device, targetTemperature);
                        logger.debug(`Done.`);
                    }, logger, 5, 1000, true, 20000);
                } else {
                    logger.debug(`***** Would set to ${targetTemperature}`);
                }

                return { success: true, skipped: false };
            } else {
                logger.information(`Target temperature already set.`);
                return { success: true, skipped: true };
            }
        } catch (e) {
            logger.error(`Failed to set temperature`, e);

            return {
                success: false,
                skipped: false,
                error: e.name,
            };
        }
    }
}
