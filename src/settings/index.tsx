import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from "./router";
import { ErrorBoundary } from "./components/ErrorBoundary"
import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import pink from '@material-ui/core/colors/pink';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink
  }
});

ReactDOM.render(
  <ErrorBoundary>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </MuiThemeProvider>
  </ErrorBoundary>
  , document.querySelector("#root"));