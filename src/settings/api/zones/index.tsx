import { sortBy } from "lodash";
import { IHeatingZone } from "../../../app/model";
import callAPI from "../callAPI";

type hashType = {
  [key: string]: IHeatingZone;
} & ArrayLike<IHeatingZone>;

const fetchHeatingZones = async (): Promise<hashType> => {
  var zones = await callAPI<any[]>("GET", "/zones");

  var result = sortBy(zones, "name").reduce((map, obj, idx) => {
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