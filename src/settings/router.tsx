import * as React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import OverviewPage from "./pages/overview";
import PlanDetailPage from "./pages/plan";
import PlanExceptionsPage from "./pages/plan-exceptions";
import PlanSchedulePage from "./pages/plan-schedule";
import TemperaturesPage from "./pages/temperatures";
import SettingsPage from "./pages/settings";

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
          <Route exact path="/plans/schedule" component={TemperaturesPage} />          
          <Route path="/plans/new" component={PlanDetailPage} />
          <Route path="/plans/:id/exceptions" component={PlanExceptionsPage} />
          <Route path="/plans/:id/schedule" component={PlanSchedulePage} />
          <Route path="/plans/:id" component={PlanDetailPage} />          

          <Redirect path="*" to="/" />
        </Switch>
      </React.Fragment>
    </HashRouter>;
  }
}
