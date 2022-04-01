import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Grid } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import clsx from "clsx";
import { green, red } from "@material-ui/core/colors";
import {
  BROWSE_FILE,
  CLEAR_UPLOAD,
  UPLOAD_FAILURE_TOGGLE,
} from "../../actions/types";

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
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
  buttonFailure: {
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
  },
  input: {
    display: "none",
  },
}));

export default function BrowseButton(props) {
  const classes = useStyles();
  const browseSuccess = useSelector((state) => state.browse.browseSuccess);
  const browseFailure = useSelector((state) => state.browse.browseFailure);
  const uploadFailure = useSelector((state) => state.upload.failure);
  const dispatch = useDispatch();

  const ExcelCsvTypes = [
    "application/vnd.ms-excel",
    ".csv",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const buttonClassname = clsx({
    [classes.buttonSuccess]: browseSuccess,
    [classes.buttonFailure]: browseFailure,
  });

  function ChooseFile(e) {
    if (uploadFailure) {
      dispatch({ type: UPLOAD_FAILURE_TOGGLE });
    }
    var file = e.target.files[0];
    dispatch({ type: BROWSE_FILE, payload: file });
    dispatch({ type: CLEAR_UPLOAD });
  }

  return (
    <Grid item>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          <form id="browseForm">
            <input
              accept={ExcelCsvTypes}
              className={classes.input}
              id="contained-button-file"
              onChange={ChooseFile}
              type="file"
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                color="default"
                value={props.value}
                className={buttonClassname}
                startIcon={<CloudUploadIcon />}
              >
                Browse
              </Button>
            </label>
          </form>
        </div>
      </div>
    </Grid>
  );
}
