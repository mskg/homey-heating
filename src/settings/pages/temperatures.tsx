import { FormControl, InputLabel, ListItemAvatar, MenuItem, Select } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import { useScheduleInformation } from '../api/hooks';
import AppHeader from "../components/AppHeader";
import FormTextField from '../components/FormTextField';
import InputContainer from '../components/InputContainer';
import { AppMenuButton } from '../components/Menu';
import SubHeader from '../components/SubHeader';
import { FilledTemperatureAvatar, TemperatureAvatar } from '../components/TemperatureAvatar';
import translate from "../i18n/Translation";
import Page from '../layouts/Page';

const styles: StyleRulesCallback = (theme) => ({
    list: {
        marginTop: 0,
        marginBottom: theme.spacing.unit * 2,
    }
});

type Props = WithStyles<typeof styles>;

function percent(a, b) {
    if (a > b) { return 100; }

    return Math.round(a / b * 100);
}

const TemperaturesPage: React.FunctionComponent<Props> = (props) => {
    const { classes } = props;
    const { scheduleInformation } = useScheduleInformation();

    const toDatetimeLocal = (d: Date) => {
        if (d == null) { return ''; }

        const date = new Date(d);
        const ten = (i) => {
            return (i < 10 ? '0' : '') + i;
        };

        const YYYY = date.getFullYear();
        const MM = ten(date.getMonth() + 1);
        const DD = ten(date.getDate());
        const HH = ten(date.getHours());
        const II = ten(date.getMinutes());
        const SS = ten(date.getSeconds());

        return YYYY + '-' + MM + '-' + DD + 'T' +
            HH + ':' + II + ':' + SS;
    };

    return (
        <Page>
            {{
                header: (
                    <AppHeader>
                    {{
                        title: translate("temperatures.title"),
                        button: (
                            <AppMenuButton />
                        )
                    }}
                </AppHeader>
                ),
                paddingTop: 50,
                body: (
                    <React.Fragment>
                        <SubHeader text={translate("temperatures.schedule")} />

                        <InputContainer>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel>{translate("temperatures.mode")}</InputLabel>
        
                                <Select
                                    fullWidth
                                    disabled={true}
                                    value={scheduleInformation.mode}
                                >
                                    <MenuItem value={0}>{translate("Modes.0")}</MenuItem>
                                    <MenuItem value={1}>{translate("Modes.1")}</MenuItem>
                                    <MenuItem value={2}>{translate("Modes.2")}</MenuItem>
                                    <MenuItem value={3}>{translate("Modes.3")}</MenuItem>
                                    <MenuItem value={4}>{translate("Modes.4")}</MenuItem>
                                </Select>
                            </FormControl>
                        </InputContainer>
        
                        <FormTextField
                            label={translate("temperatures.next")}
                            type="datetime-local"
                            value={toDatetimeLocal(scheduleInformation.nextDate)}
                            disabled={true}
                        />
        
                        <SubHeader text={translate("temperatures.list")} />
                        <List className={classes.list}>
                            {scheduleInformation.temperatures.length > 0 && <Divider />}
                            {scheduleInformation.temperatures.map((schedule) => (
                                <React.Fragment key={schedule.device.id + schedule.plan.id}>
                                    <ListItem>
                                        <ListItemAvatar>
                                            <TemperatureAvatar value={schedule.targetTemperature} />
                                        </ListItemAvatar>
                                        <ListItemText primary={schedule.device.name} secondary={schedule.plan.name} />
                                        <ListItemSecondaryAction style={{ paddingRight: 16 }} >
                                            <FilledTemperatureAvatar value={schedule.temperature} fill={percent(schedule.temperature, schedule.targetTemperature)} />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>
                    </React.Fragment>
                )
            }}
        </Page>      
    );
}

export default withStyles(styles)(TemperaturesPage);
