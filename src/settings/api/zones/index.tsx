import { sortBy } from "lodash";
import { IHeatingZone } from "../../../app/model";
import callAPI from "../callAPI";

export type HashType = {
  [key: string]: IHeatingZone;
} & ArrayLike<IHeatingZone>;

const fetchHeatingZones = async (): Promise<HashType> => {
  const zones = await callAPI<any[]>("GET", "/zones");

  const result = sortBy(zones, "name").reduce((map, obj, idx) => {
    map[idx] = obj;
    map[obj.id] = obj;
    return map;
  }, {});

  result.length = zones.length;
  return result;
};

export const zoneAPI = {
  fetchHeatingZones,
};
