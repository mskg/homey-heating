import { IHeatingPlan } from "@app/model";
import { Button, LinearProgress, Tab, Tabs } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import CancelIcon from "@material-ui/icons/Cancel";
import RemoveIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import { map } from "lodash";
import { withSnackbar, WithSnackbarProps } from "notistack";
import React, { Fragment, ReactNode, useEffect, useState } from "react";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { ScrollLocky } from "react-scroll-locky";
import * as uuidv1 from "uuid/v1";
import { planAPI } from "../api/heating";
import AppHeader from "../components/AppHeader";
import BodyText from "../components/BodyText";
import { useConfirmDialog } from "../components/ConfirmDialog";
import FormTextField from "../components/FormTextField";
import ZoneIcon from "../components/Icons";
import { MenuButton } from "../components/Menu";
import SubHeader from "../components/SubHeader";
import translate from "../i18n/Translation";
import Page from "../layouts/Page";
import { useDevices } from "../state/deviceHooks";
import { useModifyPlan, usePlan } from "../state/planHooks";
import { useZones } from "../state/zoneHooks";

const CloneDialog = React.lazy(() => import("../dialogs/CloneDialog"));
const Chart = React.lazy(() => import("../components/TemperatureChart"));

const styles: StyleRulesCallback<any, any> = (theme) => ({
    button: {
        margin: theme.spacing(2),
    },

    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    },

    avatar: {
        // padding: "3px",
        width: "24px",
        height: "24px",
    },
});

type Params = {
    id: string;
};

type Props = WithStyles<typeof styles>
    & RouteComponentProps<Params, any, boolean>
    & WithSnackbarProps;

type TabProps = {
    id: number,
    activeTab: number,
    children?: ReactNode,
};

const TabContainer: React.FunctionComponent<TabProps> = (props) => {
    const { children, id, activeTab } = props;

    return (
        <React.Suspense fallback={<LinearProgress style={{margin: 16}} color="secondary" />}>
            {id === activeTab && children}
        </React.Suspense>
    );
};

