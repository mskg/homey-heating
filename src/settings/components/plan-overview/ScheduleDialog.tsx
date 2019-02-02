import { Button, Dialog, DialogContent, DialogTitle, ListItemSecondaryAction } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import TrashIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import { filter, forEach, remove, sortBy } from 'lodash';
import React from 'react';
import { Day, ISetPoint } from '../../../app/model';
import translate from '../../i18n/Translation';
import AddFab from "../AddFab";
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import { TemperatureAvatar } from '../TemperatureAvatar';
import Transition from "../Transition";
import CopyDayDialog from './CopyDayDialog';
import SetPointDialog from "./SetPointDialog";

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 6), ...{
        tab: {
            minWidth: "50px"
        },

        avatar: {

        },
    }
});

function formatNumber(i: number) {
    return i > 9 ? i.toString() : "0" + i;
};

function tabToDate(dateDay: number): number {
    return dateDay + 1 > 6 ? 0 : dateDay + 1;
}

function dateToTab(dateDay: number): number {
    return dateDay == 0 ? 6 : dateDay - 1;
}

type FilteredSchedule = {
    lastSchedule: IndexedSetPoint
    schedules: IndexedSetPoint[],
};

function determineSchedules(schedules: ISetPoint[], day: number = 0): FilteredSchedule {
    const sortPoints = [(d: IndexedSetPoint) => (d.day == 0 ? 7 : d.day), "hour", "minute"];

    const globalSort = sortBy(
        schedules.map<IndexedSetPoint>((sp, i) => { return { ...sp, index: i }; }),
        sortPoints) as IndexedSetPoint[];

    // filtered and sorted based on day
    const newSchedules = globalSort.filter(sp => sp.day == tabToDate(day))

    // previous is last
    const lastSchedule = (() => {
        // no elements
        if (globalSort.length == 0) { return null; }

        // first element is first element
        if (newSchedules.length != 0 && newSchedules[0].index == 0) {
            if (globalSort[globalSort.length - 1].day !== newSchedules[0].day) {
                return globalSort[globalSort.length - 1];
            }

            return null;
        }

        if (newSchedules.length == 0) {
            let nd = day - 1;

            // we search from right to left
            while (nd >= 0) {
                let last = globalSort.filter(sp => sp.day == tabToDate(nd));
                if (last.length > 0) {
                    // already sorted
                    return last[last.length - 1];
                }

                nd -= 1;
            }

            // cannot happen
            return null;
        }

        // highest from last schedule
        return globalSort[newSchedules[0].index - 1];
    })();

    // the filtered list
    return {
        lastSchedule: lastSchedule,
        schedules: newSchedules
    }
}

const defaultSetpoint: IndexedSetPoint = {
    index: -1,
    day: 0,
    hour: 0,
    minute: 0,
    targetTemperature: 0
};

type IndexedSetPoint = {
    index: number,
} & ISetPoint;

type Props = WithStyles<typeof styles> & {
    open: boolean;

    name?: string;
    schedules: ISetPoint[];

    onSave: (plan: ISetPoint[]) => void;
    onCancel: () => void;
};

