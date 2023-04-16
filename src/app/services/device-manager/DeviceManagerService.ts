import { Mutex, synchronize } from "@app/helper";
import { App as HomeyApp } from "homey";
import { filter, keys } from "lodash";
import { EventDispatcher, IEvent } from "ste-events";
import { singleton } from "tsyringe";
import { CapabilityType, HomeyAPIService, ICapabilityInstance, IDevice, IZone, StableHomeyAPI, StringHashMap} from "../homey-api";
import { ILogger, LoggerFactory, trycatchlog } from "../log";
import { InternalSettings, SettingsManagerService } from "../settings-manager";

export type AuditedDevice = {
    watchedCapabilities?: {
        targetTemperature?: ICapabilityInstance<number>;
        temperature?: ICapabilityInstance<number>;
    },
} & IDevice;

export function VirtualDevice(device: IDevice): boolean {
    return device.driverUri.match(/app\.mskg\.homey\-heating/ig) != null;
}

export function CanSetTargetTemperature(device: IDevice): boolean {
    return device.capabilities != null
        ? device.capabilities.find((c) => c === CapabilityType.TargetTemperature) != null
        : false;
}

export function CanMeasureTemperature(device: IDevice): boolean {
    return device.capabilities != null
        ? device.capabilities.find((c) => c === CapabilityType.MeasureTemperature) != null
        : false;
}

export type CapabilityChangedEventArgs =
    // | { device: IDevice, capability: CapabilityType.OnOff, value: boolean }
    | { device: IDevice, capability: CapabilityType.TargetTemperature, value: number }
    | { device: IDevice, capability: CapabilityType.MeasureTemperature, value: number };

@singleton()
export class DeviceManagerService {
    private static Lock = new Mutex();

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

    private deviceList!: StringHashMap<AuditedDevice>;
    private zoneList!: StringHashMap<IZone>;
    private homeyApi!: StableHomeyAPI;

    private logger: ILogger;

    constructor(
        private apiService: HomeyAPIService,
        private settings: SettingsManagerService,
        loggerFactory: LoggerFactory) {

        this.logger = loggerFactory.createLogger("AthomAPI");
    }

    // only called from one place -> needs no error handling, no workarround
    public async init(app: HomeyApp) {
        this.logger.information(`Init`);
        this.homeyApi = await this.apiService.getInstance(app.homey);

        this.deviceList = {};

        const result = await Promise.all([
            this.initDeviceHooks(false),
            this.initGlobalHooks(),
        ]);

        // retry init again after 2 minutes
        if (!result[0]) {
            const rebind = setTimeout(this.backgroundTimer.bind(this), 60 * 2 * 1000);
            rebind.unref();
        }

        const timer = setInterval(
            this.backgroundTimer.bind(this),
            this.settings.get<number>(InternalSettings.DeviceUpdateInterval, 60 * 60 * 1000),
        );

        // don't block main thread
        timer.unref();
    }

