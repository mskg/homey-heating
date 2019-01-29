import callAPI from "../callAPI";
import { Settings } from "../../../app/model";

export type SettingsHashMap = {
  [key in keyof typeof Settings]?: string | boolean;
};

const fetchSettings = async (): Promise<SettingsHashMap> => {
  return await callAPI<SettingsHashMap>("GET", "/settings");
};

const updateSettings = async (settings): Promise<void> => {
  return await callAPI<any>("PUT", `/settings`, settings);
}

export const settingsAPI = {
  fetchSettings,
  updateSettings
};