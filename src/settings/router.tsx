import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import PlansPage from "./components/plans/page";
import PlanDetailPage from "./components/plan-overview/page";
import SchedulesPage from "./components/schedule/page";
import SettingsPage from "./components/settings/page";

export class AppRouter extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  public render() {
    return <HashRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/settings" component={SettingsPage} />

          <Route exact path="/plans" component={PlansPage} />
          <Route exact path="/plans/schedule" component={SchedulesPage} />          
          <Route path="/plans/new" component={PlanDetailPage} />
          <Route path="/plans/:id" component={PlanDetailPage} />

          <Redirect path="*" to="/plans" />
        </Switch>
      </React.Fragment>
    </HashRouter>;
  }
}
