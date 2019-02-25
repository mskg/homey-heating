// @ts-ignore
export function mockEventHandler(...args: any) {
    const self = {
        _args: args,
        _evt: {},

        // @ts-ignore
        callEventHandler(evt) { return self._evt[evt](); },

        // @ts-ignore
        on(evt, func) { self._evt[evt] = func; },

        // @ts-ignore
        once(evt, func) { self._evt[evt] = func; },
    };

    return self;
}
