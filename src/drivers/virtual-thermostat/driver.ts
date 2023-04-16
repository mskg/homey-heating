// must not be removed
import "reflect-metadata";
// position must not be changed

import { IHeatingPlan } from "@app/model";
import { BootStrapper, CapabilityType, HeatingPlanRepositoryService, LoggerFactory } from "@app/services";
import { Driver } from "homey";
import { container } from "tsyringe";

class VirtualThermostatsDriver extends Driver {
    public async onInit() {
        // tslint:disable-next-line: no-console
        console.info(`Bootstrapping Driver v${__VERSION} (${__BUILD})`);
        await BootStrapper(this.homey.app);
    }

    public async onPairListDevices() {
        // moved code down due to #94, HOMEY-HEATING-1A
        await BootStrapper(this.homey.app);

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        const logger = factory.createLogger("Driver");

        const repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);

        logger.information("Preparing available devices");
        const plans: IHeatingPlan[] = await repository.plans;

        return plans.map((p) => {
            return {
                name: this.homey.__("Device.pair", { name: p.name }),
                data: {
                    id: p.id,
                },
                capabilities: [
                    CapabilityType.TargetTemperature,
                    CapabilityType.MeasureTemperature,
                    CapabilityType.ThermostatOverride,
                ],
            };
        });
    }

}

module.exports = VirtualThermostatsDriver;
