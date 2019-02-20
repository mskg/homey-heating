import { ICalculatedTemperature } from "@app/model";
import { maxBy, minBy } from "lodash";
import { injectable, registry } from "tsyringe";

export enum TemperatureConflictPolicy {
    Min = "use_min",
    Max = "use_max",
}

export interface ITemperatureConflictPolicy {
    resolve(setPoints: ICalculatedTemperature[]): ICalculatedTemperature;
}

@injectable()
@registry([{ token: TemperatureConflictPolicy.Max, useToken: MaxTemperatureConflictPolicy }])
export class MaxTemperatureConflictPolicy implements ITemperatureConflictPolicy {
    public resolve(setPoints: ICalculatedTemperature[]): ICalculatedTemperature {
        if (setPoints == null) { return null; }
        if (setPoints.length === 1) { return setPoints[0]; }

        return maxBy<ICalculatedTemperature>(setPoints, (t) => t.targetTemperature);
    }
}

@injectable()
@registry([{ token: TemperatureConflictPolicy.Min, useToken: MinTemperatureConflictPolicy }])
export class MinTemperatureConflictPolicy implements ITemperatureConflictPolicy {
    public resolve(setPoints: ICalculatedTemperature[]): ICalculatedTemperature {
        if (setPoints == null) { return null; }
        if (setPoints.length === 1) { return setPoints[0]; }

        return minBy<ICalculatedTemperature>(setPoints, (t) => t.targetTemperature);
    }
}
