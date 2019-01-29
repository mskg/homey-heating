type VoidFunction = () => void;

/**
 * const unlock = await new Mutex().lock();
 * {
 *      // code that should run locked
 * }
 * unlock();
 */
export class Mutex {
    private locking: Promise<VoidFunction>;

    constructor() {
        this.locking = Promise.resolve(() => null);
    }

    public lock(): Promise<VoidFunction> {
        let unlockNext: VoidFunction;

        const willLock = new Promise<VoidFunction>((resolve) => unlockNext = () => {
            resolve();
        });

        const willUnlock = this.locking.then(() => unlockNext);
        this.locking = this.locking.then(() => willLock);

        return willUnlock;
    }
}
