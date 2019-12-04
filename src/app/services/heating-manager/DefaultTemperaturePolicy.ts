import { Retry } from "@app/helper";
import { registry } from "tsyringe";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { ICategoryLogger, LoggerFactory, trycatchlog } from "../log";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@registry([{
    token: PolicyType.CheckTemperature, useFactory: (r) => new DefaultTemperaturePolicy(
        false,
        r.resolve(LoggerFactory),
        r.resolve(DeviceManagerService)),
}])
@registry([{
    token: PolicyType.Enforce, useFactory: (r) => new DefaultTemperaturePolicy(
        true,
        r.resolve(LoggerFactory),
        r.resolve(DeviceManagerService)),
}])
export class DefaultTemperaturePolicy implements ISetTemperaturePolicy {
    private logger: ICategoryLogger;

    constructor(
        private enforce: boolean,
        factory: LoggerFactory,
        private deviceManager: DeviceManagerService,
    ) {
        this.logger = factory.createLogger(enforce ? "ST:Enforce" : "ST:Check");
    }

    // we mask, because everything is masked anyway
    @trycatchlog(true, { success: false, error: "unhandeled" })
    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        const logger = this.logger.createSubLogger(__PRODUCTION__ ? device.id : device.name);

        logger.debug(`Checking temperature ${targetTemperature}°`);
        if (!device.ready) {
            logger.information(`Device not ready: ${device.unavailableMessage}`);
            return {
                success: false,
                skipped: true,
                error: "not_ready",
            };
        }

        try {
            const value = this.deviceManager.getTargetTemperature(device);
            if (this.enforce || value !== targetTemperature) {
                if (__PRODUCTION__) {
                    await Retry(async () => {
                        // double check value before setting #68
                        const checkedValue = this.deviceManager.getTargetTemperature(device);
                        if (checkedValue !== targetTemperature) {
                            logger.information(`Set temperature to ${targetTemperature}`);
                            await this.deviceManager.setTargetTemperature(device, targetTemperature);
                            logger.debug(`Done.`);
                        } else {
                            logger.information(`Target temperature already set. (2)`);
                        }
                    }, logger, 5, 1000, true, 20000);
                } else {
                    logger.debug(`***** Would set to ${targetTemperature}`);
                }

                return { success: true, skipped: false };
            } else {
                logger.information(`Target temperature already set. (1)`);
                return { success: true, skipped: true };
            }
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
