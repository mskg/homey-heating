import { LogService } from "../services/log";

function retry<T>(func: () => Promise<T>, maxRetries = 5, retryInterval = 1000, incrementalBackoff = false, maxRetryInterval = 10000): Promise<T> {
    return new Promise((resolve, reject) => {
        func()
            .then(resolve)
            .catch((error) => {
                LogService.defaultLog.error(`Call failed, retries left ${maxRetries}, waiting ${retryInterval}`, error);

                setTimeout(() => {
                    if (maxRetries === 1) {
                        reject(error);                        
                        return;
                    }

                    // leave or double the time on incremental backoff
                    const nextInterval = incrementalBackoff ? Math.min(maxRetryInterval, retryInterval * 2) : retryInterval;

                    retry(func, maxRetries - 1, nextInterval, incrementalBackoff, maxRetryInterval)
                        .then(resolve, reject);                
                }, retryInterval);
            });
    });
}

export default retry;