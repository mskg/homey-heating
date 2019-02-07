import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import React from 'react';
import { ISetPoint } from '../../app/model';
import { TARGET_TEMPERATURE_MAX, TARGET_TEMPERATURE_MIN } from '../../app/services/homey-api/declarations';
import AppHeader from "../components/AppHeader";
import FormTextField from '../components/FormTextField';
import InputContainer from '../components/InputContainer';
import { MenuButton } from '../components/Menu';
import Transition from "../components/Transition";
import translate from '../i18n/Translation';
import { useModifySetPoints } from '../state/planHooks';

const styles: StyleRulesCallback = (theme) => ({
    resetPadding: {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 36,
    }
});

type Props = WithStyles<typeof styles> & {
    open: boolean;
    onClose: (save: boolean) => void;
}

const SetPointDialog: React.FunctionComponent<Props> = (props: Props) => {
    const { classes, onClose, ...otherProps } = props;

    const {setPoint, setStart,saveSetPoint,setTargetTemperature } = useModifySetPoints();

    function onCancelDialog() {
        onClose(false);
    }

    function onSaveDialog() {
        saveSetPoint(setPoint);
        onClose(true);
    }

    function getDate(p: ISetPoint) {
        const d = new Date();
        d.setHours(p.hour);
        d.setMinutes(p.minute);

        return d;
    }

    return (
        <Dialog fullScreen TransitionComponent={Transition} {...otherProps}>
            <DialogTitle>
                <AppHeader>
                    {{
                        title: translate("setpoint.title"),
                        button: (
                            <MenuButton first onClick={onCancelDialog} icon={<CloseIcon />} />
                        ),
                        actions: (
                            <Button color="inherit" onClick={onSaveDialog}>
                                {translate("setpoint.save")}
                            </Button>
                        )
                    }}
                </AppHeader>
            </DialogTitle>

            <DialogContent className={classes.resetPadding}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <InputContainer>
                        <TimePicker
                            ampm={false}
                            label={translate("setpoint.start.label")}
                            placeholder={translate("setpoint.start.placeholder")}
                            fullWidth
                            value={getDate(setPoint)}
                            onChange={setStart}
                            className={classes.input}
                        />
                    </InputContainer>

                    <InputContainer>
                        <FormControl className={classes.formControl} style={{ marginTop: 16 }} fullWidth>
                            <InputLabel >{translate("setpoint.temperature.label")}</InputLabel>

                            <Select
                                fullWidth
                                onChange={setTargetTemperature}
                                value={setPoint.targetTemperature}
                            >
                                <MenuItem value={16}>{translate("setpoint.temperature.low")}</MenuItem>
                                <MenuItem value={18.5}>{translate("setpoint.temperature.middle")}</MenuItem>
                                <MenuItem value={20.5}>{translate("setpoint.temperature.warm")}</MenuItem>
                                <MenuItem value={21.5}>{translate("setpoint.temperature.warmer")}</MenuItem>
                            </Select>
                        </FormControl>
                    </InputContainer>

                    <FormTextField
                        type="number"
                        InputProps={{ inputProps: { min: TARGET_TEMPERATURE_MIN, max: TARGET_TEMPERATURE_MAX, step: 0.5 } }}

                        label={translate("setpoint.target.label")}
                        placeholder={translate("setpoint.target.label")}

                        value={setPoint.targetTemperature}
                        onChange={setTargetTemperature}
                    />
                </MuiPickersUtilsProvider>
            </DialogContent>
        </Dialog>
    );
}

export default withStyles(styles)(SetPointDialog);