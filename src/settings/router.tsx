import * as React from "react";
import { HashRouter, Route, RouteComponentProps, Switch } from "react-router-dom";
import { Loading } from "./components/Loading";
import { PlanProvider } from "./state/PlanProvider";

const PlanDetailPage = React.lazy(() => import("./pages/plan"));
const PlanExceptionsPage = React.lazy(() => import("./pages/plan-exceptions"));
const PlanSchedulePage = React.lazy(() => import("./pages/plan-schedule"));
const AllSchedulesPage = React.lazy(() => import("./pages/schedules"));

const PlanRoutes: React.FunctionComponent<RouteComponentProps> = ({ match }) => {
  return (
    <PlanProvider>
      {/* <Route path={`${match.url}/new`} exact component={PlanDetailPage} /> */}
      <Route path={`${match.url}/:id/exceptions`} exact={true} component={PlanExceptionsPage} />
      <Route path={`${match.url}/:id/schedule`} exact={true} component={PlanSchedulePage} />
      <Route path={`${match.url}/:id`} exact={true} component={PlanDetailPage} />
    </PlanProvider>
  );
};

const OverviewPage = React.lazy(() => import("./pages/overview"));
const SettingsPage = React.lazy(() => import("./pages/settings"));
const TemperaturesPage = React.lazy(() => import("./pages/temperatures"));

export class AppRouter extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <React.Suspense fallback={<Loading />}>
        <HashRouter>
          <React.Fragment>
            <Switch>
              <Route exact={true} path="/" component={OverviewPage} />

              <Route exact={true} path="/settings" component={SettingsPage} />
              <Route exact={true} path="/temperatures" component={TemperaturesPage} />
              <Route exact={true} path="/schedules" component={AllSchedulesPage} />

              <Route path="/plans" component={PlanRoutes} />
            </Switch>
          </React.Fragment>
        </HashRouter>
      </React.Suspense>
    );
  }
}
