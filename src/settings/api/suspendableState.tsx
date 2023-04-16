import React, { Dispatch, SetStateAction, useEffect } from "react";

export type MapType = { [key: string]: any };

export type HookSetType<T> = Dispatch<SetStateAction<T>>;
export type HookReturnType = () => void;
export type ProvideState<T extends MapType> = (provideState?: boolean, provideFailed?: boolean) => T;

type Async<T> = () => Promise<T>;

/***
 * Call the apiMethod asynchronously.
 *
 * If the method fails, throw the exception inside set SetStateAction of the hook.
 * This allows to catch the error "in the ErrorBoundary."
 */
async function tryMethod<T>(apiMethod: () => Promise<T>, setStateAction: Dispatch<SetStateAction<T>>): Promise<void> {
    try {
        setStateAction(await apiMethod());
        // await (new Promise(resolve => setTimeout(resolve, 1000)));
    } catch (e) {
        // required for the error to popup the hierarchy
        setStateAction(() => { throw e; });
    }
}

const cache = new Map<string, any>();
const LOADING: any = "Loading...";

/**
 * Create a "hook" that is able to suspend.
 *
 * @param name Must be unique
 * @param method The async method to wait for
 */
export function useSuspendableState<T extends MapType>(name: string, method: Async<any>): ProvideState<T> {
    return (provideState = false, provideFailed = false) => {
        // this is imporant as it sets the state after the promise resolves
        const val = cache.get(name);
        let [state, setState] = [null, null];

        if (provideState) {
            // we use instance compare on LOADING to determine non existing value
            // @ts-ignore
            [state, setState] = React.useState<any>(val !== LOADING ? val : null);
        }

        const [failed, setFailed] = React.useState(false);

        function loadValue(force: boolean = false) {
            if (val == null || val === LOADING || force) {
                cache.set(name, LOADING);

                // this unloads the component and waits for the promise to resolve
                throw tryMethod(
                    method,
                    (r) => {
                        if (typeof r === "function") {
                            cache.set(name, (r as any)(cache.get(name)));
                        } else {
                            cache.set(name, r);
                        }
                    }).catch((e) => {
                        if (!provideFailed) {
                            // check me - this doesn't work
                            setFailed(() => { throw e; });
                        } else {
                            setFailed(true);
                        }
                    });
            }
        }

        loadValue();

        useEffect(() => {
            return () => {
                cache.delete(name);
            };
        }, []);

        // we tell the DEV that this is not the way to go
        function failOnNoState() {
            if (!__PRODUCTION__) {
                throw new Error(`You must use hooks to save the value ${name}`);
            }
        }

        return {
            [name]: provideState ? state : val,
            [`set${name.charAt(0).toUpperCase() + name.slice(1)}`]: provideState ? setState : failOnNoState,
            [`load${name.charAt(0).toUpperCase() + name.slice(1)}`]: loadValue,
            [`load${name.charAt(0).toUpperCase() + name.slice(1)}Failed`]: failed,
        } as T;
    };
}
