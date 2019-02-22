
import { FlowCardTriggerDevice } from "homey";
import { flowCardTriggerDeviceFactory, IFlowContext } from "./args";

export type ThermostatModeChangedTriggerTokens = {
    mode: string,
};

export function ThermostatModeChangedTrigger({ logger }: IFlowContext): FlowCardTriggerDevice<ThermostatModeChangedTriggerTokens, void> {
    return flowCardTriggerDeviceFactory("thermostat_override_changed", logger);
}
