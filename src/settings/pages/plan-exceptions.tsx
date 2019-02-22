import { Button } from "@material-ui/core";
import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import BackIcon from "@material-ui/icons/ArrowBackIos";
import CancelIcon from "@material-ui/icons/Cancel";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IHeatingPlan, OverrideMode } from "../../app/model";
import AppHeader from "../components/AppHeader";
import BodyText from "../components/BodyText";
import { MenuButton } from "../components/Menu";
import OverrideSetting from "../components/OverrideSetting";
import SubHeader from "../components/SubHeader";
import translate from "../i18n/Translation";
import Page from "../layouts/Page";
import { useHistory, useModifyExceptions, usePlan } from "../state/planHooks";

const styles: StyleRulesCallback = (_theme) => ({
    resetPadding: {
        paddingBottom: 100,
        paddingLeft: 0,
        paddingRight: 0,
    },
});

type Params = {
    id: string;
};

type Props = WithStyles<typeof styles> & RouteComponentProps<Params, {}, IHeatingPlan>;

const ScheduleExceptionsPage: React.FunctionComponent<Props> = (props: Props) => {
    const { history, classes } = props;

    const { plan } = usePlan(props.match.params.id);
    const { isDirty, updateOverride } = useModifyExceptions();
    const { undo, commit } = useHistory();

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

    const getOverride = (mode: OverrideMode) => {
        const override = plan.overrides != null
            // made an error in first implementation storing the number instead of the value
            ? (plan.overrides[OverrideMode[mode]] || plan.overrides[mode])
            : null;

        return {
            mode,
            enabled: override != null && override.targetTemperature !== 0,
            targetTemperature: override != null ? override.targetTemperature : 0,
        };
    };

    return (
        <Page>
            {{
                header: (
                    <AppHeader>
                        {{
                            title: translate("overrides.title"),
                            button: (
                                <MenuButton first={true} onClick={onCancelDialog} icon={isDirty ? <CancelIcon /> : <BackIcon />} />
                            ),
                            actions: (
                                <React.Fragment>
                                    {isDirty &&
                                        <Button color="inherit" onClick={onSaveDialog}>
                                            {translate("schedule.save")}
                                        </Button>
                                    }
                                </React.Fragment>
                            ),
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
                        <OverrideSetting text={translate("overrides.outofseason")} setOverride={updateOverride} {...getOverride(OverrideMode.OutOfSeason)} />
                    </div>
                ),
            }}
        </Page>
    );
};

export default withRouter(withStyles(styles)(ScheduleExceptionsPage));
