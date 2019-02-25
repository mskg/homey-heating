import { DEFAULT_HEATING_PLAN, Mutex, synchronize } from "@app/helper";
import { IHeatingPlan } from "@app/model";
import { filter, find, remove } from "lodash";
import { EventDispatcher } from "strongly-typed-events";
import { singleton } from "tsyringe";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { Settings, SettingsManagerService } from "../settings-manager";

export enum PlanChangeEventType {
    Changed,
    Removed,
}

export type PlansChangedEventArgs = Array<{
    plan: IHeatingPlan,
    event: PlanChangeEventType,
}>;

@singleton()
export class HeatingPlanRepositoryService {
    private static Lock = new Mutex();

    private planList: IHeatingPlan[] = [];
    private logger: ILogger;
    private changed = false;

    private onChangedDispatcher = new EventDispatcher<HeatingPlanRepositoryService, PlansChangedEventArgs>();

    constructor(
        private settings: SettingsManagerService,
        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Repository");

        this.settings.onChanged.subscribe((_s, e) => {
            if (this.changed) {
                // we skip our save event
                this.changed = false;
                return;
            }

            if (e.setting === Settings.Plans) {
                this.logger.information("Reload due to settings change.");

                try {
                    // this is deadly wrong here -> not relevant now?
                    // need to make a diff in plans.
                    this.load();

                    this.onChangedDispatcher.dispatch(this, this.planList.map((p: IHeatingPlan) => {
                        return {
                            plan: p,
                            event: PlanChangeEventType.Changed,
                        };
                    }));
                } catch (e) {
                    this.logger.information("Reload of plans failed", e);
                    // TOOD: is this ok to kill?
                }
            }
        });
    }

    // handled by all callers
    public replacePlans(planList: IHeatingPlan[]) {
        this.planList = planList || [];
        this.save();
    }

    // handled by all callers
    public load() {
        const plansString = this.settings.get<string>(Settings.Plans);
        if (plansString == null) {
            if (!__PRODUCTION__) {
                this.planList = DEFAULT_HEATING_PLAN;
            } else {
                this.planList = [];
            }
        } else {
            this.planList = JSON.parse(plansString);
        }
    }

    // handled by all callers
    public save() {
        this.changed = true;
        this.settings.set(Settings.Plans, JSON.stringify(this.planList));
    }

    // we don't kill the app if plans might be invalid
    @trycatchlog(true, [])
    @synchronize(HeatingPlanRepositoryService.Lock)
    public get plans(): Promise<IHeatingPlan[]> {
        return Promise.resolve(this.planList);
    }

    // we don't kill the app if plans might be invalid
    @trycatchlog(true, [])
    @synchronize(HeatingPlanRepositoryService.Lock)
    public get activePlans(): Promise<IHeatingPlan[]> {
        return Promise.resolve(filter(this.planList, (p: IHeatingPlan) => p.enabled));
    }

    public get onChanged() {
        return this.onChangedDispatcher.asEvent();
    }

    // caller needs to know
    @synchronize(HeatingPlanRepositoryService.Lock)
    public find(id: string): Promise<IHeatingPlan | undefined> {
        return Promise.resolve(find(this.planList, (p) => p.id === id));
    }

    // caller needs to know
    @synchronize(HeatingPlanRepositoryService.Lock)
    public update(plansToUpdate: IHeatingPlan | IHeatingPlan[], notify = true): Promise<void> {
        const plans = (Array.isArray(plansToUpdate) ? plansToUpdate : [plansToUpdate]);

        plans.forEach((plan) => {
            this.logger.debug(`Updating plan ${plan.id}`);

            remove(this.planList, (p) => p.id === plan.id);
            this.planList.push(plan);
        });

        this.save();

        if (notify) {
            return Promise.resolve().then(() => {
                this.onChangedDispatcher.dispatch(this,
                    plans.map((plan) => ({ plan, event: PlanChangeEventType.Changed })));
            });
        }

        return Promise.resolve();
    }

    // caller needs to know
    @synchronize(HeatingPlanRepositoryService.Lock)
    public add(plan: IHeatingPlan): Promise<void> {
        this.logger.debug(`Adding plan ${plan.id}`);
        this.planList.push(plan);
        this.save();

        return Promise.resolve().then(
            () => this.onChangedDispatcher.dispatch(this, [{ plan, event: PlanChangeEventType.Changed }]));
    }

    // caller needs to know
    @synchronize(HeatingPlanRepositoryService.Lock)
    public remove(id: string): Promise<void> {
        let plan: IHeatingPlan | undefined;

        this.logger.debug(`Removing plan ${id}`);

        plan = find(this.planList, (p) => p.id === id);
        remove(this.planList, (p) => p.id === id);

        this.save();

        if (plan != null) {
            return Promise.resolve().then(
                // @ts-ignore
                () => this.onChangedDispatcher.dispatch(this, [{ plan, event: PlanChangeEventType.Removed }]));
        }

        return Promise.resolve();
    }
}
