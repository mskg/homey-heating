// tslint:disable: trailing-comma

/**
 * Normalizes the time to a given number of slots.
 *
 * @param minutes it
 * @param slots amount of slots in one hour
 */
export function slotTime(minutes: number, slots = 4) {
    const a = 0;
    const b = Math.round(slots);

    //        (b-a)(x - min)
    // f(x) = -------------- +  a
    //        max - min
    //
    return Math.round(Math.floor(
        (((b - a) * (minutes - 0)) /
        (59 - 0))
        + a
    ) * (60 / b));
}
