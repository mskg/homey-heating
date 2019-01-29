import { filter, find, remove } from "lodash";
import { EventDispatcher } from "strongly-typed-events";
import { Mutex } from "../../helper/Mutex";
import { IHeatingPlan, Settings } from "../../model";
import { ILogger, LogService } from "../log";
import { ManagerSettings } from "homey";
import { DEFAULT_HEATING_PLAN } from "../../helper/defaultPlan";

export class HeatingPlanRepositoryService {
    private planList: IHeatingPlan[] = [];
    private logger: ILogger;
    private mutex: Mutex = new Mutex();

    private onChangedDispatcher = new EventDispatcher<HeatingPlanRepositoryService, IHeatingPlan>();

    constructor() {
        this.logger = LogService.createLogger("Repository");
    }

    public replacePlans(planList: IHeatingPlan[]) {
        this.planList = planList;
        this.save();
    }

    public load() {
        if (!PRODUCTION) {
            this.planList = DEFAULT_HEATING_PLAN;
        } else {
            const plansString = ManagerSettings.get(Settings.Plans);
            if (plansString == null) {
                this.planList = [];
            } else {
                this.planList = JSON.parse(plansString);
            }
        }
    }

    public save() {
        if (PRODUCTION) {
            ManagerSettings.set(Settings.Plans, JSON.stringify(this.planList));
        }
    }

    public get plans(): Promise<IHeatingPlan[]> {
        const unlockPromise = this.mutex.lock();

        return unlockPromise.then((unlock) => {
            const list = this.planList;
            unlock();
            return list;
        });
    }

    public get activePlans(): Promise<IHeatingPlan[]> {
        const unlockPromise = this.mutex.lock();

        return unlockPromise.then((umlock) => {
            const list = filter(this.planList, (p: IHeatingPlan) => p.enabled);
            umlock();
            return list;
        });
    }

    public get onChanged() {
        return this.onChangedDispatcher.asEvent();
    }

    public async find(id: string): Promise<IHeatingPlan> {
        const unlockPromise = this.mutex.lock();

        return unlockPromise.then((umlock) => {
            const result = find(this.planList, (p) => p.id === id);
            umlock();
            return result;
        });
    }

    public async update(plan: IHeatingPlan) {
        const unlock = await this.mutex.lock();
        {
            this.logger.debug(`Updating plan ${plan.id}`);
            remove(this.planList, (p) => p.id === plan.id);
            this.planList.push(plan);

            this.save();
        }
        unlock();

        this.onChangedDispatcher.dispatch(this, plan);
    }

    public async add(plan: IHeatingPlan) {
        const unlock = await this.mutex.lock();
        {
            this.logger.debug(`Adding plan ${plan.id}`);
            this.planList.push(plan);

            this.save();
        }
        unlock();

        this.onChangedDispatcher.dispatch(this, plan);
    }

    public async remove(id: string) {
        let plan: IHeatingPlan;

        const unlock = await this.mutex.lock();
        {
            this.logger.debug(`Removing plan ${id}`);

            plan = find(this.planList, (p) => p.id === id);
            remove(this.planList, (p) => p.id === id);

            this.save();
        }
        unlock();

        this.onChangedDispatcher.dispatch(this, plan);
    }
}
