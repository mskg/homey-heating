import { DEFAULT_HEATING_PLAN } from "@app/helper";
import { IHeatingPlan } from "@app/model";
import { DeviceManagerService, HeatingPlanRepositoryService } from "@app/services";
import { find, remove } from "lodash";
import { injectable } from "tsyringe";
import { ApiBase, IAPIParams, SUCCESS } from "./types";

type Params = {
    id: string;
};

@injectable()
class GetResetPlans extends ApiBase {
    constructor(private manager: HeatingPlanRepositoryService) {
        super("GET", "/resetplans");
    }

    protected async execute() {
        this.manager.replacePlans(DEFAULT_HEATING_PLAN);
        return await this.manager.plans;
    }
}

@injectable()
class GetPlans extends ApiBase {
    constructor(private manager: HeatingPlanRepositoryService) {
        super("GET", "/plans");
    }

    protected async execute() {
        const result = await this.manager.plans;
        return result;
    }
}

@injectable()
class GetPlan extends ApiBase<any, Params> {
    constructor(private manager: HeatingPlanRepositoryService) {
        super("GET", "/plans/:id");
    }

    protected async execute(args: IAPIParams<any, Params>) {
        const result = await this.manager.find(args.params.id);

        return result;
    }
}

@injectable()
class PutPlan extends ApiBase<any, Params> {
    constructor(
        private manager: HeatingPlanRepositoryService,
        private devices: DeviceManagerService) {
        super("PUT", "/plans/:id");
    }

    protected async execute(args: IAPIParams<any, Params>) {
        const plan = args.body as IHeatingPlan;
        plan.id = args.params.id;

        // kill all unkown devices
        if (plan.devices) {
            remove(plan.devices, (r: string) =>
                find(this.devices.devices, (d) => d.id === r) == null,
            );
        }

        // kill all unkown devices
        if (plan.zones) {
            remove(plan.zones, (r: string) =>
                find(this.devices.zones, (z) => z.id === r) == null,
            );
        }

        // if the plan is disabled -> no override
        // this way we can recover from fully manual
        if (!plan.enabled) {
            delete plan.thermostatMode;
        }

        await this.manager.update(plan);
        return plan;
    }
}

@injectable()
class DeletePlan extends ApiBase<any, Params> {
    constructor(private manager: HeatingPlanRepositoryService) {
        super("DELETE", "/plans/:id");
    }

    protected async execute(args: IAPIParams<any, Params>) {
        await this.manager.remove(args.params.id);
        return SUCCESS;
    }
}

export default [
    DeletePlan,
    GetPlan,
    PutPlan,
    GetPlans,
    GetResetPlans,
];