const PlanOverviewPage: React.FunctionComponent<Props> = (props: Props) => {
    const { classes } = props;
    const [selectedTab, selectTab] = React.useState(0);

    const { plan, isDirty } = usePlan(
        props.match.params.id,
        props.location.state === true,
    );

    const { setName, setDescription, toggleState, toggleZone, toggleDevice } = useModifyPlan();

    const zones = useZones(props.location.state === true);
    const devices = useDevices(props.location.state === true);

    useEffect(() => {
        setIsCloneDialogOpen(false);
        // we use 1 as tab (which is true)
        selectTab(props.location.state === true ? 1 : 0);
    }, [props.location]);

    const [isCloneDialogOpen, setIsCloneDialogOpen] = useState(false);

    const { dialog: confirmRemoveDialog, open: openConfirmRemove, isOpen: isConfirmRemoveOpen } = useConfirmDialog({
        title: translate("plan.confirm.title"),
        content: translate("plan.confirm.content"),
        onConfirm: () => { removePlan(); },
    });

    const save = () => {
        planAPI.updatePlan(plan as IHeatingPlan).then((_p) => {
            props.history.push({
                pathname: `/`,
                state: false,
            });

            props.enqueueSnackbar(translate("plan.saved", {
                name: plan.name,
            }));
        });
    };

    const removePlan = () => {
        planAPI.removePlan(plan.id).then((_p) => {
            props.history.push({
                pathname: `/`,
                state: false,
            });

            props.enqueueSnackbar(translate("plan.removed", {
                name: plan.name,
            }));
        });
    };

    const duplicatePlan = (name: string) => {
        const newPlan = { ...plan, enabled: false, id: uuidv1(), name } as IHeatingPlan;

        planAPI.updatePlan(newPlan).then((_p) => {
            props.history.push({
                pathname: `/plans/${newPlan.id}`,
                state: false,
            });

            props.enqueueSnackbar(translate("plan.duplicated", {
                name: plan.name,
            }));
        }).catch((r: any) => {
            throw r;
        });
    };

    return (
        <Fragment>
            {confirmRemoveDialog}

            <CloneDialog
                open={isCloneDialogOpen}
                name={plan.name}
                onConfirm={duplicatePlan}
                onCancel={() => { setIsCloneDialogOpen(false); }}
            />

            <Page>
                {{
                    header: (
                        <AppHeader>
                            {{
                                title: plan.name || translate("plan.unnamed"),
                                button: (
                                    <MenuButton first={true} {...{ to: `/` }} component={Link as unknown as "a"} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
                                ),
                                actions: (
                                    <Fragment>
                                        {plan.id !== "new" && !isDirty &&
                                            <MenuButton onClick={() => { setIsCloneDialogOpen(true); }} icon={<CopyIcon />} />
                                        }

                                        {plan.id !== "new" &&
                                            <MenuButton onClick={openConfirmRemove} icon={<RemoveIcon />} />
                                        }

                                        {isDirty &&
                                            <Button color="inherit" onClick={save}>
                                                {translate("plan.save")}
                                            </Button>
                                        }
                                    </Fragment>
                                ),
                                subBar: (
                                    <Tabs value={selectedTab} onChange={(_e, v) => selectTab(v)} variant="scrollable" scrollButtons="off" >
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("plan.tabs.overview")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("plan.tabs.schedule")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("plan.tabs.zones", { n: plan.zones.length })} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("plan.tabs.devices", { n: plan.devices.length })} />
                                    </Tabs>
                                ),
                            }}
                        </AppHeader>

                    ),
                    paddingTop: 100,
                    body: (
                        <ScrollLocky enabled={isCloneDialogOpen || isConfirmRemoveOpen} isolation={false}>
                            <Fragment>
                                <TabContainer id={0} activeTab={selectedTab}>
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
                                                checked={plan.enabled}
                                            />
                                        }
                                        label={translate("plan.overview.enabled.label")}
                                        labelPlacement="start"
                                    />

                                    <BodyText style={{ paddingTop: 16 }} text={translate("plan.overview.text_description")} />
                                    <FormTextField
                                        label={translate("plan.overview.description.label")}
                                        placeholder={translate("plan.overview.description.placeholder")}

                                        multiline={true}
                                        value={plan.description}
                                        onChange={setDescription}
                                    />
                                </TabContainer>

                                <TabContainer id={1} activeTab={selectedTab}>
                                    <SubHeader text={translate("plan.schedules.section")} />
                                    <BodyText text={translate("plan.schedules.text")} />

                                    <div style={{ paddingTop: 16, display: "flex", flexDirection: "row" }}>
                                        <Link style={{ textDecoration: "none" }} to={{ pathname: `/plans/${plan.id}/schedule`, state: plan }} replace={true}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                {translate("plan.schedules.edit")}
                                            </Button>
                                        </Link>

                                        <Link style={{ textDecoration: "none" }} to={{ pathname: `/plans/${plan.id}/exceptions`, state: plan }} replace={true}>
                                            <Button variant="contained" color="primary" className={classes.button}>
                                                {translate("plan.schedules.exceptions")}
                                            </Button>
                                        </Link>
                                    </div>

                                    {plan.schedule.length !== 0 && <SubHeader text={translate("plan.schedules.section_summary")} />}
                                    {plan.schedule.length !== 0 && <Chart plan={plan as IHeatingPlan} />}
                                </TabContainer>

                                <TabContainer id={2} activeTab={selectedTab}>
                                    <SubHeader text={translate("plan.zones.section")} />
                                    <BodyText text={translate("plan.zones.text")} />

                                    {zones.length === 0
                                        ? <BodyText style={{ paddingTop: 16 }} text={translate("plan.zones.empty")} />
                                        : <List>
                                            {map(zones, (zone) => (
                                                <ListItem key={zone.id} button={true} onClick={() => toggleZone(zone.id)}>
                                                    {zone.icon != null &&
                                                        <ListItemAvatar>
                                                            <ZoneIcon name={zone.icon} />
                                                        </ListItemAvatar>
                                                    }
                                                    <ListItemText primary={zone.name} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox onChange={() => toggleZone(zone.id)} checked={plan.zones.find((c) => c === zone.id) != null} />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                        </List>
                                    }
                                </TabContainer>

                                <TabContainer id={3} activeTab={selectedTab}>
                                    <SubHeader text={translate("plan.devices.section")} />
                                    <BodyText text={translate("plan.devices.text")} />

                                    {devices.length === 0
                                        ? <BodyText style={{ paddingTop: 16 }} text={translate("plan.devices.empty")} />
                                        : <List>
                                            {map(devices, (device) => (
                                                <ListItem key={device.id} button={true} onClick={() => toggleDevice(device.id)}>
                                                    {device.icon != null &&
                                                        <ListItemAvatar>
                                                            <Avatar className={classes.avatar} src={`${__PRODUCTION__ ? "" : __HOMEY_DEV_URL}${device.icon}`} />
                                                        </ListItemAvatar>
                                                    }
                                                    <ListItemText primary={device.name} />
                                                    <ListItemSecondaryAction>
                                                        <Checkbox onChange={() => toggleDevice(device.id)} checked={plan.devices.find((c) => c === device.id) != null} />
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                            ))}
                                        </List>
                                    }
                                </TabContainer>
                            </Fragment>
                        </ScrollLocky>
                    ),
                }}
            </Page>
        </Fragment>
    );
};

// @ts-ignore
export default withSnackbar(withRouter(withStyles(styles)(PlanOverviewPage)));
