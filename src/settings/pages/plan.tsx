import { Button, Divider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import RemoveIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import { map } from 'lodash';
import { InjectedNotistackProps, withSnackbar } from 'notistack';
import React, { Fragment, useEffect, useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ScrollLocky } from 'react-scroll-locky';
import * as uuidv1 from 'uuid/v1';
import { planAPI } from '../api/heating';
import AppHeader from "../components/AppHeader";
import BodyText from '../components/BodyText';
import { useConfirmDialog } from '../components/ConfirmDialog';
import FormTextField from '../components/FormTextField';
import ZoneIcon from '../components/Icons';
import { MenuButton } from '../components/Menu';
import SubHeader from '../components/SubHeader';
import CloneDialog from '../dialogs/CloneDialog';
import translate from '../i18n/Translation';
import Page from '../layouts/Page';
import { useDevices } from '../state/deviceHooks';
import { useModifyPlan, usePlan } from '../state/planHooks';
import { useZones } from '../state/zoneHooks';

const styles: StyleRulesCallback = (theme) => ({
    button: {
        margin: theme.spacing.unit * 2,
    },

    divider: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 1,
    },

    avatar: {
        // padding: "3px",
        width: "24px",
        height: "24px"
    }
});

type Params = {
    id: string;
};

type Props = WithStyles<typeof styles> & RouteComponentProps<Params, any, boolean> & InjectedNotistackProps;

declare var PRODUCTION: boolean;
declare var HOMEY_DEV_URL: string;

const PlanOverviewPage: React.FunctionComponent<Props> = (props) => {
    const { classes } = props;

    const { plan, isDirty } = usePlan(
        props.match.params.id,
        props.location.state === true
    );

    const { setName, toggleState, toggleZone, toggleDevice } = useModifyPlan();

    const zones = useZones(props.location.state === true);
    const devices = useDevices(props.location.state === true);

    useEffect(() => {
        setIsCloneDialogOpen(false);
    }, [props.location]);

    const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);

    const { dialog: confirmRemoveDialog, open: openConfirmRemove, isOpen: isConfirmRemoveOpen } = useConfirmDialog({
        title: translate("plan.confirm.title"),
        content: translate("plan.confirm.content"),
        onConfirm: () => { removePlan() }
    });

    const save = () => {
        planAPI.updatePlan(plan).then(p => {
            props.history.push({
                pathname: `/`,
                state: false
            });

            props.enqueueSnackbar(translate("plan.saved", {
                name: plan.name
            }));
        })
    };

    const removePlan = () => {
        planAPI.removePlan(plan.id).then(p => {
            props.history.push({
                pathname: `/`,
                state: false
            });

            props.enqueueSnackbar(translate("plan.removed", {
                name: plan.name
            }));
        })
    };

    const duplicatePlan = (name) => {
        var newPlan = { ...plan, enabled: false, id: uuidv1(), name: name };

        planAPI.updatePlan(newPlan).then(p => {
            props.history.push({
                pathname: `/plans/${newPlan.id}`,
                state: false
            });
            
            props.enqueueSnackbar(translate("plan.duplicated", {
                name: plan.name
            }));
        }).catch(r => {
            throw r;
        });
    };

    return (
        <Fragment>
            {confirmRemoveDialog}

            <CloneDialog open={isCloneDialogOpen} name={plan.name}
                onConfirm={duplicatePlan}
                onCancel={() => { setIsCloneDialogOpen(false); }
                } />

            <Page>
                {{
                    header: (
                        <AppHeader>
                            {{
                                title: plan.name || translate("plan.unnamed"),
                                button: (
                                    <MenuButton first {...{ to: `/` }} component={Link} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
                                ),
                                actions: (
                                    <Fragment>
                                        {plan.id != 'new' && !isDirty &&
                                            <MenuButton onClick={() => { setIsCloneDialogOpen(true); }} icon={<CopyIcon />} />
                                        }

                                        {plan.id != 'new' &&
                                            <MenuButton onClick={openConfirmRemove} icon={<RemoveIcon />} />
                                        }

                                        {isDirty &&
                                            <Button color="inherit" onClick={save}>
                                                {translate("plan.save")}
                                            </Button>
                                        }
                                    </Fragment>
                                )
                            }}
                        </AppHeader>

                    ),
                    paddingTop: 50,
                    body: (
                        <ScrollLocky enabled={isCloneDialogOpen || isConfirmRemoveOpen} isolation={false}>
                            <Fragment>
                                <SubHeader text={translate("plan.overview.section")} />
                                <BodyText text={translate("plan.overview.text")} />

                                <FormTextField
                                    label={translate("plan.overview.name.label")}
                                    placeholder={translate("plan.overview.name.placeholder")}

                                    value={plan.name}
                                    onChange={setName}
                                />

                                <BodyText style={{ paddingTop: 16 }} text={translate("plan.overview.text_enable")} />
                                <FormControlLabel
                                    control={
                                        <Switch
                                            onChange={toggleState}
                                            checked={plan.enabled} />
                                    }
                                    label={translate("plan.overview.enabled.label")}
                                    labelPlacement="start"
                                />

                                <BodyText style={{ paddingTop: 16 }} text={translate("plan.overview.text_schedule")} />
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <Link style={{ textDecoration: "none" }} to={{ pathname: `/plans/${plan.id}/schedule`, state: plan }} replace={true}>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            {translate("plan.overview.edit")}
                                        </Button>
                                    </Link>

                                    <Link style={{ textDecoration: "none" }} to={{ pathname: `/plans/${plan.id}/exceptions`, state: plan }} replace={true}>
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            {translate("plan.overview.exceptions")}
                                        </Button>
                                    </Link>
                                </div>

                                <Divider className={classes.divider} />
                                <SubHeader text={translate("plan.zones.section")} />
                                <BodyText text={translate("plan.zones.text")} />
                                <List>
                                    {map(zones, zone => (
                                        <ListItem key={zone.id} button onClick={() => toggleZone(zone.id)}>
                                            {zone.icon != null &&
                                                <ListItemAvatar>
                                                    <ZoneIcon name={zone.icon} />
                                                </ListItemAvatar>
                                            }
                                            <ListItemText primary={zone.name} />
                                            <ListItemSecondaryAction>
                                                <Checkbox onChange={() => toggleZone(zone.id)} checked={plan.zones.find(c => c === zone.id) != null} />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider className={classes.divider} />
                                <SubHeader text={translate("plan.devices.section")} />
                                <BodyText text={translate("plan.devices.text")} />
                                <List>
                                    {map(devices, device => (
                                        <ListItem key={device.id} button onClick={() => toggleDevice(device.id)}>
                                            {device.icon != null &&
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar} src={`${PRODUCTION ? "" : HOMEY_DEV_URL}${device.icon}`} />
                                                </ListItemAvatar>
                                            }
                                            <ListItemText primary={device.name} />
                                            <ListItemSecondaryAction>
                                                <Checkbox onChange={() => toggleDevice(device.id)} checked={plan.devices.find(c => c === device.id) != null} />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider className={classes.divider} />
                            </Fragment>
                        </ScrollLocky>
                    )
                }}
            </Page>
        </Fragment>
    );
}

export default withSnackbar(withRouter(withStyles(styles)(PlanOverviewPage)));