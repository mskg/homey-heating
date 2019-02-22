type AnyArgsFunc<T> = (...args: any[]) => Promise<T>;

/**
 * Debounces the async function by ms
 *
 * @param functionToDebounce it
 * @param wait in ms
 * @param leading true, if you want the first result
 */
export function AsyncDebounce<T>(functionToDebounce: AnyArgsFunc<T>, wait: number, leading = false): AnyArgsFunc<T> {
    let resolvers: any[] = [];
    let timeout: NodeJS.Timeout | undefined;
    let leadingResult: any;

    return function(...args: any[]) {
        return new Promise((resolve, _reject) => {
            const runImmediately = leading && !timeout;
            if (timeout != null) { clearTimeout(timeout); }

            timeout = setTimeout(() => {
                timeout = undefined;

                // @ts-ignore
                const res = leading ? leadingResult : functionToDebounce.apply(this, args);

                for (resolve of resolvers) {
                    resolve(res);
                }

                resolvers = [];
            }, wait) as unknown as NodeJS.Timeout;

            if (runImmediately) {
                // @ts-ignore
                leadingResult = functionToDebounce.apply(this, args);
                resolve(leadingResult);
            } else {
                resolvers.push(resolve);
            }
        });
    };
}
