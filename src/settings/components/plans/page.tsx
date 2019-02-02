import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { StyleRulesCallback, withStyles, WithStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import MenuIcon from '@material-ui/icons/Menu';
import { forEach, sortBy } from "lodash";
import React from 'react';
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from 'react-router-dom';
import { IHeatingPlan, OperationMode } from '../../../app/model';
import { planAPI, modeAPI } from '../../api/heating';
import { useDevices, usePlans, useZones, useMode } from '../../api/hooks';
import AddFab from "../AddFab";
import AppHeader from "../AppHeader";
import defautStyles from "../DefaultStyles";
import AppMenu from '../Menu';
import translate from '../../i18n/Translation';
import SubHeader from '../SubHeader';
import { FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';

const styles: StyleRulesCallback = (theme) => ({
    ...defautStyles(theme, theme.spacing.unit * 6), ...{
    }
});

type Props = WithStyles<typeof styles> & RouteComponentProps;

const PlansPage: React.StatelessComponent<Props> = (props) => {
    const { classes } = props;
    const { plans, loadPlans } = usePlans();
    const [openMenu, setOpenMenu] = React.useState<boolean>(false);
    const { zones } = useZones();
    const { devices } = useDevices();
    const { mode, loadMode } = useMode();

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

    const createNew = () => {
        props.history.push(`/plans/new`);
    }

    return (
        <React.Fragment>
            <AppHeader>
                {{
                    title: translate("plans.title"),
                    button: (
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { setOpenMenu(true); }}>
                            <MenuIcon />
                        </IconButton>
                    ),
                    subBar: (
                        <AppMenu open={openMenu} onClose={() => { setOpenMenu(false); }} />
                    )
                }}
            </AppHeader>

            <Paper square className={classes.paper}>
                <SubHeader text={translate("plans.heatingmode.section")} />
                <div className={classes.inputContainer}>
                    <FormControl className={classes.formControl}>
                        {/* <InputLabel>{translate("plans.heatingmode.label")}</InputLabel> */}

                        <Select
                            fullWidth
                            onChange={async (evt) => {
                                await modeAPI.setMode(parseInt(evt.target.value));
                                await loadMode();
                            }}
                            value={mode}
                        >
                            <MenuItem value={0}>{translate("Modes.0")}</MenuItem>
                            <MenuItem value={1}>{translate("Modes.1")}</MenuItem>
                            <MenuItem value={2}>{translate("Modes.2")}</MenuItem>
                            <MenuItem value={3}>{translate("Modes.3")}</MenuItem>
                            <MenuItem value={4}>{translate("Modes.4")}</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <SubHeader text={translate("plans.plans.section")} />
                <List className={classes.list}>
                    {plans.length > 0 && <Divider />}
                    {plans.map((plan) => (
                        <React.Fragment key={plan.id}>
                            <ListItem {...{ to: `/plans/${plan.id}` }} component={Link} button>
                                <ListItemText primary={plan.name} secondary={formatAttachments(plan)} />

                                <ListItemSecondaryAction>
                                    <Switch
                                        onChange={async () => { await planAPI.togglePlanState(plan); await loadPlans(); }}
                                        checked={plan.enabled} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>

            <AddFab onClick={createNew} />
        </React.Fragment>
    );
}

export default withRouter(withStyles(styles)(PlansPage));
