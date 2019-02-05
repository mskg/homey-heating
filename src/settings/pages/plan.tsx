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
import { isEmpty, map, remove } from 'lodash';
import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { ScrollLocky } from 'react-scroll-locky';
import * as uuidv1 from 'uuid/v1';
import { IHeatingPlan } from '../../app/model';
import { planAPI } from '../api/heating';
import { useDevices, usePlan, useZones } from '../api/hooks';
import AppHeader from "../components/AppHeader";
import BodyText from '../components/BodyText';
import { useConfirmDialog } from '../components/ConfirmDialog';
import FormTextField from '../components/FormTextField';
import { MenuButton } from '../components/Menu';
import CloneDialog from '../components/plan-overview/CloneDialog';
import ZoneIcon from '../components/plan-overview/Icons';
import SubHeader from '../components/SubHeader';
import translate from '../i18n/Translation';
import Page from '../layouts/Page';

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


type Props = WithStyles<typeof styles> & RouteComponentProps<Params,any,IHeatingPlan>;

const PlanOverviewPage: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;

    let plan: IHeatingPlan;
    let setPlan: React.Dispatch<React.SetStateAction<IHeatingPlan>>;

    if (props.location.state != null) {
        [plan, setPlan]= React.useState(props.location.state);
    }
    else {
        const up = usePlan(props.match.params.id);
        plan = up.plan;
        setPlan = up.setPlan;
    }

    const { zones } = useZones();
    const { devices } = useDevices();
    const [isDirty, setDirty] = React.useState<boolean>(props.location.state != null);

    const [isCloneDialogOpen, setIsCloneDialogOpen] = React.useState(false);

    const { dialog: confirmRemoveDialog, open: openConfirmRemove, isOpen: isConfirmRemoveOpen } = useConfirmDialog({
        title: translate("plan.confirm.title"),
        content: translate("plan.confirm.content"),
        onConfirm: () => { removePlan() }
    });

    React.useEffect(() => {
        setIsCloneDialogOpen(false);
        setDirty(props.location.state != null);
    }, [props.location.state, props.match.params.id]);

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

    return (
        <React.Fragment>
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
                                    <MenuButton {...{ to: `/plans` }} component={Link} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
                                ),
                                actions: (
                                    <React.Fragment>
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
                                    </React.Fragment>
                                )
                            }}
                        </AppHeader>

                    ),
                    paddingTop: 50,
                    body: (
                        <ScrollLocky enabled={isCloneDialogOpen || isConfirmRemoveOpen } isolation={false}>
                        <React.Fragment>
                            <SubHeader text={translate("plan.overview.section")} />
                            <BodyText text={translate("plan.overview.text")} />

                            <FormTextField
                                label={translate("plan.overview.name.label")}
                                placeholder={translate("plan.overview.name.placeholder")}

                                value={plan.name}
                                onChange={updateField('name')}
                            />

                            <BodyText style={{ paddingTop: 16 }} text={translate("plan.overview.text_enable")} />
                            <FormControlLabel
                                control={
                                    <Switch
                                        onChange={() => toggleState()}
                                        checked={plan.enabled} />
                                }
                                label={translate("plan.overview.enabled.label")}
                                labelPlacement="start"
                            />

                            <BodyText style={{ paddingTop: 16 }} text={translate("plan.overview.text_schedule")} />
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Link style={{textDecoration: "none"}} to={{pathname: `/plans/${plan.id}/schedule`, state: plan}} replace={true}>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        {translate("plan.overview.edit")}
                                    </Button>
                                </Link>

                                <Link style={{textDecoration: "none"}} to={{pathname: `/plans/${plan.id}/exceptions`, state: plan}} replace={true}>
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

                            <Divider className={classes.divider} />
                            <SubHeader text={translate("plan.devices.section")} />
                            <BodyText text={translate("plan.devices.text")} />
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

                            <Divider className={classes.divider} />
                        </React.Fragment>
                        </ScrollLocky>
                    )
                }}
            </Page>
        </React.Fragment>
    );
}

export default withRouter(withStyles(styles)(PlanOverviewPage));