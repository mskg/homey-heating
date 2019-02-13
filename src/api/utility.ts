import { IHeatingDevice, IHeatingZone } from "@app/model";
import { DeviceManagerService } from "@app/services";
import { map } from "lodash";
import { injectable } from "tsyringe";
import { ApiBase } from "./types";

@injectable()
class GetZones extends ApiBase {
    constructor(private manager: DeviceManagerService) {
        super("GET", "/zones");
    }

    protected async execute() {
        const result = map(this.manager.zones,
            (z) => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.icon,
                } as IHeatingZone;
            },
        );

        return result;
    }
}

@injectable()
class GetDevices extends ApiBase {
    constructor(private manager: DeviceManagerService) {
        super("GET", "/devices");
    }

    protected async execute() {
        const result = map(this.manager.devices,
            (z) => {
                return {
                    id: z.id,
                    name: z.name,
                    icon: z.iconObj && z.iconObj.url,
                } as IHeatingDevice;
            },
        );

        return result;
    }
}

export default [
    GetDevices,
    GetZones,
];
