import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useSchedules } from '../../api/hooks';
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import AppMenu from '../Menu';
import { TemperatureAvatar, FilledTemperatureAvatar, normalize }  from '../TemperatureAvatar';
import { ListItemAvatar } from '@material-ui/core';
import translation from "../../i18n/Translation";

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme), ...{      
    }
});

type Props = WithStyles<typeof styles>;

function percent(a, b) {
    if (a > b) { return 100; }

    return Math.round(a/b * 100);
}

const SchedulesPage: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const { schedules } = useSchedules();
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);

   return (
        <React.Fragment>
            <AppHeader>
                {{
                    title: translation("temperatures.title"),
                    button: (
                        <IconButton className={classes.menuButton} color="inherit" onClick={() => { setOpenMenu(true); }}>
                            <MenuIcon />
                        </IconButton>
                    ),
                    subBar: (
                        <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
                    )
                }}
            </AppHeader>

            <Paper square className={classes.paper}>
                <List className={classes.list}>
                    {schedules.map((schedule) => (
                        <React.Fragment key={schedule.device.id + schedule.plan.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <TemperatureAvatar value={schedule.targetTemperature} />
                                </ListItemAvatar>
                                <ListItemText primary={schedule.device.name} secondary={schedule.plan.name} />
                                <ListItemSecondaryAction style={{paddingRight: 16}} >
                                    <FilledTemperatureAvatar value={schedule.temperature} fill={percent(schedule.temperature, schedule.targetTemperature)} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
        </React.Fragment>
    );
}

export default withStyles(styles)(SchedulesPage);
