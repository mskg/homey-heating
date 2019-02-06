import { DEFAULT_HEATING_PLAN } from "../app/helper/defaultPlan";
import { ApiBase } from "./types";
import { IHeatingPlan } from "../app/model";
import { remove, find } from "lodash";

class GetResetPlans extends ApiBase {
    constructor() {
        super("GET", "/resetplans");
    }

    public fn(args, callback) {
        this.logger.debug("GET resetplans");

        this.myApp.repository.replacePlans(DEFAULT_HEATING_PLAN);

        // callback follows ( err, result )
        callback(null, "Done.");
    }
}

class GetPlans extends ApiBase {
    constructor() {
        super("GET", "/plans");
    }

    public async fn(args, callback) {
        this.logger.debug("GET plans");

        const result = await this.myApp.repository.plans;

        // callback follows ( err, result )
        callback(null, result);
    }
}

class GetPlan extends ApiBase {
    constructor() {
        super("GET", "/plans/:id");
    }

    public async fn(args, callback) {
        this.logger.debug(`GET plan ${args.params.id}`);

        const result = await this.myApp.repository.find(args.params.id);

        // callback follows ( err, result )
        callback(null, result);
    }
}

class PutPlan extends ApiBase {
    constructor() {
        super("PUT", "/plans/:id");
    }

    public async fn(args, callback) {
        this.logger.debug(`PUT plan ${args.params.id}`);

        const plan = args.body as IHeatingPlan;
        plan.id = args.params.id;

        // kill all unkown devices
        if (plan.devices) {
            remove(plan.devices, (r: string) =>
                find(this.myApp.manager.devices, (d) => d.id == r) == null
            );
        }

        // kill all unkown devices
        if (plan.zones) {
            remove(plan.zones, (r: string) =>
                find(this.myApp.manager.zones, (z) => z.id == r) == null
            );
        }

        await this.myApp.repository.update(plan);

        // callback follows ( err, result )
        callback(null, plan);
    }
}

class DeletePlan extends ApiBase {
    constructor() {
        super("DELETE", "/plans/:id");
    }

    public async fn(args, callback) {
        this.logger.debug(`DELETE plan ${args.params.id}`);

        await this.myApp.repository.remove(args.params.id);
        callback(null, null);
    }
}

export default [
    new DeletePlan(),
    new GetPlan(),
    new PutPlan(),
    new GetPlans(),
    new GetResetPlans()
];