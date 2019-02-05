import { Button } from '@material-ui/core';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ArrowBackIos';
import CancelIcon from '@material-ui/icons/Cancel';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { IHeatingPlan, OverrideMode } from '../../app/model';
import AppHeader from "../components/AppHeader";
import BodyText from '../components/BodyText';
import { MenuButton } from '../components/Menu';
import OverrideSetting from '../components/plan-overview/OverrideSetting';
import SubHeader from '../components/SubHeader';
import translate from '../i18n/Translation';
import Page from '../layouts/Page';

const styles: StyleRulesCallback = (theme) => ({
    resetPadding: {
        paddingBottom: 100,
        paddingLeft: 0,
        paddingRight: 0,
    },
});

type Props = WithStyles<typeof styles> & RouteComponentProps<void,{},IHeatingPlan>;

const ScheduleExceptionsPage: React.StatelessComponent<Props> = (props: Props) => {
    const { location, history, classes } = props;

    const [isDirty, setDirty] = React.useState<boolean>(false);
    const [overrides, setOverrides] = React.useState(JSON.parse(JSON.stringify(location.state.overrides || [])));
    
    React.useEffect(() => {
        // we need a deep copy
        setOverrides(JSON.parse(JSON.stringify(location.state.overrides || [])));
        setDirty(false);
    }, [location]);

    function onCancelDialog() {
        history.replace({
            pathname: `/plans/${location.state.id}`,
            state: location.state
        });    
    }

    function onSaveDialog() {
        history.replace({
            pathname: `/plans/${location.state.id}`,
            state: {...location.state, overrides: overrides}
        });
    }

    const getOverride = (mode: OverrideMode) => {
        var override = overrides != null
            // made an error in first implementation storing the number instead of the value
            ? (overrides[OverrideMode[mode]] || overrides[mode])
            : null;

        return {
            mode: mode,
            enabled: override != null && override.targetTemperature != 0,
            targetTemperature: override != null ? override.targetTemperature : 0
        }
    };

    const updateOverride = (mode: OverrideMode, target: number) => {
        setOverrides(old => {
            let newOverrides= old;

            if (newOverrides == null && target == 0) return old;
            if (newOverrides == null) {
                newOverrides = {};
            }

            if (target == 0) {
                delete newOverrides[OverrideMode[mode]];
                delete newOverrides[mode];
            }
            else {
                newOverrides[OverrideMode[mode]] = {
                    targetTemperature: target
                };
            }

            return newOverrides;
        });

        setDirty(true);
    }

    return (
        <Page>
        {{
            header: (
                <AppHeader>
                {{
                    title: translate("overrides.title"),
                    button: (
                        <MenuButton onClick={onCancelDialog} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
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
            ),
            paddingTop: 50,
            body: (
                <div className={classes.resetPadding}>
                    <SubHeader text={translate("overrides.section")} />
                    <BodyText text={translate("overrides.text")} />

                    <OverrideSetting text={translate("overrides.athome")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAtHome)} />
                    <OverrideSetting text={translate("overrides.away")} setOverride={updateOverride} {...getOverride(OverrideMode.DayAway)} />
                    <OverrideSetting text={translate("overrides.sleeping")} setOverride={updateOverride} {...getOverride(OverrideMode.Sleep)} />
                    <OverrideSetting text={translate("overrides.holiday")} setOverride={updateOverride} {...getOverride(OverrideMode.Holiday)} />
                </div>
            )
        }}
        </Page>
    );
}

export default withRouter(withStyles(styles)(ScheduleExceptionsPage));