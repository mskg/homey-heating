
// https://github.com/Lemoncode/react-typescript-samples/tree/master/18%20Hooks/src/api

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
  if (!newPlan.zones || newPlan.zones.length == 0) { newPlan.zones = null; }
  if (!newPlan.devices || newPlan.devices.length == 0) { newPlan.devices = null; }

  return await callAPI<IHeatingPlan>("PUT", `/plans/${newPlan.id}`, newPlan);
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