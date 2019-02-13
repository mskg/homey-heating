import { Retry } from "@app/helper";
import { injectable, registry } from "tsyringe";
import { AuditedDevice, DeviceManagerService } from "../device-manager";
import { asynctrycatchlog, LoggerFactory } from "../log";
import { ISetTemperaturePolicy, PolicyType } from "./types";

@injectable()
@registry([{ token: PolicyType.CheckTemperature, useToken: CheckTemperaturePolicy }])
export class CheckTemperaturePolicy implements ISetTemperaturePolicy {
    private logger;

    constructor(factory: LoggerFactory,
                private deviceManager: DeviceManagerService,
    ) {
        this.logger = factory.createLogger("ST/Check");
    }

    // we mask, because everything is masked anyway
    @asynctrycatchlog(true, { success: false, error: "unhandeled" })
    public async setTargetTemperature(device: AuditedDevice, targetTemperature: number) {
        this.logger.debug(`Checking temperature ${targetTemperature}° for device ${device.name} (${device.id})`);

        if (!device.ready) {
            this.logger.error(`> Device ${device.name} is not ready (${device.unavailableMessage}).`);
            return {
                success: false,
                error: "not_ready",
            };
        }

        try {
            const value = this.deviceManager.getTargetTemperature(device);
            if (value !== targetTemperature) {
                if (PRODUCTION) {
                    await Retry(async () => {
                        this.logger.information(`Adjusting temperature for ${device.name} to ${targetTemperature}`);
                        await this.deviceManager.setTargetTemperature(device, targetTemperature);
                        this.logger.debug(`> ${device.name} done.`);
                    }, this.logger, 5, 1000, true, 20000);
                } else {
                    this.logger.debug(`***** Would set to ${targetTemperature}`);
                }
            } else {
                this.logger.information(`> ${device.name} target temperature already set.`);
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
