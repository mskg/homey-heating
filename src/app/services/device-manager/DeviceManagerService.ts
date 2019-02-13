import { filter } from "lodash";
import { singleton } from "tsyringe";
import { HomeyAPIService, ICapabilityInstance, IDevice, IHomeyAPI, IZone, MEASURE_TEMPERATURE, StringHashMap, TARGET_TEMPERATURE } from "../homey-api";
import { ILogger, LoggerFactory, asynctrycatchlog, trycatchlog } from "../log";

export type AuditedDevice = {
    watchedCapabilities?: {
        targetTemperature?: ICapabilityInstance<number>;
        temperature?: ICapabilityInstance<number>;
    }
} & IDevice;

export const CanSetTargetTemperature = (device: IDevice): boolean => 
    device.capabilities != null ? device.capabilities.find(c => c === TARGET_TEMPERATURE) != null : false;

export const  CanMeasureTemperature = (device: IDevice): boolean => 
    device.capabilities != null ? device.capabilities.find(c => c === MEASURE_TEMPERATURE) != null : false;

@singleton()
export class DeviceManagerService {
    private initialized: boolean = false;
    
    private deviceList: StringHashMap<AuditedDevice>;
    private zoneList: StringHashMap<IZone>;

    private logger: ILogger;
    private homeyApi: IHomeyAPI;

    constructor(
        private apiService: HomeyAPIService, 
        loggerFactory: LoggerFactory) {

        this.logger = loggerFactory.createLogger("AthomAPI");        
    }

    public get zones(): StringHashMap<IZone> {
        return this.zoneList || {};
    }

    public get devices(): StringHashMap<AuditedDevice> {
        return this.deviceList || {};
    }

    // mask all errors
    @asynctrycatchlog(true)
    private async attachWatchers(device: AuditedDevice) {
        if (device.watchedCapabilities == null) {
            device.watchedCapabilities = {};
        }

        if (device.watchedCapabilities.targetTemperature == null) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${TARGET_TEMPERATURE}`);

            device.watchedCapabilities.targetTemperature =  await device.makeCapabilityInstance<number>(TARGET_TEMPERATURE, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${TARGET_TEMPERATURE} to ${evt}`);
            });
        }

        if (device.watchedCapabilities.temperature == null && CanMeasureTemperature(device)) {
            this.logger.information(`Listening on ${device.id} (${device.name}) ${MEASURE_TEMPERATURE}`);

            device.watchedCapabilities.temperature = await device.makeCapabilityInstance<number>(MEASURE_TEMPERATURE, (evt) => {
                this.logger.debug(`${device.name} (${device.id}) changed ${MEASURE_TEMPERATURE} to ${evt}`);
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

    // only called from one place -> needs no error handling, no workarround
    public async init() {
        // safety
        if (this.initialized) { return; }

        this.logger.information(`Init`);
        this.homeyApi = await this.apiService.getInstance();

        const filteredDevices = filter(await this.homeyApi.devices.getDevices(), d => CanSetTargetTemperature(d));

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
            if (!CanSetTargetTemperature(device)) {
                this.logger.information(`Device ${device.id} was created but cannot set temperature -> ignored`);
                return;
            }

            this.logger.debug(`Device ${device.id} was created.`);
            this.deviceList[device.id] = device;
            await this.attachWatchers(device);
        });

        this.homeyApi.devices.on("device.update", async (device: IDevice) => {
            var oldDevice = this.deviceList[device.id];
            if (oldDevice != null) {
                await this.destroyWatchers(oldDevice);
            }

            if (!CanSetTargetTemperature(device)) {
                this.logger.information(`Device ${device.id} was updated but cannot set temperature -> ignored`);
                delete this.deviceList[device.id];

                return;
            }

            this.logger.debug(`Device ${device.id} was updated.`);        
            await this.attachWatchers(device);
            this.deviceList[device.id] = device;
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

        this.initialized = true;
    }
     
    public findZone(zoneId: string): IZone {
        return this.zoneList[zoneId];
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    public getTargetTemperature(d: AuditedDevice): number {
        var capability = d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    // mask, default is 0 - no change in logic
    @trycatchlog(true, 0)
    public getMeasuredTemperature(d: AuditedDevice): number {
        var capability = d.watchedCapabilities.temperature || d.watchedCapabilities.targetTemperature;
        return capability != null ? capability.value : 0;
    }

    // catched by all calling parties, no need to double
    public async setTargetTemperature(d: AuditedDevice, targetTemperature: number) {
        let target = targetTemperature;
        
        const cap = d.watchedCapabilities.targetTemperature;
        if (cap != null) {
            if (target > cap.max) {
                target = cap.max;
            }
            else if (target < cap.min) {
                target = cap.min;
            }
            else {
                // adjust fraction
                if (cap.step == 0) target = Math.round(target);
                else target = Math.round(target / cap.step) * cap.step;                
            }

            if (targetTemperature != target) {
                this.logger.information(`Target adjusted ${d.name} (${d.name}) was ${targetTemperature} -> ${target} (min: ${cap.min}, max: ${cap.max}, step: ${cap.step})`);
            }
        }

        await this.homeyApi.devices.setCapabilityValue({
            deviceId: d.id,
            capabilityId: TARGET_TEMPERATURE,
            value: target
        });
    }

    public findDevice(deviceId: string): AuditedDevice {
        return (this.deviceList || [])[deviceId];
    }

    public getDevicesForZone(zoneId: string): AuditedDevice[] {
        return filter(this.deviceList || [], (d: AuditedDevice) => d.zone === zoneId) as AuditedDevice[];
    }
}
