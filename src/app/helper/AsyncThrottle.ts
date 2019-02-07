type AnyArgsFunc<T> = (...args: any[]) => T;

function throttle<T>(funcToThrottle: AnyArgsFunc<T>, duration: number, maxCalls: number = 1): AnyArgsFunc<Promise<T>> {
    let processCount = 0;
    let ticks = 0;

    // throttle function
    return (...args: any[]) => {
        return new Promise<T>((resolve, reject) => {
            const now = Date.now();

            if ((now - ticks) > 1) {
                processCount = duration;
                ticks = now;
            } else if (processCount < maxCalls) {
                processCount++;
            } else {
                ticks += duration;
                processCount = 1;
            }

            setTimeout(() => { resolve(funcToThrottle.apply(this, args)); }, ticks - now);
        });
    };
}

export default throttle;