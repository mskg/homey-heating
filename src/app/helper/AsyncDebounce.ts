type AnyArgsFunc<T> = (...args: any[]) => Promise<T>;

/**
 * Debounces the async function by ms
 *
 * @param functionToDebounce it
 * @param wait in ms
 * @param leading true, if you want the first result
 */
export function AsyncDebounce<T>(functionToDebounce: AnyArgsFunc<T>, wait: number, leading = false): AnyArgsFunc<T> {
    let resolvers = [];
    let timeout = null;
    let leadingResult;

    return function(...args: any[]) {
        return new Promise((resolve, reject) => {
            const runImmediately = leading && !timeout;
            if (timeout != null) { clearTimeout(timeout); }

            timeout = setTimeout(() => {
                timeout = null;

                const res = leading ? leadingResult : functionToDebounce.apply(this, args);

                for (resolve of resolvers) {
                    resolve(res);
                }

                resolvers = [];
            }, wait);

            if (runImmediately) {
                leadingResult = functionToDebounce.apply(this, args);
                resolve(leadingResult);
            } else {
                resolvers.push(resolve);
            }
        });
    };
}
