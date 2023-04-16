import { StyleRulesCallback, withStyles, WithStyles } from "@material-ui/core/styles";
import { withSnackbar, WithSnackbarProps } from "notistack";
import React from "react";
import { RouteComponentProps } from "react-router";
import { withRouter } from "react-router-dom";
import { usePlans } from "../api/hooks";
import AppHeader from "../components/AppHeader";
import BodyText from "../components/BodyText";
import { AppMenuButton } from "../components/Menu";
import SubHeader from "../components/SubHeader";
import translate from "../i18n/Translation";
import Page from "../layouts/Page";
const Chart = React.lazy(() => import("../components/TemperatureChart"));

const styles: StyleRulesCallback<any, any> = (theme) => ({
    list: {
        marginTop: 0,
        marginBottom: theme.spacing(2),
    },
});

type Props = WithStyles<typeof styles> & RouteComponentProps & WithSnackbarProps;

const SchedulesPage: React.FunctionComponent<Props> = (_props) => {
    const { plans } = usePlans();

    return (
        <Page>
            {{
                header: (<AppHeader title={translate("menu.schedules")} button={<AppMenuButton />} />),
                paddingTop: 50,
                paddingBottom: 50,

                body: (
                    <React.Fragment>
                        { plans.length === 0
                            ? <BodyText style={{ paddingTop: 16 }} text={translate("plans.plans.empty")} />
                            : plans.map((plan) => (
                                <React.Fragment key={plan.id}>
                                    <SubHeader text={plan.name} />
                                    <Chart plan={plan} />
                                </React.Fragment>
                            ))
                        }
                    </React.Fragment>
                ),
            }}
        </Page>
    );
};

// @ts-ignore
export default withSnackbar(withRouter(withStyles(styles)(SchedulesPage)));
