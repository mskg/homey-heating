// tslint:disable: trailing-comma
export function normalizeTime(minutes: number, a = 0, b = 4) {
    //        (b-a)(x - min)
    // f(x) = -------------- +  a
    //        max - min
    //
    // Round to 15 minutes
    return Math.floor(
        ((b - a) * (minutes - 0)) /
        (59 - 0)
    ) * 15;
}