const ScheduleDialog: React.StatelessComponent<Props> = (props: Props) => {
    const { classes, onSave, onCancel, name, ...otherProps } = props;

    const [schedules, setSchedules] = React.useState(props.schedules);
    const [selectedTab, setTab] = React.useState(0);

    const newSchedules = determineSchedules(props.schedules, selectedTab);
    const [selectedSchedules, setSelectedSchedules] = React.useState<IndexedSetPoint[]>(newSchedules.schedules);
    const [previousSchedule, setPreviousSchedule] = React.useState<IndexedSetPoint>(newSchedules.lastSchedule);

    const [isDirty, setDirty] = React.useState<boolean>(false);

    const [setPoint, setSetPoint] = React.useState<IndexedSetPoint>(defaultSetpoint);
    const [isSetPointDialogOpen, setSetPointDialogOpen] = React.useState(false);

    const [isCopyDayDialogOpen, setIsCopyDayDialogOpen] = React.useState(false);

    React.useEffect(() => {
        setSchedules(props.schedules.slice());
        setTab(0);
        setIsCopyDayDialogOpen(false);
        updateSchedules(props.schedules, 0);
        setDirty(false);
    }, [props.open]);

    function onCancelDialog() {
        onCancel();
    }

    function onSaveDialog() {
        onSave(schedules);
    }

    function updateSchedules(updatedPoints: ISetPoint[], newValue: number) {
        const update = determineSchedules(updatedPoints, newValue);
        setSelectedSchedules(update.schedules);
        setPreviousSchedule(update.lastSchedule);
    }

    function changeTab(event, newValue: number) {
        setTab(newValue);
        updateSchedules(schedules, newValue);
    }

    function onEditSetPoint(sp: ISetPoint, index: number) {
        // we need to make a copy
        setSetPoint({ ...sp, index: index });
        setSetPointDialogOpen(true);
    }

    function removeSetPoint(index: number) {
        setSchedules(ns => {
            ns.splice(index, 1);
            updateSchedules(ns, selectedTab);
            return ns;
        });
        setDirty(true);
    }

    function addSetPoint() {
        setSetPoint({
            index: -1,
            day: tabToDate(selectedTab),
            hour: 0,
            minute: 0,
            targetTemperature: 16
        });

        setSetPointDialogOpen(true);
    }

    function onSaveSetPoint(newSetPoint: IndexedSetPoint) {
        if (newSetPoint.index == -1) {
            setSchedules(ns => {
                ns.push(newSetPoint);
                updateSchedules(ns, selectedTab);
                return ns;
            });
        } else {
            setSchedules(ns => {
                ns[newSetPoint.index] = newSetPoint;
                updateSchedules(ns, selectedTab);
                return ns;
            });
        }

        setDirty(true);
        setSetPointDialogOpen(false);
    }

    function copyDay(days: Day[]) {
        if (days != null && days.length != 0) {
            setSchedules(old => {
                var templateDay = filter(old, o => o.day == tabToDate(selectedTab));
                var newSchedule = [...old];

                forEach(days, (day: Day) => {
                    // remove all
                    remove(newSchedule, old => old.day == day);

                    // new from template
                    forEach(templateDay, s => { newSchedule.push({ ...s, day: day }) });
                });

                return newSchedule;
            });

            changeTab(null, selectedTab);
            setDirty(true);
        }

        setIsCopyDayDialogOpen(false);
    }

    return (
        <React.Fragment>
            <CopyDayDialog open={isCopyDayDialogOpen}
                onConfirm={copyDay}
                onCancel={() => { setIsCopyDayDialogOpen(false); }
                } />

            <SetPointDialog open={isSetPointDialogOpen} setPoint={setPoint}
                onSave={onSaveSetPoint}
                onCancel={() => { setSetPointDialogOpen(false); }
                } />

            <Dialog fullScreen scroll="body" TransitionComponent={Transition} {...otherProps}>
                <DialogTitle>

                    <AppHeader>
                        {{
                            title: translate("schedule.title", { name: props.name }),
                            button: (
                                <IconButton className={classes.menuButton} color="inherit" onClick={onCancelDialog}>
                                    {isDirty && <CancelIcon />}
                                    {!isDirty && <BackIcon />}
                                </IconButton>
                            ),
                            actions: (
                                <React.Fragment>
                                    <IconButton color="inherit" onClick={() => { setIsCopyDayDialogOpen(true); }}>
                                        <CopyIcon />
                                    </IconButton>

                                    {isDirty &&
                                        <Button color="inherit" onClick={onSaveDialog}>
                                            {translate("schedule.save")}
                                        </Button>
                                    }
                                </React.Fragment>
                            ),
                            subBar: (
                                <Tabs value={selectedTab} onChange={changeTab} variant="fullWidth">
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Monday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Tuesday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Wednesday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Thursday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Friday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Saturday")} />
                                    <Tab classes={{ root: props.classes.tab }} disableRipple label={translate("schedule.Sunday")} />
                                </Tabs>
                            )
                        }}
                    </AppHeader>
                </DialogTitle>

                <DialogContent className={classes.resetPadding}>
                    <List className={classes.list}>
                        {
                            previousSchedule &&
                            <React.Fragment key="-1">
                                <ListItem button onClick={() => changeTab(null, dateToTab(previousSchedule.day))}>
                                    <TemperatureAvatar value={previousSchedule.targetTemperature} />

                                    <ListItemText
                                        primary={`${Day[previousSchedule.day]}`}
                                        secondary={`${formatNumber(previousSchedule.hour)}:${formatNumber(previousSchedule.minute)}`} />
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        }
                        {
                            selectedSchedules.map((schedule: IndexedSetPoint) =>
                                <React.Fragment key={schedule.index}>
                                    <ListItem button onClick={() => onEditSetPoint(schedule, schedule.index)}>
                                        <TemperatureAvatar value={schedule.targetTemperature} />

                                        <ListItemText primary={`${formatNumber(schedule.hour)}:${formatNumber(schedule.minute)}`} />

                                        <ListItemSecondaryAction>
                                            <IconButton className={classes.menuButton} onClick={() => removeSetPoint(schedule.index)}>
                                                <TrashIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            )
                        }
                    </List>

                    <AddFab onClick={addSetPoint} />
                </DialogContent>

            </Dialog>
        </React.Fragment>
    );
}

export default withStyles(styles)(ScheduleDialog);