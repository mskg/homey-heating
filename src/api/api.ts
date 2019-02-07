import modeApi from "./mode";
import plansAPi from "./plans";
import scheduleApi from "./schedule";
import settingsApi from "./settings";
import utiltiyApi from "./utility";

module.exports = [
    ...settingsApi,
    ...modeApi,
    ...plansAPi,
    ...utiltiyApi,
    ...scheduleApi
];
