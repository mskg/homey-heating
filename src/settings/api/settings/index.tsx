import { Settings } from "../../../app/services/settings-manager/types";
import callAPI from "../callAPI";

export type SettingsHashMap = {
  [key in keyof typeof Settings]?: string | boolean;
};

const fetchSettings = async (): Promise<SettingsHashMap> => {
  return await callAPI<SettingsHashMap>("GET", "/settings");
};

const updateSettings = async (settings: {}): Promise<void> => {
  return await callAPI<any>("PUT", `/settings`, settings);
};

export const settingsAPI = {
  fetchSettings,
  updateSettings,
};
