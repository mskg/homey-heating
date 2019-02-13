// must not be removed
import 'reflect-metadata';
// position must not be changed

import modeApi from "./mode";
import plansAPi from "./plans";
import scheduleApi from "./schedule";
import settingsApi from "./settings";
import utiltiyApi from "./utility";
import { container, InjectionToken } from 'tsyringe';

console.log("Bootstrapping API");
module.exports = [
    ...settingsApi,
    ...modeApi,
    ...plansAPi,
    ...utiltiyApi,
    ...scheduleApi
].map(c => container.resolve(c as InjectionToken));
