import { map } from "lodash";
import { IHeatingZone, IHeatingDevice } from "../app/model";
import { ApiBase } from "./types";

class GetZones extends ApiBase {
    constructor() {
        super("GET", "/zones");
    }

    public fn(args, callback) {
        this.logger.debug("GET zones");

        const result = map(this.myApp.manager.zones,
            z => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.icon,
                } as IHeatingZone
            }
        );

        callback(null, result);
    }
}

class GetDevices extends ApiBase {
    constructor() {
        super("GET", "/devices");
    }

    public fn(args, callback) {
        this.logger.debug("GET devices");

        const result = map(this.myApp.manager.devices,
            z => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.iconObj && z.iconObj.url,
                } as IHeatingDevice
            }
        );

        callback(null, result);
    }
}

export default [
    new GetDevices(),
    new GetZones()
];