import React, { Component, Fragment } from "react";
import translate from "../i18n/Translation";

type State = {
  hasError: boolean;

  error?: Error;
  info?: any
};

type Props = {
};

export class ErrorBoundary extends Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  public componentDidCatch(error, info) {
    this.setState({ hasError: true, error, info });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Fragment>
          <h1>{translate("confirm.title")}</h1>
          <div style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info.componentStack}
          </div>
        </Fragment>
      );
    }

    return this.props.children;
  }
}
