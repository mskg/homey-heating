import { DEFAULT_HEATING_PLAN, Mutex } from "@app/helper";
import { IHeatingPlan } from "@app/model";
import { filter, find, remove } from "lodash";
import { EventDispatcher } from "strongly-typed-events";
import { singleton } from "tsyringe";
import { asynctrycatchlog, ILogger, LoggerFactory, trycatchlog } from "../log";
import { Settings, SettingsManagerService } from "../settings-manager";

@singleton()
export class HeatingPlanRepositoryService {
    private planList: IHeatingPlan[] = [];
    private logger: ILogger;
    private mutex: Mutex = new Mutex();
    private changed = false;

    private onChangedDispatcher = new EventDispatcher<HeatingPlanRepositoryService, IHeatingPlan[]>();

    constructor(
        private settings: SettingsManagerService,
        loggerFactory: LoggerFactory) {
        this.logger = loggerFactory.createLogger("Repository");

        this.settings.onChanged.subscribe((s, e) => {
            if (this.changed) {
                // we skip our save event
                this.changed = false;
                return;
            }
            if (e.setting == Settings.Plans) {
                this.logger.information("Reload due to settings change.");
                
                try {
                    this.load();
                    this.onChangedDispatcher.dispatch(this, this.planList);
                } 
                catch (e) {
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
            if (!PRODUCTION) {
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
    @asynctrycatchlog(true, [])
    public get plans(): Promise<IHeatingPlan[]> {
        const unlockPromise = this.mutex.lock();

        return unlockPromise.then((unlock) => {
            const list = this.planList;
            unlock();
            return list;
        });
    }

    // we don't kill the app if plans might be invalid
    @asynctrycatchlog(true, [])
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

    // caller needs to know
    public async find(id: string): Promise<IHeatingPlan> {
        const unlockPromise = this.mutex.lock();

        return unlockPromise.then((umlock) => {
            const result = find(this.planList, (p) => p.id === id);
            umlock();
            return result;
        });
    }

    // caller needs to know
    public async update(plan: IHeatingPlan) {
        const unlock = await this.mutex.lock();
        {
            this.logger.debug(`Updating plan ${plan.id}`);
            remove(this.planList, (p) => p.id === plan.id);
            this.planList.push(plan);

            this.save();
        }
        unlock();

        this.onChangedDispatcher.dispatch(this, [plan]);
    }

    // caller needs to know
    public async add(plan: IHeatingPlan) {
        const unlock = await this.mutex.lock();
        {
            this.logger.debug(`Adding plan ${plan.id}`);
            this.planList.push(plan);

            this.save();
        }
        unlock();

        this.onChangedDispatcher.dispatch(this, [plan]);
    }

    // caller needs to know
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

        this.onChangedDispatcher.dispatch(this, [plan]);
    }
}
