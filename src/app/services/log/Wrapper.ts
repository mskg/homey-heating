import { LogService } from "./LogService";

let __ALLOW__CATCHALL__ = true;

export function setAllowCatchAll(state: boolean) {
    __ALLOW__CATCHALL__ = state;
}

type AnyFunc = (...args) => any;
type AnyAsyncFunc = (...args) => Promise<any>;

function checkResult(promise, val) {
    const isPromise = typeof val.then === "function";
    const ok = (promise && isPromise) || (!promise && !isPromise);

    if (!ok) {
        throw new Error(`Value is ${promise ? "a" : "not a"} promise, use the other log methods instead.`);
    }
}

// must not be called directly, needs wrapped this context!
function WrapSync(property: string, func: AnyFunc, catchAll: boolean, defaultValue: any) {
    // needs to be a real function to have this context
    function wrapper(...args) {
        try {
            // wrap outer this context
            const result = func.apply(this, args);
            if (!__PRODUCTION__ && result != null) { checkResult(false, result); }
            return result;
        } catch (e) {
            if (this.logger != null) {
                this.logger.error(`Calling ${property} failed due to ${e}`, e);
            } else {
                LogService.defaultLog.error(`Calling ${property} failed due to ${e}`, e);
            }

            if (!catchAll) { throw e; } else { return defaultValue; }
        }
    }

    return wrapper;
}

// must not be called directly, needs wrapped this context!
function WrapAsync(property: string, func: AnyAsyncFunc, catchAll: boolean, defaultValue: any) {
    // needs to be a real function to have this context
    async function wrapper(...args) {
        try {
            // wrap outer this context
            const result = func.apply(this, args);
            if (!__PRODUCTION__) { checkResult(true, result); }
            return await result;
        } catch (e) {
            if (this.logger != null) {
                this.logger.error(`Calling ${property} failed due to ${e}`, e);
            } else {
                LogService.defaultLog.error(`Calling ${property} failed due to ${e}`, e);
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
export function asynctrycatchlog(catchAll = false, defaultValue = null) {
    return (target, property, descriptor: PropertyDescriptor, ...other) => {

        if (descriptor.value != null || descriptor.value !== undefined) {
            return {
                ...descriptor,
                value: WrapAsync.apply(this, [property, descriptor.value, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
            };
        }

        return {
            ...descriptor,
            set: WrapAsync.apply(this, [property, descriptor.set, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
            get: WrapAsync.apply(this, [property, descriptor.get, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
        };
    };
}

/***
 * Logs any errors to the default log and throws the exception
 * @param catchAll If true, the error is suppressed and the method returns the defaultValue
 * @param defaultValue Default value, default null
 */
export function trycatchlog(catchAll = false, defaultValue = null) {
    return (target, property, descriptor: PropertyDescriptor, ...other) => {

        if (descriptor.value != null || descriptor.value !== undefined) {
            return {
                ...descriptor,
                value: WrapSync.apply(this, [property, descriptor.value, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
            };
        }

        return {
            ...descriptor,
            set: WrapSync.apply(this, [property, descriptor.set, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
            get: WrapSync.apply(this, [property, descriptor.get, catchAll && !__ALLOW__CATCHALL__, defaultValue]),
        };
    };
}