    public findZone(zoneId: string): IZone {
        return this.zoneList[zoneId];
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    @synchronize(DeviceManagerService.Lock)
    public async getTargetTemperature(d: AuditedDevice): Promise<number> {
        const capability = d.watchedCapabilities != null
            ? d.watchedCapabilities.targetTemperature
            : null;

        return capability != null ? capability.value as unknown as number : 0;
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    @synchronize(DeviceManagerService.Lock)
    public async getMeasuredTemperature(d: AuditedDevice): Promise<number> {
        const capability = d.watchedCapabilities != null
            ? (d.watchedCapabilities.temperature || d.watchedCapabilities.targetTemperature)
            : null;

        return capability != null ? capability.value as unknown as number : 0;
    }

    // catched by all calling parties, no need to double
    @synchronize(DeviceManagerService.Lock)
    public async setTargetTemperature(d: AuditedDevice, targetTemperature: number) {
        let target = targetTemperature;

        if (!d.available || !d.ready) {
            this.logger.information(`Device ${d.id} is ready: ${d.ready}, available: ${d.available}, skipping setTargetTemperature`);
            return;
        }

        try {
            const cap = d.watchedCapabilities != null ? d.watchedCapabilities.targetTemperature : null;

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
            capabilityId: CapabilityType.TargetTemperature,
            deviceId: d.id,
            value: target,
            opts: undefined,
            transactionId: undefined,
        });
    }

    public findDevice(deviceId: string): AuditedDevice {
        return (this.deviceList || {})[deviceId];
    }

    public getDevicesForZone(zoneId: string): AuditedDevice[] {
        return filter(this.deviceList || [], (d: AuditedDevice) => d.zone === zoneId) as AuditedDevice[];
    }

    @trycatchlog(true)
    private async backgroundTimer() {
        this.logger.information(`backgroundTimer`);
        this.initDeviceHooks(true);

        // should we now push updates for all devices?
    }

    /**
     * Attach watchers for device activities
     * @returns true if all devic listeners could be bound
     */
    @synchronize(DeviceManagerService.Lock)
    private async initDeviceHooks(reset: boolean): Promise<boolean> {
        this.logger.information(`INIT device hooks`);

        const filteredDevices = filter(await this.homeyApi.devices.getDevices(),
            (d) => !VirtualDevice(d) && CanSetTargetTemperature(d));

        this.logger.information(`Found ${filteredDevices.length} devices`);

        // register listeners
        const allOk = await Promise.all(filteredDevices.map(async (d) => {
            if (reset && this.deviceList[d.id] != null) {
                await this.destroyWatchers(this.deviceList[d.id]);
            }

            const result = await this.attachWatchers(d);
            this.deviceList[d.id] = d;

            return result;
        }));

        const removals = keys(this.deviceList).filter((id) => filteredDevices.find((d) => id === d.id) == null);
        this.logger.debug(`Found ${removals.length} removals`);

        await Promise.all(removals.map(async (id) => {
            await this.destroyWatchers(this.deviceList[id]);
            delete this.deviceList[id];
        }));

        // @ts-ignore API wrong
        this.zoneList = await this.homeyApi.zones.getZones();
        this.logger.information(`Found ${Object.keys(this.zoneList).length} zones`);

        return allOk.find((ok) => !ok) == null;
    }

    /**
     * Init global hooks
     */
    private initGlobalHooks() {
        this.logger.information(`INIT global hooks`);

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

    // mask all errors
    @trycatchlog(true, false)
    private async attachWatchers(device: AuditedDevice): Promise<boolean> {
        if (device.watchedCapabilities == null) {
            device.watchedCapabilities = {};
        }

        if (device.watchedCapabilities.targetTemperature == null) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${CapabilityType.TargetTemperature}`);

            device.watchedCapabilities.targetTemperature = await device.makeCapabilityInstance(CapabilityType.TargetTemperature, (evt) => {
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

            device.watchedCapabilities.temperature = await device.makeCapabilityInstance(CapabilityType.MeasureTemperature, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${CapabilityType.MeasureTemperature} to ${evt}`);

                this.onCapabilityChangedDispatcher.dispatch(this, {
                    capability: CapabilityType.MeasureTemperature,
                    device,
                    value: evt as unknown as number,
                });
            });
        }

        return true;
    }

    // mask all errors
    @trycatchlog(true, false)
    private async destroyWatchers(device: AuditedDevice) {
        let result = true;

        if (device != null && device.watchedCapabilities != null) {
            if (device.watchedCapabilities.targetTemperature != null) {
                this.logger.debug(`Cleaning watch on ${device.id} (${device.name}) ${CapabilityType.TargetTemperature}`);

                try {
                    device.watchedCapabilities.targetTemperature.destroy();
                }
                catch { result = false; }

                device.watchedCapabilities.targetTemperature = undefined;
            }

            if (device.watchedCapabilities.temperature != null) {
                this.logger.debug(`Cleaning watch on ${device.id} (${device.name}) ${CapabilityType.MeasureTemperature}`);

                try {
                    device.watchedCapabilities.temperature.destroy();
                }
                catch { result = false; }

                device.watchedCapabilities.temperature = undefined;
            }
        }

        return result;
    }
}
