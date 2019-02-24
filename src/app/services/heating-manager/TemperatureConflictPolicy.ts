import { ICalculatedTemperature } from "@app/model";
import { maxBy, minBy } from "lodash";
import { registry } from "tsyringe";

export enum TemperatureConflictPolicy {
    Min = "use_min",
    Max = "use_max",
}

export interface ITemperatureConflictPolicy {
    resolve(setPoints: ICalculatedTemperature[] | undefined): ICalculatedTemperature | undefined;
}

type ResolveFunc = typeof minBy;

@registry([{ token: TemperatureConflictPolicy.Max, useFactory: (_c) => new TemperatureConflictPolicyImplementation(maxBy) }])
@registry([{ token: TemperatureConflictPolicy.Min, useFactory: (_c) => new TemperatureConflictPolicyImplementation(minBy) }])
export class TemperatureConflictPolicyImplementation implements ITemperatureConflictPolicy {
    constructor(private resolver: ResolveFunc) {
    }

    public resolve(setPoints: ICalculatedTemperature[]): ICalculatedTemperature | undefined {
        if (setPoints == null) { return undefined; }
        if (setPoints.length === 1) { return setPoints[0]; }

        return this.resolver(setPoints, (t) => t.targetTemperature);
    }
}
