import "./App.css";
import React from "react";
import { HashRouter as Router } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import SideDrawer from "./components/SideDrawer";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App(props) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#177BAD",
        light: "#FFFFFF",
        contrastText: "#FFFFFF",
      },
      secondary: { main: "#FFFFFF", contrastText: "#fff", light: "#FFFFFF" },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SideDrawer />
      </Router>
    </ThemeProvider>
  );
}
