import { MenuItem, Select } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { forEach, sortBy } from "lodash";
import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from 'react-router-dom';
import { IHeatingPlan } from '../../app/model';
import { modeAPI, planAPI } from '../api/heating';
import { useDevices, useMode, usePlans, useZones } from '../api/hooks';
import AddFab from "../components/AddFab";
import AppHeader from "../components/AppHeader";
import InputContainer from "../components/InputContainer";
import { AppMenuButton } from '../components/Menu';
import SubHeader from '../components/SubHeader';
import translate from '../i18n/Translation';
import Page from "../layouts/Page";
import { withSnackbar, InjectedNotistackProps } from 'notistack';
import BodyText from '../components/BodyText';

const styles: StyleRulesCallback = (theme) => ({
    list: {
        marginTop: 0,
        marginBottom: theme.spacing.unit * 2,
    }
});

type Props = WithStyles<typeof styles> & RouteComponentProps & InjectedNotistackProps;

const OverviewPage: React.FunctionComponent<Props> = (props) => {
    const { classes } = props;
    const { plans, loadPlans } = usePlans();
    const { zones } = useZones();
    const { devices } = useDevices();
    const { mode, loadMode } = useMode();
    const [ modeChange, setModeChange ] = React.useState(false);

    function formatAttachments(plan: IHeatingPlan): string {
        let elements: string[] = [];

        forEach(plan.devices, d => {
            const device = devices[d];
            if (device != null) {
                elements.push(device.name);
            }
        });

        forEach(plan.zones, d => {
            const zone = zones[d];
            if (zone != null) {
                elements.push(zone.name);
            }
        });

        return sortBy(elements, e => e).join(", ");
    }

    const setHeatingMode = mode => {
        (async () => { 
            setModeChange(true);
            await modeAPI.setMode(parseInt(mode));
            props.enqueueSnackbar(translate("plans.modechanged", {
                name: translate(`Modes.${mode}`)
            }));
            await loadMode();
            setModeChange(false);
        })();
    };

    const toggleState = (plan) => {
        (async () => { 
            await planAPI.togglePlanState(plan); 
            props.enqueueSnackbar(translate("plans.toggled", {
                name: plan.name
            }));
            await loadPlans(); 
        })();
    };

    const createNew = () => {
        props.history.push(`/plans/new`);
    };

    return (        
        <Page>
            {{
                header: (<AppHeader title={translate("plans.title")} button={<AppMenuButton />} />),
                paddingTop: 50,
                paddingBottom: 50,

                body: (
                    <React.Fragment>
                        <SubHeader text={translate("plans.heatingmode.section")} />
                        <InputContainer>
                            <Select
                                fullWidth
                                disabled={modeChange}
                                onChange={(evt) => setHeatingMode(evt.target.value)}
                                value={mode}
                            >
                            {
                                [0,1,2,3,4,5].map(m=>
                                    (<MenuItem value={m}>{translate(`Modes.${m}`)}</MenuItem>)
                                )
                            }
                            </Select>
                        </InputContainer>

                        <SubHeader text={translate("plans.plans.section")} />
                        { plans.length == 0
                            ? <BodyText style={{paddingTop: 16}} text={translate("plans.plans.empty")} />
                            : <List className={classes.list}>
                                {plans.length > 0 && <Divider />}
                                {plans.map((plan) => (
                                    <React.Fragment key={plan.id}>
                                        <ListItem {...{ to: `/plans/${plan.id}` }} component={Link} button>
                                            <ListItemText primary={plan.name} secondary={formatAttachments(plan)} />

                                            <ListItemSecondaryAction>
                                                <Switch
                                                    onChange={() => toggleState(plan)}
                                                    checked={plan.enabled} />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <Divider />
                                    </React.Fragment>
                                ))}
                            </List>
                        }
                        <AddFab onClick={createNew} />
                    </React.Fragment>
                )
            }}
        </Page>
    );
}

export default withSnackbar(withRouter(withStyles(styles)(OverviewPage)));
