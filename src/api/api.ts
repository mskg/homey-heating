import { app, ManagerSettings } from "homey";
import { filter, find, forEach, map, remove } from "lodash";
import { HeatingManagerApp } from "../app/app";
import { DEFAULT_HEATING_PLAN } from "../app/helper/defaultPlan";
import { IHeatingDevice, IHeatingPlan, IHeatingZone, Settings } from "../app/model";
import { CLASS_THERMOSTAT } from "../app/services/homey-api";
import { LogService } from "../app/services/log";

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

            const myApp = app as HeatingManagerApp;
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

            const myApp = app as HeatingManagerApp;
            myApp.refreshConfig();

            callback(null, null);
        },
    },
    // {
    //     method: "PUT",
    //     path: "/mode",
    //     public: !PRODUCTION,

    //     fn: (args: IAPIParams, callback) => {
    //         logger.debug("PUT mode");

    //         const mode: number = args.body;

    //         const myApp = app as HeatingManagerApp;
    //         myApp.manager.operationMode = mode as OperationMode;
    //         // scheduler must be restart?

    //         callback(null, null);
    //     },
    // },
    {
        method: "GET",
        path: "/zones",
        public: !PRODUCTION,

        fn: (args: IAPIParams, callback) => {
            logger.debug("GET zones");

            const myApp = app as HeatingManagerApp;
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
            
            const myApp = app as HeatingManagerApp;
            const result = map(filter(myApp.manager.devices, d => d.class === CLASS_THERMOSTAT),
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

            const myApp = app as HeatingManagerApp;
            myApp.repsitory.replacePlans(DEFAULT_HEATING_PLAN);

            // callback follows ( err, result )
            callback(null, "Done.");
        },
    },
    {
        method: "GET",
        path: "/plans/evaluate",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("GET evaluate plans");

            const myApp = app as HeatingManagerApp;
            const result = await myApp.manager.evaluateActivePlans();

            // callback follows ( err, result )
            callback(null, result);
        },
    },  
    {
        method: "GET",
        path: "/plans",
        public: !PRODUCTION,

        fn: async (args: IAPIParams, callback) => {
            logger.debug("GET plans");

            const myApp = app as HeatingManagerApp;
            const result = await myApp.repsitory.plans;

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

    //         const myApp = app as HeatingManagerApp;
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

            const myApp = app as HeatingManagerApp;
            const result = await myApp.repsitory.find(args.params.id);

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

            const myApp = app as HeatingManagerApp;

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

            await myApp.repsitory.update(plan);

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

            const myApp = app as HeatingManagerApp;

            await myApp.repsitory.remove(args.params.id);
            callback(null, null);
        },
    },
];
