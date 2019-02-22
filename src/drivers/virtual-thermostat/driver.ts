// must not be removed
import "reflect-metadata";
// position must not be changed

import { IHeatingPlan } from "@app/model";
import { BootStrapper, CapabilityType, HeatingPlanRepositoryService, ICategoryLogger, LoggerFactory } from "@app/services";
import { __, Driver } from "homey";
import { container } from "tsyringe";

class VirtualThermostatsDriver extends Driver {
    private logger!: ICategoryLogger;
    private repository!: HeatingPlanRepositoryService;

    public async onInit() {
        await BootStrapper();

        // tslint:disable-next-line: no-console
        console.info(`Bootstrapping Driver v${__VERSION} (${__BUILD})`);

        const factory = container.resolve<LoggerFactory>(LoggerFactory);
        this.logger = factory.createLogger("Driver");

        this.repository = container.resolve<HeatingPlanRepositoryService>(HeatingPlanRepositoryService);
    }

    public async onPairListDevices(_data: any, callback: (err: Error | null, result: Array<{}>) => void) {
        this.logger.information("Preparing available devices");
        const plans: IHeatingPlan[] = await this.repository.plans;

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
