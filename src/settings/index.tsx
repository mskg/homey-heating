import { CssBaseline, MuiThemeProvider } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import { createMuiTheme } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { AppRouter } from "./router";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
  },
});

ReactDOM.render(
  <ErrorBoundary>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: "bottom", horizontal: "left" }} style={{maxWidth: 280}}>
        <AppRouter />
      </SnackbarProvider>
    </MuiThemeProvider>
  </ErrorBoundary>
  , document.querySelector("#root"));
