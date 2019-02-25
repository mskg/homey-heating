import { Mutex } from "./Mutex";

type AnyFunc = (...args: any[]) => Promise<any>;

function Synchronize(mutex: Mutex, func: AnyFunc) {
    return function(...args: any[]): any {
        // @ts-ignore
        const self = this;

        try {
            return mutex
                .lock()
                .then((unlock) => func
                    .apply(self, args)
                    .finally(() => unlock()));
        } catch (e) {
            return Promise.reject(e);
        }
    };
}

/**
 * Synchronizes all calls to the given function
 * @param mutex If no mutex is given a new Mutex is created implicitly
 */
export function synchronize(mutex?: Mutex) {
    if (mutex == null) { mutex = new Mutex(); }

    return (_target: any, _property: string, descriptor: PropertyDescriptor, ..._other: any[]) => {

        if (descriptor.value != null) {
            return {
                ...descriptor,

                // @ts-ignore
                value: Synchronize.apply(this, [mutex, descriptor.value]),
            };
        }

        return {
            ...descriptor,

            // we do not decorate the setter as this makes no sense here
            // set: Synchronize.apply(this, [mutex, descriptor.set]),

            // @ts-ignore
            get: Synchronize.apply(this, [mutex, descriptor.get]),
        };
    };
}
