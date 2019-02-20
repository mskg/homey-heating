// must not be removed
import "reflect-metadata";
// position must not be changed
import { container, InjectionToken } from "tsyringe";
import debuggerApi from "./debugger";
import modeApi from "./mode";
import plansAPi from "./plans";
import scheduleApi from "./schedule";
import settingsApi from "./settings";
import utiltiyApi from "./utility";

// tslint:disable-next-line: no-console
console.info(`Bootstrapping API v${__VERSION} (${__BUILD})`);

module.exports = [
    ...debuggerApi,
    ...settingsApi,
    ...modeApi,
    ...plansAPi,
    ...utiltiyApi,
    ...scheduleApi,
].map((c) => container.resolve(c as InjectionToken));
