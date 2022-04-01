import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import VariableSelect from "../VariableSelect";
import BrowseButton from "./BrowseButton";
import UploadButton from "./UploadButton";
import ClearDataButton from "./ClearDataButton";
import { Box, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { green, red } from "@material-ui/core/colors";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import ErrorIcon from "@material-ui/icons/Error";
import HelpButton from "./HelpButton";
import PreviewModal from "./PreviewModal";
import { PREVIEW_ROWS_COLUMNS } from "../../actions/types";
import ScrollToTop from "../ScrollToTop";
import CheckboxValues from "../CheckboxValues";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";


const dataForge = require("data-forge");

const useStyles = makeStyles((themes) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 10,
  },
  button: {
    margin: 5,
  },
  backdrop: {
    zIndex: themes.zIndex.drawer + 1,
    color: "#fff",
  },
  subtitle: {
    display: "block",
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    color: "#177BAD",
  },
  buttonProgress: {
    color: green[500],
    position: "absolute",
    top: "30%",
    left: "30%",
    marginTop: -15,
    marginLeft: -15,
  },
}));

export default function DataReadIn(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const showUploadButton = useSelector(
    (state) => state.browse.showUploadButton
  );
  const fileTypeFeedback = useSelector(
    (state) => state.browse.fileTypeFeedback
  );
  const [progress, setProgress] = useState(0);
  const success = useSelector((state) => state.upload.success);
  const failure = useSelector((state) => state.upload.failure);
  const showProgress = useSelector((state) => state.upload.showProgress);
  const dataPreview = useSelector((state) => state.upload.dataPreview);
  const uploadFileCols = useSelector((state) => state.upload.uploadFileCols);
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const sideBarGreySpaceWidth = "290px";
  const userInputsWidth = "360px";
  const dataPreviewWidth =
    "calc(100vw - " + userInputsWidth + " - " + sideBarGreySpaceWidth + ")";
  const errorMessage = useSelector((state) => state.upload.errorMessage);
  const [errorLength, setErrorLength] = useState(0);

  useEffect(() => {
    document.title = "MHPAEA Analysis Tool | Data Read In";
  }, []);

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
          "procedure_code_modifier",
          "ndc_code",
          "revenue_code",
          "mhsud_indicator",
          "mhsud_values",
          "medsurg_indicator",
          "medsurg_values",
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

  useEffect(() => {
    // Get the column names.
    let columns = new Array(uploadFileCols.length);
    uploadFileCols.sort((a, b) => a.number - b.number);
    for (let col of uploadFileCols) {
      columns[col.number] = { field: col.name };
    }

    // Get the rows.
    let rows = [];
    let column;
    for (let cell of dataPreview) {
      while (rows.length < cell.row + 1) {
        rows.push({});
      }

      // Ignore cells beyond the input data's columns.
      if (cell.column >= columns.length) {
        continue;
      }
      // Get the column name.
      column = columns[cell.column].field;
      rows[cell.row][column] = cell.value;
    }
    rows.forEach((item, i) => {
      item.id = i + 1;
    });

    dispatch({
      type: PREVIEW_ROWS_COLUMNS,
      payload: { columns: columns, rows: rows },
    });
    // eslint-disable-next-line
  }, [dataPreview]);

  return (
    <Grid container spacing={2}>
      <ScrollToTop />
      <Grid item style={{ width: userInputsWidth }}>
        <Paper className={classes.paper}>
          <h5 style={{ color: "#177BAD" }}>User Inputs</h5>
          <p style={{ color: "#177BAD" }}>Step 1: Select and upload file</p>
          <p style={{ opacity: 0.7, fontSize: 12, marginTop: -10 }}>
            Accepted file types: XLSX, CSV. Data must be in the first tab of
            your spreadsheet.
          </p>
          <Grid container direction="row" justify="space-between" spacing={1}>
            <Grid item>
              <Grid container direction="row">
                <Grid item>
                  <BrowseButton value={"claims_button"} />
                </Grid>
                <Grid item>
                  <UploadButton
                    disabled={!showUploadButton}
                    setProgress={setProgress}
                  />
                </Grid>
                <Grid item>
                  <ClearDataButton />
                </Grid>
                <Grid item>
                  <HelpButton box={"Claims"} />
                </Grid>
              </Grid>
              <Grid container direction="row">
                <Grid item>{fileTypeFeedback}</Grid>
                <Grid item>
                  {showProgress && (
                    <Box
                      position="relative"
                      display="inline-flex"
                      style={{ marginLeft: 15 }}
                    >
                      <CircularProgress
                        size={38}
                        className={classes.buttonProgress}
                      />
                      <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary"
                      >{`${Math.round(progress * 100)}%`}</Typography>
                    </Box>
                  )}
                  {success && (
                    <Box
                      position="relative"
                      display="inline-flex"
                      style={{ marginLeft: 10 }}
                    >
                      <CloudDoneIcon
                        style={{ marginLeft: 10, color: green[500] }}
                      />
                      <text
                        is="custom"
                        style={{
                          marginLeft: 10,
                          marginTop: 3,
                          color: green[500],
                        }}
                      >
                        Upload complete.
                      </text>
                    </Box>
                  )}
                  {failure && (
                    <Box
                      position="relative"
                      display="inline-flex"
                      style={{ marginLeft: 10 }}
                    >
                      <ErrorIcon style={{ marginLeft: 10, color: red[500] }} />
                      <text
                        is="custom"
                        style={{
                          marginLeft: 10,
                          marginTop: 3,
                          color: red[500],
                        }}
                      >
                        Upload failed. {`${errorMessage}`}
                      </text>
                    </Box>
                  )}
                </Grid>
                <Grid item>
                  {progress === 1 && showProgress && (
                    <Box
                      position="relative"
                      display="inline-flex"
                      style={{ marginLeft: 10 }}
                    >
                      <text is="custom" style={{ opacity: 0.5, fontSize: 12 }}>
                        Please wait while upload {<br />} finishes processing...
                      </text>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <hr />
          <p style={{ color: "#177BAD" }}>
            Step 2: Select the variables corresponding to:
          </p>
          <p style={{ opacity: 0.5, fontSize: 12, marginTop: -10 }}>
            * = Required
          </p>
          <Grid container direction="row" spacing={2}>
            <h6 className={classes.subtitle}>Claim Information</h6>
            <VariableSelect id="claim_number" />
            <VariableSelect id="claim_line_number" />

            <h6 className={classes.subtitle}>Provider Information</h6>
            <VariableSelect id="network_status" />

            {claimsCols.find((obj) => obj.setting === "network_status")
              .name !== "" && <CheckboxValues labelRequired={true} label="In Network Values" setting="network_values"/>}

            <h6 className={classes.subtitle}>Place of Service Information</h6>
            <VariableSelect id="place_of_service" />
            <VariableSelect id="inpatient_outpatient" />
            {claimsCols.find((obj) => obj.setting === "inpatient_outpatient")
              .name !== "" && <CheckboxValues labelRequired={true} label="Inpatient Values" setting="inpatient_values"/>}

            <h6 className={classes.subtitle}>Service Information</h6>
            {[
              "diagnosis_code",
              "procedure_code",
              "procedure_code_modifier",
              "ndc_code",
              "revenue_code",
            ].map((variable) => {
              return <VariableSelect key={variable} id={variable} />;
            })}
          </Grid>
          <hr />
          <Grid container direction="row" spacing={2}>
            <Grid item>
              <text is="custom" style={{ color: "#A80000" }}>
                Note: You should NOT fill in these fields unless
                you are testing the plan's own MHPAEA test results.
              </text>
            </Grid>
            <VariableSelect id="mhsud_indicator" />
              {claimsCols.find((obj) => obj.setting === "mhsud_indicator")
                .name !== "" && <CheckboxValues labelRequired={true} label="MH/SUD Values" setting="mhsud_values"/>}
            <VariableSelect id="medsurg_indicator" />
              {claimsCols.find((obj) => obj.setting === "medsurg_indicator")
                .name !== "" && <CheckboxValues labelRequired={true} label="Med/Surg Values" setting="medsurg_values"/>}
          </Grid>
          <hr />
          {/* Variable output dependant on filling out required fields. */}
          {errorLength === 0 && (
            <Grid item>
              <CheckCircleOutlineIcon
                style={{ marginRight: 10, color: "green" }}
              />
              <text is="custom" style={{ color: "#177BAD" }}>
                Step 3: Select an analysis tab from the sidebar.
              </text>
            </Grid>
          )}
          {errorLength !== 0 && (
            <Grid item>
              <ErrorIcon style={{ marginRight: 10, color: "#A80000" }} />
              <text is="custom" style={{ color: "#A80000" }}>
                Fill in all required fields.
              </text>
            </Grid>
          )}
        </Paper>
      </Grid>

      <Grid item style={{ width: dataPreviewWidth }}>
        <Paper className={classes.paper}>
          <Grid item>
            <PreviewModal />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}
