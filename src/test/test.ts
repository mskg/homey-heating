// tslint:disable

import { DEFAULT_HEATING_PLAN } from "../app/helper/defaultPlan";
import { HeatingPlanCalculator } from "../app/helper/HeatingPlanCalculator";
import _ = require("lodash");

const p = DEFAULT_HEATING_PLAN;
// console.log(JSON.stringify(p, null, 4));

var scheduler = new HeatingPlanCalculator();

// monday
_.forEach(p.zones, (z) => {
    scheduler.getSetPoint(z, new Date('2019-01-22T18:00:00'));
    scheduler.getNextSchedule(z, new Date('2019-01-22T18:00:00'));
});

console.log("--------------- 18:00");

// wednesday
_.forEach(p.zones, (z) => {
    scheduler.getSetPoint(z, new Date('2019-01-24T18:00:00'))});

// saturday
console.log("--------------- 19:00");

_.forEach(p.zones, (z) => {
    scheduler.getSetPoint(z, new Date('2019-01-26T19:00:00'))});
