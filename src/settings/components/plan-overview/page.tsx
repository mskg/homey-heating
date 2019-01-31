import { Button, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import { isEmpty, map, remove } from 'lodash';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import * as uuidv1 from 'uuid/v1';
import { IHeatingPlan, OverrideMode } from '../../../app/model';
import { planAPI } from '../../api/heating';
import { useDevices, usePlan, useZones } from '../../api/hooks';
import translate from '../../i18n/Translation';
import AppHeader from "../AppHeader";
import { useConfirmDialog } from '../ConfirmDialog';
import defautStyles from "../DefaultStyles";
import FormTextField from '../FormTextField';
import SubHeader from '../SubHeader';
import CloneDialog from './CloneDialog';
import ZoneIcon from './Icons';
import OverrideSetting from './OverrideSetting';
import ScheduleDialog from "./ScheduleDialog";

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 8), ...{
        button: {
            margin: theme.spacing.unit * 2,
        },

        planOverride: {
            marginBottom: theme.spacing.unit * 2,
        },

        tab: {
            minWidth: "50px",
        },

        avatar: {
            // padding: "3px",
            width: "24px",
            height: "24px"
        }
    }
});

type Params = {
    id: string;
};

type Props = WithStyles<typeof styles> & RouteComponentProps<Params>;

