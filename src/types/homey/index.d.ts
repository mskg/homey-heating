import { EventEmitter } from "events";
import { string } from "prop-types";
import "./test";

declare module "homey" {
    type EventHandler<T> = (param: T) => void;

    export function __(name: string, args?: { [key: string]: string | undefined } | undefined): string;

    // https://apps.developer.athom.com/tutorial-App%20Store.html
    export const env: {
        [key: string]: string
    };

    export class Notification {
        constructor(a: {
            excerpt: string
        });

        public register(): Promise<void>;
    }

    export class FlowArgument {
        registerAutocompleteListener(func: (query: string, args: any) => Promise<Array<{id: string, name: string}>>): FlowArgument;
    }

    export class FlowCard {
        constructor(id: string);

        getArgument(name: string): FlowArgument;
        getArgumentValues<T>(): Promise<T>;
        register<T extends FlowCard>(): T;
        registerRunListener<T extends FlowCard>(func: (args: any, state: any) => Promise<boolean>): T;
        unregister(): void;

        on(s: "update", cb: EventHandler<void>): void
    }

    export class Image {

    }

    export class FlowToken<T extends string | boolean | number | Image> {
        constructor(id: string, args: { type: "string" | "boolean" | "number" | "Image", title: string});
        public register(): Promise<void>;
        public setValue(arg: T): void;
    }


    export class FlowCardTrigger<T, S> extends FlowCard {
        trigger(tokens: T, state: S): Promise<void>;
    }

    export class FlowCardTriggerDevice<T = void, S = void> extends FlowCard /* FlowCardTrigger */ {
        trigger(device: Device, tokens: T, state: S): Promise<void>;
    }


    export class FlowCardAction extends FlowCard {
    }

    export class Driver {
        public onInit(): void | Promise<void>;
    }

    export class CronTask extends EventEmitter {
        // on(s: "run", cb: EventHandler<any>);
    }

    export module ManagerCron {
        export function unregisterAllTasks(): Promise<void>;
        export function registerTask(name: string, next: Date, data?: any): Promise<CronTask>;
        export function getTask(name: string): Promise<CronTask>;
        // export function on(s: string, cb: EventHandler<any>);
    }

    export type AllowedSetting = boolean | string | number;
    export module ManagerSettings {
        export function set(key: string, val: AllowedSetting): void;
        export function unset(key: string): void;
        export function getKeys(): string[];
        export function get<T extends AllowedSetting>(key: string): T | undefined;

        export function on(s: "set", cb: EventHandler<string>): void;
        export function on(s: "unset", cb: EventHandler<string>): void;
    }

    export class Device {
        public onInit(): void | Promise<void>;
        public onDeleted(): void | Promise<void>;

        protected getCapabilities(): string[];

        protected getStoreValue<T extends number | string | boolean>(key: string): T;
        protected setStoreValue<T extends number | string | boolean>(key: string, val: T): Promise<void>;

        protected getClass(): string;
        protected getName(): string;
        protected getAvailable(): boolean;
        protected setAvailable(): Promise<void>;
        protected setUnavailable(message?: string): Promise<void>;
        protected setWarning(message: string): Promise<void>;
        protected unsetWarning(): Promise<void>;
        protected getData<T>(): T;

        protected getCapabilityValue<T>(id: string): T;
        protected setCapabilityValue<T>(id: string, val: T): Promise<void>;
        protected registerCapabilityListener<V, O = {}>(capability: string, callback: (value: V, opts: O) => Promise<void>): Promise<void>;
    }

    export class App {
        public onInit(): void | Promise<void>;
    }
}
