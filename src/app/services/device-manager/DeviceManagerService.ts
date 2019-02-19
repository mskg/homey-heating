import { filter } from "lodash";
import { EventDispatcher, IEvent } from "ste-events";
import { singleton } from "tsyringe";
import { CapabilityType, HomeyAPI, HomeyAPIService, ICapabilityInstance, IDevice, IZone, StringHashMap } from "../homey-api";
import { asynctrycatchlog, ILogger, LoggerFactory, trycatchlog } from "../log";

export type AuditedDevice = {
    watchedCapabilities?: {
        targetTemperature?: ICapabilityInstance<number>;
        temperature?: ICapabilityInstance<number>;
    },
} & IDevice;

export const VirtualDevice = (device: IDevice): boolean => {
    return device.driverUri.match(/app\.mskg\.homey\-heating/ig) != null;
};

export const CanSetTargetTemperature = (device: IDevice): boolean =>
    device.capabilities != null
        ? device.capabilities.find((c) => c === CapabilityType.TargetTemperature) != null
        : false;

export const CanMeasureTemperature = (device: IDevice): boolean =>
    device.capabilities != null ? device.capabilities.find((c) => c === CapabilityType.MeasureTemperature) != null : false;

export type CapabilityChangedEventArgs =
    // | { device: IDevice, capability: CapabilityType.OnOff, value: boolean }
    | { device: IDevice, capability: CapabilityType.TargetTemperature, value: number }
    | { device: IDevice, capability: CapabilityType.MeasureTemperature, value: number };

@singleton()
export class DeviceManagerService {

    public get zones(): StringHashMap<IZone> {
        return this.zoneList || {};
    }

    public get devices(): StringHashMap<AuditedDevice> {
        return this.deviceList || {};
    }

    public get onCapabilityChanged(): IEvent<DeviceManagerService, CapabilityChangedEventArgs> {
        return this.onCapabilityChangedDispatcher.asEvent();
    }

    private onCapabilityChangedDispatcher = new EventDispatcher<DeviceManagerService, CapabilityChangedEventArgs>();

    private deviceList: StringHashMap<AuditedDevice>;
    private zoneList: StringHashMap<IZone>;

    private logger: ILogger;
    private homeyApi: HomeyAPI;

    constructor(
        private apiService: HomeyAPIService,
        loggerFactory: LoggerFactory) {

        this.logger = loggerFactory.createLogger("AthomAPI");
    }