const PlanPage: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const { plan, setPlan } = usePlan(props.match.params.id);
    const { zones } = useZones();
    const { devices } = useDevices();
    const [isDirty, setDirty] = React.useState<boolean>(false);

    const [isScheduleDialogOpen, setScheduleDialogOpen] = React.useState(false);
    const [isCloneDialogOpen, setIsCloneDialogOpen] = React.useState(false);

    const { dialog: confirmRemoveDialog, open: openConfirmRemove } = useConfirmDialog({
        title: translate("plan.confirm.title"),
        content: translate("plan.confirm.content"),
        onConfirm: () => { removePlan() }
    });

    React.useEffect(() => {
        setScheduleDialogOpen(false);
        setIsCloneDialogOpen(false);
        setDirty(false);
    }, [props.match.params.id]);

    const toggleZone = value => () => {
        const zones = plan.zones || [];

        if (isEmpty(remove<string>(zones, z => z === value))) {
            zones.push(value);
        }

        setPlan(old => { return { ...old, zones: zones } });
        setDirty(true);
    };

    const updateField = (name: keyof (IHeatingPlan)) => event => {
        var newName = event.target.value;

        setPlan(old => {
            return { ...old, [name]: newName }
        });
        setDirty(true);
    };

    const toggleState = () => {
        setPlan((old) => { return { ...old, enabled: !old.enabled } });
        setDirty(true);
    }

    const toggleDevice = value => () => {
        const devices = plan.devices || [];

        if (isEmpty(remove<string>(devices, d => d === value))) {
            devices.push(value);
        }

        setPlan(old => { return { ...old, devices: devices } });
        setDirty(true);
    };

    const onSaveSchedule = (schedule) => {
        setPlan(old => { return { ...old, schedule: schedule } });
        setDirty(true);
        setScheduleDialogOpen(false);
    };

    const save = () => {
        planAPI.updatePlan(plan).then(p => {
            props.history.push("/plans");
        })
    };

    const removePlan = () => {
        planAPI.removePlan(plan.id).then(p => {
            props.history.push("/plans");
        })
    };

    const duplicatePlan = (name) => {
        var newPlan = { ...plan, enabled: false, id: uuidv1(), name: name };

        planAPI.updatePlan(newPlan).then(p => {
            props.history.push(`/plans/${newPlan.id}`);
        }).
            catch(r => {
                throw r;
            });
    };

    const getOverride = (mode: OverrideMode) => {
        var override = plan.overrides != null 
            // made an error in first implementation storing the number instead of the value
            ? (plan.overrides[OverrideMode[mode]] || plan.overrides[mode])
            : null;

        return {
            mode: mode,
            enabled: override != null && override.targetTemperature != 0,
            targetTemperature: override != null ? override.targetTemperature : 0
        }
    };

    const updateOverride = (mode: OverrideMode, target: number) => {
        setPlan(old => {
            if (old.overrides == null && target == 0) return old;
            if (old.overrides == null) {
                old.overrides = {};
            } 

            if (target == 0) {
                delete old.overrides[OverrideMode[mode]];
                delete old.overrides[mode];
            }
            else {
                debugger
                old.overrides[OverrideMode[mode]] = {
                    targetTemperature: target
                };
            }

            return old;
        });
        setDirty(true); 
    }

    return (
        <React.Fragment>
            <AppHeader>
                {{
                    title: plan.name,
                    button: (
                        <IconButton className={classes.menuButton} color="inherit" {...{ to: `/plans` }} component={Link}>
                            {isDirty && <CancelIcon />}
                            {!isDirty && <BackIcon />}
                        </IconButton>
                    ),
                    actions: (
                        <React.Fragment>
                            {plan.id != 'new' && !isDirty &&
                                <IconButton color="inherit" onClick={() => { setIsCloneDialogOpen(true); }}>
                                    <CopyIcon />
                                </IconButton>
                            }

                            {plan.id != 'new' &&
                                <IconButton color="inherit" onClick={openConfirmRemove}>
                                    <RemoveIcon />
                                </IconButton>
                            }

                            {isDirty &&
                                <Button color="inherit" onClick={save}>
                                    {translate("plan.save")}
                                </Button>
                            }
                        </React.Fragment>
                    )
                }}
            </AppHeader>

            {confirmRemoveDialog}

            <CloneDialog open={isCloneDialogOpen} name={plan.name}
                onConfirm={duplicatePlan}
                onCancel={() => { setIsCloneDialogOpen(false); }
                } />

            <ScheduleDialog open={isScheduleDialogOpen} schedules={plan.schedule} name={plan.name}
                onSave={onSaveSchedule}
                onCancel={() => { setScheduleDialogOpen(false); }
                } />

            <Paper square className={classes.paper}>
                <SubHeader text={translate("plan.overview.section")} />

                <FormTextField
                    label={translate("plan.overview.name.label")}
                    placeholder={translate("plan.overview.name.placeholder")}

                    value={plan.name}
                    onChange={updateField('name')}
                />

                <FormControlLabel
                    control={
                        <Switch
                            onChange={() => toggleState()}
                            checked={plan.enabled} />
                    }
                    label={translate("plan.overview.name.label")}
                    labelPlacement="start"
                />

                <div>
                    <Button variant="contained" color="primary" className={classes.button} onClick={() => { setScheduleDialogOpen(true); }}>
                     {translate("plan.overview.edit")}
                    </Button>
                </div>

                <Divider />

                <SubHeader text={translate("plan.overrides.section")} />

                <OverrideSetting text={translate("plan.overrides.athome")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAtHome)} />
                <OverrideSetting text={translate("plan.overrides.away")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAway)} />
                <OverrideSetting text={translate("plan.overrides.sleeping")} setOverride={updateOverride} {...getOverride(OverrideMode.Sleep)} />
                <OverrideSetting text={translate("plan.overrides.holiday")} setOverride={updateOverride} {...getOverride(OverrideMode.Holiday)} />
                <Divider />

                <SubHeader text={translate("plan.zones.section")} />
                <List>
                    {map(zones, zone => (
                        <ListItem key={zone.id} button onClick={toggleZone(zone.id)}>
                            {zone.icon != null &&
                                <ListItemAvatar>
                                    <ZoneIcon name={zone.icon} />
                                </ListItemAvatar>
                            }
                            <ListItemText primary={zone.name} />
                            <ListItemSecondaryAction>
                                <Checkbox onChange={toggleZone(zone.id)} checked={plan.zones.find(c => c === zone.id) != null} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                <Divider />

                <SubHeader text={translate("plan.devices.section")} />
                <List>
                    {map(devices, device => (
                        <ListItem key={device.id} button onClick={toggleDevice(device.id)}>
                            {device.icon != null &&
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar} src={`${PRODUCTION ? "" : HOMEY_DEV_URL}${device.icon}`} />
                                </ListItemAvatar>
                            }
                            <ListItemText primary={device.name} />
                            <ListItemSecondaryAction>
                                <Checkbox onChange={toggleDevice(device.id)} checked={plan.devices.find(c => c === device.id) != null} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                <Divider />
            </Paper>
        </React.Fragment>
    );
}

export default withRouter(withStyles(styles)(PlanPage));