import { Retry } from "@app/helper";
import { injectable, registry } from "tsyringe";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { asynctrycatchlog, LoggerFactory } from "../log";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@injectable()
@registry([{ token: PolicyType.Enforce, useToken: EnforceTemperaturePolicy }])
export class EnforceTemperaturePolicy implements ISetTemperaturePolicy {
    private logger;

    constructor(factory: LoggerFactory,
                private deviceManager: DeviceManagerService,
    ) {
        this.logger = factory.createLogger("ST/Enforce");
    }

    // we mask, because everything is masked anyway
    @asynctrycatchlog(true, { success: false, error: "unhandeled" })
    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        this.logger.debug(`Checking temperature for device ${device.name} (${device.id})`);

        if (!device.ready) {
            this.logger.error(`> Device ${device.name} is not ready (${device.unavailableMessage}).`);
            return {
                success: false,
                error: "not_ready",
            };
        }

        try {
            if (PRODUCTION) {
                // incremental backoff, 5 retries, max 20s
                await Retry(async () => {
                    this.logger.information(`Adjusting temperature for ${device.name} to ${targetTemperature}`);
                    await this.deviceManager.setTargetTemperature(device, targetTemperature);
                    this.logger.debug(`> ${device.name} done.`);
                }, this.logger, 5, 1000, true, 20000);
            } else {
                this.logger.debug(`***** Would set to ${targetTemperature}`);
            }

            return { success: true };
        } catch (e) {
            this.logger.error(`Failed to set temperature ${device.name} (${device.id})`, e);

            return {
                success: false,
                error: e.name,
            };
        }
    }
}
