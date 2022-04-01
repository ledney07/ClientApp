import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import SendIcon from "@material-ui/icons/Send";
import ErrorIcon from "@material-ui/icons/Error";
import { getId, getLocation } from "./DataReadIn/RestPath";
import { REPORT_ID, SUBMIT_COLS, SUBMIT_GET } from "../actions/types";
const dataForge = require("data-forge");

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700],
    },
    verticalAlign: "top",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "30%",
    left: "30%",
    marginTop: -15,
    marginLeft: -15,
  },
  buttonFailure: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
    verticalAlign: "top",
  },
}));

export default function SubmitButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const uploadLocation = useSelector((state) => state.upload.uploadLocation);
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const [errorLength, setErrorLength] = useState(0);
  const [failureMessage, setFailureMessage] = useState("");

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
    [classes.buttonFailure]: failure,
  });

  useEffect(() => {
    setErrorLength(countErrors(claimsCols));
    // eslint-disable-next-line
  }, [claimsCols]);

  function countErrors(data) {
    var tmp = new dataForge.DataFrame(data)
      .where((row) => props.cols.includes(row.setting))
      .where((row) => row.required === true)
      .subset(["value"])
      .where((row) => row.value.length === 0)
      .toArray();
    return tmp.length;
  }

  function checkRequiredFields() {
    if (errorLength >= 1) {
      dispatch({ type: SUBMIT_COLS });
      props.setRequiredFieldsMissing(true);
    } else if (errorLength === 0) {
      props.setRequiredFieldsMissing(false);
      runSubmit();
    }
    /* Below code should be commented IN to test without backend and then commented OUT when deploying for build */
    // getReportFetch();
  }

  async function getReportFetch(x) {
    await fetch(x, {
      method: "GET",
    })
      /* Below code should be commented IN to test without backend and then commented OUT when deploying for build */
      // await fetch("submit.json", {
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
        setFailure(true);
        setProgress(false);
      })
      .then((data) => {
        if (data.status === "Enqueued" || data.status === "InProgress") {
          setLoadingPercent(data.progress);
          setFailure(false);
          setSuccess(false);
          getReportFetch(x);
        } else if (data.status === "Complete") {
          dispatch({
            type: SUBMIT_GET,
            payload: {
              data: data,
              analysis: props.analysis,
            },
          });
          setProgress(false);
          setSuccess(true);
        } else if (data.status === "Failed") {
          setFailure(true);
          setProgress(false);
          setFailureMessage("Analysis failed. Please try again.");
        } else if (data.status === "DateFormatError") {
          setFailure(true);
          setProgress(false);
          setFailureMessage(
            "Analysis failed due to invalid date formats. Please try again."
          );
        }
        return data;
      });
  }

  async function runSubmit() {
    if (!progress) {
      setProgress(true);

      let report = "";
      var data = {};
      data.uploadUrl = uploadLocation;
      data.settings = claimsCols;

      await fetch(props.api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((result) => {
          report = getLocation(result);
          dispatch({ type: REPORT_ID, payload: getId(result) });
        })
        .catch((error) => {
          console.error("Error:", error);
          setFailure(true);
          setProgress(false);
        })
        .then(() => {
          getReportFetch(report);
        });
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
        <Button
          variant="contained"
          color="default"
          value={props.value}
          className={buttonClassname}
          onClick={checkRequiredFields}
          endIcon={<SendIcon />}
        >
          Submit Data
        </Button>

        {progress && (
          <Box
            position="relative"
            display="inline-flex"
            style={{ marginLeft: 15 }}
          >
            <CircularProgress size={38} className={classes.buttonProgress} />
            <Typography
              variant="caption"
              component="div"
              color="textSecondary"
            >{`${loadingPercent}%`}</Typography>
          </Box>
        )}

        {failure && (
          <Box
            position="relative"
            display="inline-flex"
            style={{ marginLeft: 10, marginTop: 5 }}
          >
            <ErrorIcon style={{ marginLeft: 10, color: red[500] }} />
            <text style={{ marginLeft: 10, marginTop: 3, color: red[500] }}>
              {failureMessage}
            </text>
          </Box>
        )}
      </div>
    </div>
  );
}
