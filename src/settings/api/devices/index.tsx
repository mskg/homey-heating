
import { sortBy } from "lodash";
import { IHeatingDevice } from "../../../app/model";
import callAPI from "../callAPI";

type hashType = {
  [key: string] : IHeatingDevice;
} & ArrayLike<IHeatingDevice>;

// Homey.api( String method, String path, Mixed body, Function callback )
const fetchHeatingDevices = async (): Promise<hashType> => {
  var devices = await callAPI<any[]>("GET", "/devices");

  var result = sortBy(devices,"name").reduce((map, obj, idx) => {
    map[idx] = obj;
    map[obj.id] = obj;
    return map;
  }, {});
  result.length = devices.length;

  return result;
};

export const deviceAPI = {
  fetchHeatingDevices,
};