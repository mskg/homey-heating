import * as React from "react";
import { HashRouter, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";

import OverviewPage from "./pages/overview";
import PlanDetailPage from "./pages/plan";
import PlanExceptionsPage from "./pages/plan-exceptions";
import PlanSchedulePage from "./pages/plan-schedule";
import TemperaturesPage from "./pages/temperatures";
import SettingsPage from "./pages/settings";
import { PlanProvider } from "./state/PlanProvider";

const PlanRoutes: React.FunctionComponent<RouteComponentProps> = ({match}) => {
  return (
    <PlanProvider>
      {/* <Route path={`${match.url}/new`} exact component={PlanDetailPage} /> */}
      <Route path={`${match.url}/:id/exceptions`} exact component={PlanExceptionsPage} />
      <Route path={`${match.url}/:id/schedule`} exact component={PlanSchedulePage} />
      <Route path={`${match.url}/:id`} exact component={PlanDetailPage} />
    </PlanProvider>
  );
};

export class AppRouter extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return <HashRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/settings" component={SettingsPage} />

          <Route exact path="/" component={OverviewPage} />
          <Route exact path="/temperatures" component={TemperaturesPage} />
          <Route path="/plans" component={PlanRoutes} />

          {/* <Redirect path="*" to="/" /> */}
        </Switch>
      </React.Fragment>
    </HashRouter>;
  }
}
