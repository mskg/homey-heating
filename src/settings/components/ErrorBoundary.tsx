import React from 'react';
import translate from "../i18n/Translation";

type State = {  
  hasError: boolean;

  error?: Error;
  info?: any
}

type Props = {
}

export class ErrorBoundary extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true, error: error, info: info });
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <React.Fragment>        
        <h1>{translate("confirm.title")}</h1>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.info.componentStack}
        </div>
      </React.Fragment>;
    }

    return this.props.children;
  }
}