import { Button, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { OverrideMode, Overrides } from '../../../app/model';
import translate from '../../i18n/Translation';
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import SubHeader from '../SubHeader';
import Transition from '../Transition';
import OverrideSetting from './OverrideSetting';

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 3), ...{
    }
});

type Props = WithStyles<typeof styles> & {
    open: boolean;
    overrides: Overrides;

    onSave: (overrides: Overrides) => void;
    onCancel: () => void;
};

const ExceptionsDialog: React.StatelessComponent<Props> = (props: Props) => {
    const { classes, onSave, onCancel, overrides, ...otherProps } = props;
    const [isDirty, setDirty] = React.useState<boolean>(false);
    const [editedOverrides, setOverrides] = React.useState(overrides);

    React.useEffect(() => {
        setOverrides(overrides);
        setDirty(false);
    }, [overrides]);

    function onCancelDialog() {
        onCancel();
    }

    function onSaveDialog() {
        onSave(editedOverrides);
    }

    const getOverride = (mode: OverrideMode) => {
        var override = editedOverrides != null
            // made an error in first implementation storing the number instead of the value
            ? (editedOverrides[OverrideMode[mode]] || editedOverrides[mode])
            : null;

        return {
            mode: mode,
            enabled: override != null && override.targetTemperature != 0,
            targetTemperature: override != null ? override.targetTemperature : 0
        }
    };

    const updateOverride = (mode: OverrideMode, target: number) => {
        setOverrides(old => {
            if (old == null && target == 0) return old;
            if (old == null) {
                old = {};
            }

            if (target == 0) {
                delete old[OverrideMode[mode]];
                delete old[mode];
            }
            else {
                old[OverrideMode[mode]] = {
                    targetTemperature: target
                };
            }

            return old;
        });
        setDirty(true);
    }

    return (
        <React.Fragment>
            <Dialog fullScreen scroll="body" TransitionComponent={Transition} {...otherProps}>

                <DialogTitle>
                    <AppHeader>
                        {{
                            title: translate("overrides.title"),
                            button: (
                                <IconButton className={classes.menuButton} color="inherit" onClick={onCancelDialog}>
                                    {isDirty && <CancelIcon />}
                                    {!isDirty && <BackIcon />}
                                </IconButton>
                            ),
                            actions: (
                                <React.Fragment>
                                    {isDirty &&
                                        <Button color="inherit" onClick={onSaveDialog}>
                                            {translate("schedule.save")}
                                        </Button>
                                    }
                                </React.Fragment>
                            )
                        }}
                    </AppHeader>
                </DialogTitle>

                <DialogContent className={classes.resetPadding}>
                    <SubHeader text={translate("overrides.section")} />
                    <Typography className={classes.text} variant="body1" color="textSecondary">{translate("overrides.text")}</Typography>

                    <OverrideSetting text={translate("overrides.athome")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAtHome)} />
                    <OverrideSetting text={translate("overrides.away")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAway)} />
                    <OverrideSetting text={translate("overrides.sleeping")} setOverride={updateOverride} {...getOverride(OverrideMode.Sleep)} />
                    <OverrideSetting text={translate("overrides.holiday")} setOverride={updateOverride} {...getOverride(OverrideMode.Holiday)} />
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default withStyles(styles)(ExceptionsDialog);