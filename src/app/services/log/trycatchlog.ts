import { LogService } from "./LogService";

let __ALLOW__CATCHALL__ = true;

export function setAllowCatchAll(state: boolean) {
    __ALLOW__CATCHALL__ = state;
}

type AnyFunc = (...args: any[]) => any;

function isPromise(o: any) {
    return o != null && typeof o.then === "function";
}

function handleError(property: string, catchAll: boolean, defaultValue: any, async: boolean, e: any): any | void {
    // @ts-ignore
    if (this.logger != null) {
        // @ts-ignore
        this.logger.error(e, `Calling ${property} failed due to ${e}`);
    } else {
        LogService.default.error(e, `Calling ${property} failed due to ${e}`);
    }

    if (catchAll && __ALLOW__CATCHALL__) {
        return async ? Promise.resolve(defaultValue) : defaultValue;
    } else {
        if (async) {
            return Promise.reject(e);
        } else {
            throw e;
        }
    }
}

// must not be called directly, needs wrapped this context!
function CatchErrors(property: string, func: AnyFunc, catchAll: boolean, defaultValue: any): AnyFunc {
    // needs to have this context
    return function(...args: any[]): any {
        try {
            // @ts-ignore
            const result = func.apply(this, args);
            if (!isPromise(result)) { return result; }

            // @ts-ignore
            return (result as Promise<any>).catch(handleError.bind(this, property, catchAll, defaultValue, true));
        } catch (e) {
            // @ts-ignore
            return handleError.call(this, property, catchAll, defaultValue, false, e);
        }
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
                value: CatchErrors.apply(this, [property, descriptor.value, catchAll, defaultValue]),
            };
        }

        return {
            ...descriptor,

            // @ts-ignore
            set: CatchErrors.apply(this, [property, descriptor.set, catchAll, defaultValue]),

            // @ts-ignore
            get: CatchErrors.apply(this, [property, descriptor.get, catchAll, defaultValue]),
        };
    };
}
