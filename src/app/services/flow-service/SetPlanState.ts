
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

export const SetPlanStateAction = ({ logger, repository }: IFlowContext) => {
    return flowCardActionFactory<ChangePlanArgs>("set_plan_state", logger, async (args, state) => {
            const plan = await repository.find(args.plan.id);
            if (plan == null) { return false; }

            plan.enabled = args.state === "true";
            await repository.update(plan);

            return true;
        })
        .getArgument("plan")
        .registerAutocompleteListener(async (query, args) => {
            const plans = await repository.plans;

            return plans.map<PlaceHolderArg>((p) => {
                return {
                    id: p.id,
                    name: p.name || p.id,
                };
            });
        });
};
