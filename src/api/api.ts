import { app, ManagerSettings } from "homey";
import { find, forEach, map, remove } from "lodash";
import { HeatingSchedulerApp } from "../app/app";
import { DEFAULT_HEATING_PLAN } from "../app/helper/defaultPlan";
import { IHeatingDevice, IHeatingPlan, IHeatingZone, IScheduleInformation, OperationMode, Settings } from "../app/model";
import { LogService } from "../app/services/log";

declare var PRODUCTION: boolean;

interface IAPIParams {
    body: any;
    params: { [k: string]: string };
    query: { [k: string]: string };
}

LogService.init(app);
const logger = LogService.createLogger("Api");

module.exports = [
    {
        method: "GET",
        path: "/settings",
        public: !PRODUCTION,

        fn: (args: IAPIParams, callback) => {
            logger.debug("GET settings");

            var result = {};

            forEach(Object.keys(Settings), s=> {
                result[s] = ManagerSettings.get(Settings[s]);
            });

            callback(null, result);
        },
    },
    {
        method: "PUT",
        path: "/settings",
        public: !PRODUCTION,

        fn: (args: IAPIParams, callback) => {
            logger.debug("PUT settings");

            const settings = args.body;

            forEach(Object.keys(Settings), publicKey=> {
                var privateKey = Settings[publicKey];

                if (settings.hasOwnProperty(publicKey)) {
                    ManagerSettings.set(privateKey, settings[publicKey]);
                }
            });

            const myApp = app as HeatingSchedulerApp;
            myApp.refreshConfig();

            callback(null, null);
        },
    },

    {
        method: "GET",
        path: "/schedule",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("GET schedule");

            const myApp = app as HeatingSchedulerApp;
            const result: IScheduleInformation = {
                mode: app.manager.operationMode,
                nextDate: app.scheduler.nextSchedule,
                temperatures: await myApp.manager.evaluateActivePlans(),
            };

            // callback follows ( err, result )
            callback(null, result);
        },
    },  

    {
        method: "GET",
        path: "/mode",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("GET mode");

            const myApp = app as HeatingSchedulerApp;
            callback(null, myApp.manager.operationMode);
        },
    },
    {
        method: "PUT",
        path: "/mode",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("PUT mode");

            const mode: number = args.body.mode;

            const myApp = app as HeatingSchedulerApp;
            myApp.manager.operationMode = mode as OperationMode;

            await myApp.manager.applyPlans();
            await myApp.scheduler.start();

            callback(null, null);
        },
    },
    {
        method: "GET",
        path: "/zones",
        public: !PRODUCTION,

        fn: (args: IAPIParams, callback) => {
            logger.debug("GET zones");

            const myApp = app as HeatingSchedulerApp;
            const result = map(myApp.manager.zones,
                z => {
                    return {
                        id: z.id,
                        name: z.name,
                        icon: z.icon,
                    } as IHeatingZone
                }
            );

            callback(null, result);
        },
    },
    {
        method: "GET",
        path: "/devices",
        public: !PRODUCTION,

        fn: (args: IAPIParams, callback) => {
            logger.debug("GET devices");
            
            const myApp = app as HeatingSchedulerApp;
            const result = map(myApp.manager.devices, 
                z => {
                    return {
                        id: z.id,
                        name: z.name,
                        icon: z.iconObj && z.iconObj.url,
                    } as IHeatingDevice
                }
            );

            callback(null, result);
        },
    },
    {
        method: "GET",
        path: "/resetplans",
        public: true,

        fn: (args: IAPIParams, callback) => {
            logger.debug("GET resetplans");

            const myApp = app as HeatingSchedulerApp;
            myApp.repository.replacePlans(DEFAULT_HEATING_PLAN);

            // callback follows ( err, result )
            callback(null, "Done.");
        },
    },  
    {
        method: "GET",
        path: "/plans",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("GET plans");

            const myApp = app as HeatingSchedulerApp;
            const result = await myApp.repository.plans;

            // callback follows ( err, result )
            callback(null, result);
        },
    },
    // {
    //     method: "POST",
    //     path: "/plans/:id/apply",
    //     public: !PRODUCTION,

    //     fn: async (args: IAPIParams, callback) => {
    //         logger.debug("POST evaluate plans");

    //         const myApp = app as HeatingSchedulerApp;
    //         const plan = await myApp.repsitory.find(args.params.id);

    //         await myApp.manager.applyPlan(plan);

    //         // callback follows ( err, result )
    //         callback(null, null);
    //     },
    // },
    {
        method: "GET",
        path: "/plans/:id",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug(`GET plan ${args.params.id}`);

            const myApp = app as HeatingSchedulerApp;
            const result = await myApp.repository.find(args.params.id);

            // callback follows ( err, result )
            callback(null, result);
        },
    },
    {
        method: "PUT",
        path: "/plans/:id",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug(`PUT plan ${args.params.id}`);

            const myApp = app as HeatingSchedulerApp;

            const plan = args.body as IHeatingPlan;
            plan.id = args.params.id;

            // kill all unkown devices
            if (plan.devices) {
                remove(plan.devices, (r: string) =>
                    find(myApp.manager.devices, (d) => d.id == r) == null
                );
            }

            // kill all unkown devices
            if (plan.zones) {
                remove(plan.zones, (r: string) =>
                    find(myApp.manager.zones, (z) => z.id == r) == null
                );
            }

            await myApp.repository.update(plan);

            // callback follows ( err, result )
            callback(null, plan);
        },
    },
    {
        method: "DELETE",
        path: "/plans/:id",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug(`DELETE plan ${args.params.id}`);

            const myApp = app as HeatingSchedulerApp;

            await myApp.repository.remove(args.params.id);
            callback(null, null);
        },
    },
];
