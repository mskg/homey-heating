import { LogService } from "./LogService";

let __ALLOW__CATCHALL__ = true;

export function setAllowCatchAll(state: boolean) {
    __ALLOW__CATCHALL__ = state;
}

type AnyFunc = (...args: any[]) => any;
type AnyAsyncFunc = (...args: any[]) => Promise<any>;

function checkResult(promise: boolean, val: any) {
    const isPromise = typeof val.then === "function";
    const ok = (promise && isPromise) || (!promise && !isPromise);

    if (!ok) {
        throw new Error(`Value is ${promise ? "a" : "not a"} promise, use the other log methods instead.`);
    }
}

// must not be called directly, needs wrapped this context!
function WrapSync(property: string, func: AnyFunc, catchAll: boolean, defaultValue: any) {
    // needs to be a real function to have this context
    function wrapper(...args: any[]): any {
        try {
            // wrap outer this context
            // @ts-ignore
            const result = func.apply(this, args);
            if (!__PRODUCTION__ && result != null) { checkResult(false, result); }
            return result;
        } catch (e) {
            // @ts-ignore
            if (this.logger != null) {
                // @ts-ignore
                this.logger.error(e, `Calling ${property} failed due to ${e}`);
            } else {
                LogService.default.error(e, `Calling ${property} failed due to ${e}`);
            }

            if (!catchAll) { throw e; } else { return defaultValue; }
        }
    }

    return wrapper;
}

// must not be called directly, needs wrapped this context!
function WrapAsync(property: string, func: AnyAsyncFunc, catchAll: boolean, defaultValue: any) {
    // needs to be a real function to have this context
    async function wrapper(...args: any[]): Promise<any> {
        try {
            // wrap outer this context
            // @ts-ignore
            const result = func.apply(this, args);
            if (!__PRODUCTION__) { checkResult(true, result); }
            return await result;
        } catch (e) {
            // @ts-ignore
            if (this.logger != null) {
                // @ts-ignore
                this.logger.error(e, `Calling ${property} failed due to ${e}`);
            } else {
                LogService.default.error(e, `Calling ${property} failed due to ${e}`);
            }

            if (!catchAll) { throw e; } else { return defaultValue; }
        }
    }

    return wrapper;
}

/***
 * Logs any errors to the default log and throws the exception
 * @param catchAll If true, the error is suppressed and the method returns the defaultValue
 * @param defaultValue Default value, default null
 */
export function asynctrycatchlog(catchAll = false, defaultValue: any = null) {
    return (_target: any, property: string, descriptor: PropertyDescriptor, ..._other: any[]) => {

        if (descriptor.value != null || descriptor.value !== undefined) {
            return {
                ...descriptor,

                // @ts-ignore
                value: WrapAsync.apply(this, [property, descriptor.value, catchAll && __ALLOW__CATCHALL__, defaultValue]),
            };
        }

        return {
            ...descriptor,

            // @ts-ignore
            set: WrapAsync.apply(this, [property, descriptor.set, catchAll && __ALLOW__CATCHALL__, defaultValue]),

            // @ts-ignore
            get: WrapAsync.apply(this, [property, descriptor.get, catchAll && __ALLOW__CATCHALL__, defaultValue]),
        };
    };
}

/***
 * Logs any errors to the default log and throws the exception
 * @param catchAll If true, the error is suppressed and the method returns the defaultValue
 * @param defaultValue Default value, default null
 */
export function trycatchlog(catchAll = false, defaultValue: any = null) {
    return (_target: any, property: string, descriptor: PropertyDescriptor, ..._other: any[]) => {

        if (descriptor.value != null || descriptor.value !== undefined) {
            return {
                ...descriptor,
                // @ts-ignore
                value: WrapSync.apply(this, [property, descriptor.value, catchAll && __ALLOW__CATCHALL__, defaultValue]),
            };
        }

        return {
            ...descriptor,
            // @ts-ignore
            set: WrapSync.apply(this, [property, descriptor.set, catchAll && __ALLOW__CATCHALL__, defaultValue]),
            // @ts-ignore
            get: WrapSync.apply(this, [property, descriptor.get, catchAll && __ALLOW__CATCHALL__, defaultValue]),
        };
    };
}