    // only called from one place -> needs no error handling, no workarround
    public async init() {
        this.logger.information(`Init`);
        this.homeyApi = await this.apiService.getInstance();

        const filteredDevices = filter(await this.homeyApi.devices.getDevices(),
            (d) => !VirtualDevice(d) && CanSetTargetTemperature(d));

        this.logger.information(`Found ${filteredDevices.length} devices`);
        this.deviceList = {};

        // register listeners
        await Promise.all(filteredDevices.map(async (d) => {
            await this.attachWatchers(d);
            this.deviceList[d.id] = d;
        }));

        this.zoneList = await this.homeyApi.zones.getZones();
        this.logger.information(`Found ${Object.keys(this.zoneList).length} zones`);

        this.homeyApi.devices.on("device.create", async (device: IDevice) => {
            if (VirtualDevice(device) || !CanSetTargetTemperature(device)) {
                this.logger.information(`Device ${device.id} was created but cannot set temperature -> ignored`);
                return;
            }

            this.logger.debug(`Device ${device.id} was created.`);

            // updated device does not support capabilityinstance?
            const refetch = await this.homeyApi.devices.getDevice({ id: device.id }) as AuditedDevice;

            this.deviceList[device.id] = refetch;
            await this.attachWatchers(refetch);
        });

        this.homeyApi.devices.on("device.update", async (device: IDevice) => {
            const oldDevice = this.deviceList[device.id];
            if (oldDevice != null) {
                await this.destroyWatchers(oldDevice);
            }

            if (VirtualDevice(device) || !CanSetTargetTemperature(device)) {
                this.logger.information(`Device ${device.id} was updated but cannot set temperature -> ignored`);
                delete this.deviceList[device.id];

                return;
            }

            this.logger.debug(`Device ${device.id} was updated.`);

            // updated device does not support capabilityinstance?
            const refetch = await this.homeyApi.devices.getDevice({ id: device.id }) as AuditedDevice;

            this.deviceList[device.id] = refetch;
            await this.attachWatchers(refetch);
        });

        this.homeyApi.devices.on("device.delete", async (device: IDevice) => {
            this.logger.debug(`Device ${device.id} was removed.`);
            await this.destroyWatchers(this.deviceList[device.id]);
            delete this.deviceList[device.id];
        });

        this.homeyApi.zones.on("zone.create", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was created.`);
            this.zoneList[zone.id] = zone;
        });

        this.homeyApi.zones.on("zone.update", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was updated.`);
            this.zoneList[zone.id] = zone;
        });

        this.homeyApi.zones.on("zone.delete", (zone: IZone) => {
            this.logger.debug(`Zone ${zone.id} was removed.`);
            delete this.zoneList[zone.id];
        });
    }

    public findZone(zoneId: string): IZone {
        return this.zoneList[zoneId];
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    public getTargetTemperature(d: AuditedDevice): number {
        const capability = d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    public getMeasuredTemperature(d: AuditedDevice): number {
        const capability = d.watchedCapabilities.temperature || d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    // catched by all calling parties, no need to double
    public async setTargetTemperature(d: AuditedDevice, targetTemperature: number) {
        let target = targetTemperature;

        try {
            const cap = d.watchedCapabilities.targetTemperature;
            if (cap != null) {
                if (target > cap.max) {
                    target = cap.max;
                } else if (target < cap.min) {
                    target = cap.min;
                } else {
                    if (cap.step != null && typeof cap.step === "number") {
                        // adjust fraction
                        // tslint:disable: one-line
                        if (cap.step === 0) { target = Math.round(target); }
                        else { target = Math.round(target / cap.step) * cap.step; }
                    }
                }

                if (targetTemperature !== target) {
                    this.logger.information(`Target adjusted ${d.name} (${d.name}) was ${targetTemperature} -> ${target} (min: ${cap.min}, max: ${cap.max}, step: ${cap.step})`);
                }
            }
        } catch (e) {
            this.logger.error(e, `Failed to adust temperature from ${targetTemperature}`);
        }

        await this.homeyApi.devices.setCapabilityValue({
            deviceId: d.id,
            capabilityId: CapabilityType.TargetTemperature,
            value: target,
        });
    }

    public findDevice(deviceId: string): AuditedDevice {
        return (this.deviceList || [])[deviceId];
    }

    public getDevicesForZone(zoneId: string): AuditedDevice[] {
        return filter(this.deviceList || [], (d: AuditedDevice) => d.zone === zoneId) as AuditedDevice[];
    }

    // mask all errors
    @asynctrycatchlog(true)
    private async attachWatchers(device: AuditedDevice) {
        if (device.watchedCapabilities == null) {
            device.watchedCapabilities = {};
        }

        if (device.watchedCapabilities.targetTemperature == null) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${CapabilityType.TargetTemperature}`);

            device.watchedCapabilities.targetTemperature = await device.makeCapabilityInstance<number>(CapabilityType.TargetTemperature, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${CapabilityType.TargetTemperature} to ${evt}`);

                this.onCapabilityChangedDispatcher.dispatch(this, {
                    capability: CapabilityType.TargetTemperature,
                    device,
                    value: evt as unknown as number,
                });
            });
        }

        if (device.watchedCapabilities.temperature == null && CanMeasureTemperature(device)) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${CapabilityType.MeasureTemperature}`);

            device.watchedCapabilities.temperature = await device.makeCapabilityInstance<number>(CapabilityType.MeasureTemperature, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${CapabilityType.MeasureTemperature} to ${evt}`);

                this.onCapabilityChangedDispatcher.dispatch(this, {
                    capability: CapabilityType.MeasureTemperature,
                    device,
                    value: evt as unknown as number,
                });
            });
        }
    }

    // mask all errors
    @asynctrycatchlog(true)
    private async destroyWatchers(device: AuditedDevice) {
        if (device != null && device.watchedCapabilities != null) {
            if (device.watchedCapabilities.targetTemperature != null) {
                device.watchedCapabilities.targetTemperature.destroy();
            }

            if (device.watchedCapabilities.temperature != null) {
                device.watchedCapabilities.temperature.destroy();
            }
        }
    }
}
