import { ILogger } from "@app/services";

/**
 * Retry the async function.
 * 
 * @param func call that
 * @param logger dump errors here
 * @param maxRetries so often
 * @param retryInterval wait this time in ms
 * @param incrementalBackoff double the time on each execution?
 * @param maxRetryInterval maximum duration per cycle
 */
export function Retry<T>(func: () => Promise<T>, 
    logger?: ILogger,
    maxRetries = 5,
    retryInterval = 1000,
    incrementalBackoff = false,
    maxRetryInterval = 10000): Promise<T> {

    return new Promise((resolve, reject) => {
        // call the func
        func()
            .then(resolve)
            // if it fails
            .catch((error) => {
                if (logger != null) logger.error(`Retry action ${maxRetries} times, waiting for ${retryInterval}`, error);

                // we're done
                if (maxRetries -1 <= 0) {
                    reject(error);                        
                    return;
                }
                
                // reexecute after retryInterval
                setTimeout(() => {
                    // leave or double the time on incremental backoff
                    const nextInterval = incrementalBackoff ? Math.min(maxRetryInterval, retryInterval * 2) : retryInterval;

                    // retry one time less
                    Retry(func, logger, maxRetries - 1, nextInterval, incrementalBackoff, maxRetryInterval)
                        .then(resolve, reject);                
                }, retryInterval);
            });
    });
}
