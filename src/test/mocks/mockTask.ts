// @ts-ignore
export function mockTask(...args: any) {
    const self = {
        _args: args,
        _evt: {},

        date: args && args[0],
        handBack: args && args[1],

        // @ts-ignore
        callEventHandler(evt) { return self._evt[evt](self.handBack); },

        // @ts-ignore
        on(evt, func) { self._evt[evt] = func; },

        // @ts-ignore
        once(evt, func) { self._evt[evt] = func; },
    };

    return self;
}
