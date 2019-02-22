
import { flowCardActionFactory, IFlowContext } from "./args";

type PlaceHolderArg = {
    name: string;
    id: string;
};

type PlanRefArgs = {
    plan: PlaceHolderArg;
};

export function ApplyPlanAction({ logger, manager, repository }: IFlowContext) {
    return flowCardActionFactory<PlanRefArgs>("apply_plan", logger, async (args, _state) => {
        const plan = await repository.find(args.plan.id);
        if (plan == null) { return Promise.resolve(false); }

        await manager.applyPlan(plan);
        return true;
    })
    .getArgument("plan")
    .registerAutocompleteListener(async (_query, _args) => {
        const plans = await repository.plans;

        return plans.map<PlaceHolderArg>((p) => {
            return {
                id: p.id,
                name: p.name || p.id,
            };
        });
    });
}
