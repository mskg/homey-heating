import { Button, ListItemSecondaryAction } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import CancelIcon from "@material-ui/icons/Cancel";
import TrashIcon from "@material-ui/icons/Delete";
import CopyIcon from "@material-ui/icons/FileCopy";
import React, { useCallback } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { ScrollLocky } from "react-scroll-locky";
import { Day, ISetPoint } from "../../app/model";
import AddFab from "../components/AddFab";
import AppHeader from "../components/AppHeader";
import { MenuButton } from "../components/Menu";
import { TemperatureAvatar } from "../components/TemperatureAvatar";
import translate from "../i18n/Translation";
import Page from "../layouts/Page";
import { useHistory, useModifySetPoints, usePlan } from "../state/planHooks";
import { usePlanDispatch } from "../state/PlanProvider";

const CopyDayDialog = React.lazy(() => import("../dialogs/CopyDayDialog"));
const SetPointDialog = React.lazy(() => import("../dialogs/SetPointDialog"));

const styles: StyleRulesCallback = (theme) => ({
    list: {
        marginTop: 0,
        marginBottom: theme.spacing.unit * 2,
    },

    tab: {
        minWidth: "50px",
    },

    avatar: {

    },
});

function formatNumber(i: number) {
    return i > 9 ? i.toString() : "0" + i;
}

function tabToDate(dateDay: number): number {
    return dateDay + 1 > 6 ? 0 : dateDay + 1;
}

function dateToTab(dateDay: number): number {
    return dateDay === 0 ? 6 : dateDay - 1;
}

type IndexedSetPoint = {
    index: number,
} & ISetPoint;

type Params = {
    id: string;
};

type Props = WithStyles<typeof styles> & RouteComponentProps<Params, {}, boolean>;

const SchedulePage: React.FunctionComponent<Props> = (props: Props) => {
    const { classes, location, history } = props;

    const dispatch = usePlanDispatch();

    const [isSetPointDialogOpen, setSetPointDialogOpen] = React.useState(false);
    const [isCopyDayDialogOpen, setIsCopyDayDialogOpen] = React.useState(false);
    const [selectedTab, setTab] = React.useState(0);

    const { plan, loaded } = usePlan(props.match.params.id);
    const { undo, commit } = useHistory();

    React.useEffect(() => {
        selectTab(0);

        setSetPointDialogOpen(false);
        setIsCopyDayDialogOpen(false);
    }, [location, loaded]);

    const {
        isDirty, setDirty,
        selectedDay, copyDays, loadSetPoint, newSetPoint, selectDay, removeSetPoint: removeSetPointFunc,
    } = useModifySetPoints();

    const selectTab = useCallback((tab) => {
        setTab(tab);
        selectDay(tabToDate(tab));
    }, [dispatch]);

    // depends on local variables
    const removeSetPoint = (idx) => {
        removeSetPointFunc(idx);
        selectTab(selectedTab);
    };

    // depends on local variables
    const copyDay = (days: Day[]) => {
        copyDays(tabToDate(selectedTab), days);
        selectTab(selectedTab);
        setIsCopyDayDialogOpen(false);
    };

    function onCancelDialog() {
        undo();

        history.replace({
            pathname: `/plans/${plan.id}`,
            state: true,
        });
    }

    function onSaveDialog() {
        commit();

        history.replace({
            pathname: `/plans/${plan.id}`,
            state: true,
        });
    }

    function onEditSetPoint(sp: ISetPoint, index: number) {
        loadSetPoint({ ...sp, index });
        setSetPointDialogOpen(true);
    }

    function addSetPoint() {
        newSetPoint(tabToDate(selectedTab));
        setSetPointDialogOpen(true);
    }

    return (
        <React.Fragment>
            <CopyDayDialog
                open={isCopyDayDialogOpen}
                onConfirm={copyDay}
                onCancel={() => { setIsCopyDayDialogOpen(false); }}
            />

            <SetPointDialog
                open={isSetPointDialogOpen}
                onClose={(d) => {
                    if (d) { setDirty(true); selectTab(selectedTab); }
                    setSetPointDialogOpen(false);
                }}
            />

            <Page>
                {{
                    header: (
                        <AppHeader>
                            {{
                                title: translate("schedule.title"),
                                button: (
                                    <MenuButton first={true} onClick={onCancelDialog} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
                                ),
                                actions: (
                                    <React.Fragment>
                                        <MenuButton onClick={() => { setIsCopyDayDialogOpen(true); }} icon={<CopyIcon />} />

                                        {isDirty &&
                                            <Button color="inherit" onClick={onSaveDialog}>
                                                {translate("schedule.save")}
                                            </Button>
                                        }
                                    </React.Fragment>
                                ),
                                subBar: (
                                    <Tabs value={selectedTab} onChange={(e, v) => selectTab(v)} variant="fullWidth">
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Monday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Tuesday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Wednesday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Thursday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Friday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Saturday")} />
                                        <Tab classes={{ root: props.classes.tab }} disableRipple={true} label={translate("schedule.Sunday")} />
                                    </Tabs>
                                ),
                            }}
                        </AppHeader>
                    ),
                    paddingTop: 100,
                    paddingBottom: 60,
                    body: (
                        <React.Fragment>
                            <ScrollLocky enabled={isSetPointDialogOpen || isCopyDayDialogOpen} isolation={false}>
                                <List className={classes.list}>
                                    {
                                        selectedDay.last &&
                                        <React.Fragment key="-1">
                                            <ListItem button={true} onClick={() => selectTab(dateToTab(selectedDay.last.day))}>
                                                <TemperatureAvatar value={selectedDay.last.targetTemperature} />

                                                <ListItemText
                                                    primary={`${Day[selectedDay.last.day]}`}
                                                    secondary={`${formatNumber(selectedDay.last.hour)}:${formatNumber(selectedDay.last.minute)}`}
                                                />
                                            </ListItem>
                                            <Divider />
                                        </React.Fragment>
                                    }
                                    {
                                        selectedDay.schedules.map((schedule: IndexedSetPoint) =>
                                            <React.Fragment key={schedule.index}>
                                                <ListItem button={true} onClick={() => onEditSetPoint(schedule, schedule.index)}>
                                                    <TemperatureAvatar value={schedule.targetTemperature} />

                                                    <ListItemText primary={`${formatNumber(schedule.hour)}:${formatNumber(schedule.minute)}`} />

                                                    <ListItemSecondaryAction>
                                                        <IconButton className={classes.menuButton} onClick={() => removeSetPoint(schedule.index)}>
                                                            <TrashIcon />
                                                        </IconButton>
                                                    </ListItemSecondaryAction>
                                                </ListItem>
                                                <Divider />
                                            </React.Fragment>,
                                        )
                                    }
                                </List>
                            </ScrollLocky>

                            <AddFab onClick={addSetPoint} />
                        </React.Fragment>
                    ),
                }}
            </Page>
        </React.Fragment>
    );
};

export default withRouter(withStyles(styles)(SchedulePage));
