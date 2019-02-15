import React, { Dispatch, SetStateAction, useEffect } from "react";

export type MapType = {[key: string]: any};

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
    } catch (e) {
        // required for the error to popup the hierarchy
        setStateAction((t) => { throw e; });
    }
}

const cache = new Map<string, any>();
const LOADING = "Loading...";

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
            [state, setState] = React.useState(val !== LOADING ? val : null);
        }

        const [failed, setFailed] = React.useState(false);

        loadValue();

        function loadValue() {
            if (cache.get(name) == null) {
                cache.set(name, LOADING);

                // this unloads the component and waits for the promise to resolve
                throw tryMethod(method, (r) => {
                    if (typeof r === "function") {
                        cache.set(name, (r as any)(cache.get(name)));
                    } else {
                        cache.set(name, r);
                    }
                }).catch((e) => {
                    if (!provideFailed) {
                        // console.error(e);
                        // check me - this doesn't work
                        setFailed(() => { throw e; });
                    } else {
                        setFailed(true);
                    }
                });
            }
        }

        useEffect(() => {
            // console.log("killed value");
            return () => { cache.delete(name); };
        }, []);

        // we tell the DEV that this is not the way to go
        function failOnNoState() {
            if (!PRODUCTION) {
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
