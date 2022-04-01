import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Divider,
  Tooltip,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Container,
} from "@material-ui/core";
import SideDrawerItem from "./SideDrawerItem";
import IconButton from "@material-ui/core/IconButton";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import DescriptionRoundedIcon from "@material-ui/icons/DescriptionRounded";
import HomeIcon from "@material-ui/icons/Home";
import BlurLinearIcon from "@material-ui/icons/BlurLinear";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useLocation } from "react-router-dom";
import Routes from "./Routes";
import { useSelector } from "react-redux";
const dataForge = require("data-forge");
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  img: {
    marginRight: "20px",
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  listIcon: {
    minWidth: "40px",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    marginTop: 25,
    height: `calc(100vh - 25px)`, // Height minus the margin to prevent tab'ing misbehavior
    overflowY: "overlay",
  },
  container: {
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  assistanceIcon: {
    "&:hover": {
      color: "#DCDCDC",
    },
  },
}));

export default function SideDrawer(props) {
  const classes = useStyles();
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const version = useSelector((state) => state.version.toolVersion);
  let location = useLocation();

  const [errorLength, setErrorLength] = useState([]);

  // Send a GET request to the backend to download the specified file.
  function getDocumentation(requestDocument) {
    const path = "api/documentation";
    const requestParameters =
      encodeURIComponent("document") +
      "=" +
      encodeURIComponent(requestDocument);
    return path.concat("?", requestParameters);
  }

  // Get number of errors
  function countErrors(data) {
    var tmp = new dataForge.DataFrame(data)
      .where((row) =>
        [
          "claim_number",
          "claim_line_number",
          "network_status",
          "network_values",
          "place_of_service",
          "inpatient_outpatient",
          "inpatient_values",
          "diagnosis_code",
          "procedure_code",
          "ndc_code",
          "revenue_code",
          "procedure_code_modifier",
        ].includes(row.setting)
      )
      .where((row) => row.required === true)
      .subset(["value"])
      .where((row) => row.value.length === 0)
      .toArray();
    return tmp.length;
  }

  // Set the number of errors to be addressed in column input
  useEffect(() => {
    setErrorLength(countErrors(claimsCols));
  }, [claimsCols]);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={clsx(classes.appBar)}>
        <Toolbar className={classes.toolbar}>
          <img
            src="dol_logo.png"
            width="50"
            height="50"
            alt="DOL Logo"
            className={classes.img}
          />

          <Typography
            component="h1"
            variant="h5"
            color="inherit"
            noWrap
            className={classes.title}
          >
            MHPAEA Analysis Tool
          </Typography>
          <IconButton
            key="ReferenceGuide"
            component="a"
            aria-label="Download User Reference Guide"
            href={getDocumentation("reference_guide")}
            target="_top"
            color="inherit"
            className={classes.assistanceIcon}
          >
            <Tooltip
              placement="bottom"
              aria-hidden="false"
              title={
                <text style={{ fontSize: 12 }}>
                  Download User Reference Guide
                </text>
              }
            >
              <DescriptionRoundedIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            key="Email"
            component="a"
            aria-label="E-Mail EBSA Help Desk"
            href={
              "mailto:zzEBSA-Summit-Help-Desk@dol.gov?subject=" +
              "Issue with MHPAEA Tool"
            }
            target="_top"
            color="inherit"
            className={classes.assistanceIcon}
          >
            <Tooltip
              placement="bottom"
              aria-hidden="false"
              title={
                <text style={{ fontSize: 12 }}>E-mail EBSA Help Desk</text>
              }
            >
              <EmailRoundedIcon />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper),
        }}
      >
        <Toolbar />
        <Divider />
        <List>
          <SideDrawerItem
            path={"/data_read_in"}
            location={location.pathname}
            itemText={"Data Read In"}
            icon={<HomeIcon />}
            classes={classes.listIcon}
            errorLength={errorLength}
          />
          <SideDrawerItem
            path={"/nqtl_analysis"}
            location={location.pathname}
            itemText={"NQTL Analysis"}
            icon={<BlurLinearIcon />}
            classes={classes.listIcon}
            errorLength={errorLength}
          />
          <SideDrawerItem
            path={"/qtl_analysis"}
            location={location.pathname}
            itemText={"QTL/FR Analysis"}
            icon={<AssessmentIcon />}
            classes={classes.listIcon}
            errorLength={errorLength}
          />
        </List>
        <Typography
          variant="primary"
          style={{
            bottom: 5,
            position: "fixed",
            width: drawerWidth,
            textAlign: "center",
            fontSize: 12,
          }}
        >
          Version Number: {version}
          <br />
          Prepared by Summit Consulting, LLC
        </Typography>
      </Drawer>
      <main id="main-content" className={classes.content}>
        <Container maxWidth={false} className={classes.container}>
          <>
            <div className={classes.appBarSpacer} />
            <CssBaseline />
            <Routes />
            <div className={classes.toolbar} />
          </>
        </Container>
      </main>
    </div>
  );
}
