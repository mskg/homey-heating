import DateFnsUtils from '@date-io/date-fns';
import { Button, Dialog, Slide, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import React from 'react';
import { ISetPoint } from '../../../app/model';
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import translate from '../../i18n/Translation';
import Transition from "../Transition";
import {TARGET_TEMPERATURE_MIN, TARGET_TEMPERATURE_MAX} from '../../../app/services/homey-api/declarations';

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, 100), ...{
        dialogPaper: {
            minHeight: "100%",
            minWidth: "100%",
            maxWidth: "100%",
            paddingBottom: 50,
            paddingTop: theme.spacing.unit * 10,
        },
    }
});

type Props = WithStyles<typeof styles> & {
    open: boolean;
    setPoint: ISetPoint;

    onSave: (newSetPoint: ISetPoint) => void;
    onCancel: () => void;
}

const SetPointDialog: React.StatelessComponent<Props> = (props: Props) => {
    const { classes, onSave, onCancel, setPoint, ...otherProps } = props;
    const [editedSetPoint, setSetPoint] = React.useState(props.setPoint);

    function onCancelDialog() {
        onCancel();
    }

    function onSaveDialog() {
        onSave(editedSetPoint);
    }

    function getDate(p: ISetPoint) {
        const d = new Date();
        d.setHours(p.hour);
        d.setMinutes(p.minute);

        return d;
    }

    React.useEffect(() => {
        // original Setpoint
        setSetPoint(setPoint);
    }, [props.open]);


    function setSetPointValue(name: keyof (ISetPoint), val: any) {
        setSetPoint(sp => { return { ...sp, [name]: val } });
    }

    return (
        <Dialog fullScreen TransitionComponent={Transition} {...otherProps}>
            <AppHeader>
                {{
                    title: translate("setpoint.title"),
                    button: (
                        <IconButton className={classes.menuButton} color="inherit" onClick={onCancelDialog} aria-label="Close">
                            <CloseIcon />
                        </IconButton>
                    ),
                    actions: (
                        <Button color="inherit" onClick={onSaveDialog}>
                            {translate("setpoint.save")}
                        </Button>
                    )
                }}
            </AppHeader>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Paper square className={classes.dialogPaper}>
                    <div className={classes.inputContainer}>
                        <TimePicker
                            ampm={false}
                            label={translate("setpoint.start.label")}
                            placeholder={translate("setpoint.start.placeholder")}
                            fullWidth
                            value={getDate(editedSetPoint)}
                            onChange={(d: Date) => { setSetPointValue('hour', d.getHours()); setSetPointValue('minute', d.getMinutes()); }}
                            className={classes.input}
                        />

                        <FormControl className={classes.formControl}>
                            <InputLabel>{translate("setpoint.temperature.label")}</InputLabel>

                            <Select
                                fullWidth
                                onChange={(evt) => {
                                    setSetPointValue(
                                        'targetTemperature',
                                        evt.target.value
                                    )
                                }}
                                value={editedSetPoint.targetTemperature}
                            >
                                <MenuItem value={16}>{translate("setpoint.temperature.low")}</MenuItem>
                                <MenuItem value={18.5}>{translate("setpoint.temperature.middle")}</MenuItem>
                                <MenuItem value={20.5}>{translate("setpoint.temperature.warm")}</MenuItem>
                                <MenuItem value={21.5}>{translate("setpoint.temperature.warmer")}</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            type="number"                        
                            InputProps={{ inputProps: { min: TARGET_TEMPERATURE_MIN, max: TARGET_TEMPERATURE_MAX, step: 0.5 } }}

                            className={classes.input}
                            label={translate("setpoint.target.label")}
                            placeholder={translate("setpoint.target.label")}

                            fullWidth
                            margin="normal"

                            value={editedSetPoint.targetTemperature}
                            onChange={(e) => { setSetPointValue('targetTemperature', e.target.value); }}
                        />
                    </div>
                </Paper>
            </MuiPickersUtilsProvider>
        </Dialog>
    );
}

export default withStyles(styles)(SetPointDialog);