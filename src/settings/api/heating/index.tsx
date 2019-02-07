
import { map, sortBy } from "lodash";
import { IHeatingPlan, ICalculatedTemperature, OperationMode, IScheduleInformation } from "../../../app/model";
import callAPI from "../callAPI";

const fetchPlans = async (): Promise<IHeatingPlan[]> => {
  var res = await callAPI<IHeatingPlan[]>("GET", "/plans");

  return map(res, plan => {
    plan.zones = plan.zones || [];
    plan.devices = plan.devices || [];

    return plan;
  });
};

const togglePlanState = async (plan: IHeatingPlan): Promise<boolean> => {
  plan.enabled = !plan.enabled;
  await updatePlan(plan);

  return true;
};

const updatePlan = async (newPlan: IHeatingPlan): Promise<IHeatingPlan> => {
  const planCopy = {...newPlan};

  if (!planCopy.zones || planCopy.zones.length == 0) { planCopy.zones = null; }
  if (!planCopy.devices || planCopy.devices.length == 0) { planCopy.devices = null; }

  return await callAPI<IHeatingPlan>("PUT", `/plans/${newPlan.id}`, planCopy);
}

const removePlan = async (id: string): Promise<IHeatingPlan> => {
  return await callAPI<IHeatingPlan>("DELETE", `/plans/${id}`);
}

const fetchPlanById = async (id: string): Promise<IHeatingPlan> => {
  var plan = await callAPI<IHeatingPlan>("GET", `/plans/${id}`);
  if (plan == null) throw new Error(`Plan ${id} not found.`);

  plan.zones = plan.zones || [];
  plan.devices = plan.devices || [];

  return plan;
}

const fetchSchedule = async (): Promise<IScheduleInformation> => {
  var schedule = await callAPI<IScheduleInformation>("GET", `/schedule`);
  schedule.temperatures = sortBy(schedule.temperatures, [(s:ICalculatedTemperature) => s.device.name]);

  return schedule;
}

const fetchMode = async (): Promise<OperationMode> => {
  var res = await callAPI<OperationMode>("GET", "/mode");
  return res;
};

const setMode = async (mode: OperationMode): Promise<void> => {
   return await callAPI<void>("PUT", `/mode`, {mode: mode});
}

export const planAPI = {
  fetchPlans,
  fetchPlanById,
  fetchSchedule,
  updatePlan,
  removePlan,
  togglePlanState
};

export const modeAPI = {
  fetchMode,
  setMode,
};