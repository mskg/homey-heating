
import { NormalOperationMode, ThermostatMode } from "@app/model";
import { IVirtualThermostat } from "../../../drivers/types";
import { flowCardActionFactory, IFlowContext } from "./args";

type ChangeModeArgs = {
    mode: string;
    my_device: IVirtualThermostat;
};

export function SetThermostatOverrideAction({ flow, logger }: IFlowContext) {
    return flowCardActionFactory<ChangeModeArgs>(flow, "set_thermostat_override", logger, async (args, _state) => {
        await args.my_device.changeThermostatMode(
            parseInt(args.mode, 10) as (ThermostatMode | NormalOperationMode));
        return true;
    });
}
