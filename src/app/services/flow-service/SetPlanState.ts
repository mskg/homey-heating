
import { flowCardActionFactory, IFlowContext } from "./args";

type PlaceHolderArg = {
    name: string;
    id: string;
};

type PlanRefArgs = {
    plan: PlaceHolderArg;
};

type ChangePlanArgs = PlanRefArgs & {
    state: string;
};

export function SetPlanStateAction({ flow, logger, repository }: IFlowContext) {
    return flowCardActionFactory<ChangePlanArgs>(flow, "set_plan_state", logger, async (args, _state) => {
            const plan = await repository.find(args.plan.id);
            if (plan == null) { return false; }

            plan.enabled = args.state === "true";
            await repository.update(plan);

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
