// must not be removed
import "reflect-metadata";
// position must not be changed

import { IHeatingPlan } from "@app/model";
import { BootStrapper, CapabilityType, HeatingPlanRepositoryService, ICategoryLogger, LoggerFactory } from "@app/services";
import { __, Driver } from "homey";
import { container } from "tsyringe";

class VirtualThermostatsDriver extends Driver {
    public async onInit() {
        // tslint:disable-next-line: no-console
        console.info(`Bootstrapping Driver v${__VERSION} (${__BUILD})`);

        await BootStrapper();
    }

    public async onPairListDevices(_data: any, callback: (err: Error | null, result: Array<{}>) => void) {
        // moved code down due to #94, HOMEY-HEATING-1A
        await BootStrapper();

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        const logger = factory.createLogger("Driver");

        const repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);

        logger.information("Preparing available devices");
        const plans: IHeatingPlan[] = await repository.plans;

        callback(null,
            plans.map((p) => {
                return {
                    name: __("Device.pair", { name: p.name }),
                    data: {
                        id: p.id,
                    },
                    capabilities: [
                        CapabilityType.TargetTemperature,
                        CapabilityType.MeasureTemperature,
                        CapabilityType.ThermostatOverride,
                    ],
                };
            }),
        );
    }

}

module.exports = VirtualThermostatsDriver;
