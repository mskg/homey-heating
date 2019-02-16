import { EventEmitter } from "events";

declare module "homey" {
    type EventHandler<T> = (param: T) => void;

    export function __(name: string, args?: { [key: string]: string });

    export class Notification {
        constructor({
            excerpt: string
        });

        public register();
    }

    export class FlowCardAction {
        constructor(name: string);
        register(): FlowCardAction;
        registerRunListener(func: (args, state) => Promise<boolean>);
    }

    export class Driver {
        public onInit(): void | Promise<void>;
    }

    export class CronTask extends EventEmitter {
        // on(s: "run", cb: EventHandler<any>); 
    }

    export module ManagerCron {
        export function unregisterAllTasks(): Promise<void>;
        export function registerTask(name: string, next: Date, data: any): Promise<CronTask>;
    }

    export type AllowedSetting = boolean | string | number;
    export module ManagerSettings {
        export function set(key: string, val: AllowedSetting);
        export function unset(key: string);
        export function getKeys(): string[];
        export function get<T extends AllowedSetting>(key: string): T;

        export function on(s: "set", cb: EventHandler<string>);
        export function on(s: "unset", cb: EventHandler<string>);
    }

    export class Device {
        public onInit(): void | Promise<void>;

        protected getClass(): string;
        protected getName(): string;
        protected getAvailable(): boolean;
        protected setAvailable(): Promise<void>;
        protected setUnavailable(): Promise<void>;
        protected getData<T>(): T;
        protected setCapabilityValue<T>(id: string, val: T): Promise<void>;
        protected registerCapabilityListener<V, O = {}>(capability: string, callback: (value: V, opts: O) => Promise<void>);
    }

    export class App {
        public onInit(): void | Promise<void>;
    }
}
