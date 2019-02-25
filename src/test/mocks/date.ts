
export class FakeDate extends Date {
    public static dateNow = new Date();

    constructor(...args: any[]) {
        super();

        if (args.length !== 0) { return new (global as any).oldDate(...args) as any; }
        return new (global as any).oldDate(FakeDate.dateNow.valueOf()) as any;
    }
}

export function patchDate() {
    (global as any).oldDate = (global as any).oldDate || Date;

    (global.Date as any) = FakeDate;
    (global.Date as any).now = () => {
        return FakeDate.dateNow.valueOf();
    };
}

export function revertDate() {
    (global.Date as any) = (global as any).oldDate;
    (global.Date as any).now = (global as any).oldDate.now;
}
