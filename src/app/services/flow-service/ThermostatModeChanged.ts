
import { FlowCardTriggerDevice } from "homey";
import { flowCardTriggerDeviceFactory, IFlowContext } from "./args";

export type ThermostatModeChangedTriggerTokens = {
    mode: string,
};

export function ThermostatModeChangedTrigger({ flow, logger }: IFlowContext): FlowCardTriggerDevice {
    return flowCardTriggerDeviceFactory(flow, "thermostat_override_changed", logger);
}
