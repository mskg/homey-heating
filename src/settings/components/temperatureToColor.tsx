import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import green from "@material-ui/core/colors/green";

export function slotTemperature(val: number, min, max, a, b) {
    //        (b-a)(x - min)
    // f(x) = -------------- +  a
    //        max - min
    //
    return Math.floor(
        (((b - a) * (val - min)) /
        (max - min))
        + a,
    );
}

export const temperatureToColor = (n) => {
    // project 16 ... 24 to 200 ... 900
    const shade = Math.round(slotTemperature(
        Math.min(Math.max(16, n), 24),
        16, 24,
        1, 8) * 100 + 100);

    if (n <= 16) {
        return blue[shade];
    }

    if (n <= 18.5) {
        return green[shade];
    }

    if (n <= 20.5) {
        return amber[shade];
    }

    return deepOrange[shade];
};
