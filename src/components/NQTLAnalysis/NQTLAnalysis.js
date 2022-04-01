import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import WarningIcon from "@material-ui/icons/Warning";
import ScrollToTop from "../ScrollToTop";
import FileSummaryTable from "../FileSummaryTable";
import OutOfNetworkTable from "./OutOfNetworkTable";
import DeniedClaimsTable from "./DeniedClaimsTable";
import TimelinessTable from "./TimelinessTable";
import PreviewModal from "../PreviewModal";
import VariableSelect from "../VariableSelect";
import SubmitButton from "../SubmitButton";
import NumericTextField from "../NumericTextField";
import CharacterTextField from "../CharacterTextField";
import UserVariablesTable from "../UserVariablesTable";
import PDFDownloadButton from "../PDFDownloadButton";
import ClaimsDataDownloadButton from "../ClaimsDataDownloadButton";
import CheckboxValues from "../CheckboxValues";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    flexGrow: 1,
  },
  paper: {
    marginTop: 3,
    padding: theme.spacing(2),
    flexGrow: 1,
  },
  titleMargin: {
    marginLeft: 20,
  },
  metricMargin: {
    marginBottom: 10,
    marginLeft: 20,
  },
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  subtitle: {
    fontSize: 14,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 10,
    color: "#177BAD",
  },
  downloadButtons: {
    position: "absolute",
    top: "100px",
    right: "0",
  },
}));

export default function NQTLAnalysis(props) {
  const classes = useStyles();
  const [requiredFieldsMissing, setRequiredFieldsMissing] = useState(false);
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);

  const timelinessResults = useSelector(
    (state) => state.submit.timelinessResults
  );
  const outOfNetworkResults = useSelector(
    (state) => state.submit.outOfNetworkResults
  );
  const deniedClaimsResults = useSelector(
    (state) => state.submit.deniedClaimsResults
  );

  const dataPreview = useSelector((state) => state.upload.dataPreview);

  const timelinessThreshold = claimsCols.find(
    (col) => col.setting === "timeliness_days"
  ).value[0];

  useEffect(() => {
    document.title = "MHPAEA Analysis Tool | NQTL Analysis";
  }, []);

  const nqtlAnalysisCols = [
    "date_received",
    "date_processed",
    "timeliness_days",
    "allowed_amt",
    "adjudication_status",
    "approved_values",
    "date_received_format",
    "date_processed_format",
  ];

  const pdfOptions = {
    margin: [1, 0.75],
    filename: "MHPAEA NQTL Results.pdf",
    jsPDF: { unit: "in", format: "letter", orientation: "l" },
    pagebreak: {
      after: [
        "#file-summary-table",
        "#selected-variables-table",
        "#denied-claims-table",
        "#out-of-network-table",
      ],
    },
  };

  return (
    <Grid container spacing={2}>
      <ScrollToTop />
      {/*User selected variables*/}
      <Grid item style={{ width: "340px" }}>
        <Paper className={classes.paper}>
          <Grid
            container
            row
            justify="space-between"
            alignItems="center"
            style={{ marginTop: -10 }}
          >
            <Grid item>
              <text style={{ opacity: 0.7, fontSize: 12 }}>* = Required</text>
            </Grid>
            <Grid item>{dataPreview && <PreviewModal />}</Grid>
          </Grid>
          {requiredFieldsMissing && (
            <Grid container row justify="space-between" alignItems="left">
              <text style={{ opacity: 0.7, fontSize: 12, color: "red" }}>
                *Required fields missing.
              </text>
            </Grid>
          )}
          <hr style={{ marginTop: 0 }} />
          <text style={{ color: "#177BAD" }}>
            Please select the variables corresponding to:
          </text>
          <br />
          <br />
          <Grid container row spacing={2}>
            <h6 className={classes.subtitle}>Claim Information</h6>
            <VariableSelect id="date_received" />
            <CharacterTextField id="date_received_format" />
            <VariableSelect id="date_processed" />
            <CharacterTextField id="date_processed_format" />
            <NumericTextField id="timeliness_days" />

            <h6 className={classes.subtitle}>Payment Information</h6>
            <VariableSelect id="allowed_amt" />

            <h6 className={classes.subtitle}>Adjudication</h6>
            <VariableSelect id="adjudication_status" />
            {claimsCols.find((obj) => obj.setting === "adjudication_status")
              .name !== "" && <CheckboxValues labelRequired={true} label="Paid or Approved Values" setting="approved_values"/>}
          </Grid>

          <hr />
          <Grid container row spacing={2}>
            <SubmitButton
              api={"api/nqtlreport"}
              analysis={"nqtl"}
              cols={nqtlAnalysisCols}
              setRequiredFieldsMissing={setRequiredFieldsMissing}
            />
          </Grid>
        </Paper>
      </Grid>

      {/*NQTL Analysis Results*/}
      <Grid item style={{ width: "calc(100vw - 630px)" }}>
        <Paper className={classes.paper}>
          {timelinessResults.length === 0 &&
            outOfNetworkResults.length === 0 &&
            deniedClaimsResults.length === 0 && (
              <Grid container justify="center" alignItems="center">
                <Grid item>
                  <WarningIcon style={{ color: "#FDA65E", fontSize: 70 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h5">
                    Results will appear once data is submitted.
                  </Typography>
                </Grid>
              </Grid>
            )}
          {timelinessResults.length > 0 &&
            outOfNetworkResults.length > 0 &&
            deniedClaimsResults.length > 0 && (
              <Grid item>
                <ScrollToTop />
                <div className={classes.downloadButtons}>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    justify="center"
                    alignItems="flex-end"
                  >
                    <Grid item>
                      <PDFDownloadButton
                        reportName="NQTL Analysis"
                        pdfOptions={pdfOptions}
                      />
                    </Grid>
                    <Grid item>
                      <ClaimsDataDownloadButton api="api/nqtlexport" />
                    </Grid>
                  </Grid>
                </div>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Grid item>
                    <div className="downloadableReport">
                      <Typography
                        variant={"h5"}
                        className={classes.titleMargin}
                      >
                        File Summary
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className={classes.grid}
                      >
                        <FileSummaryTable dropSkippedLines={true} />
                      </Grid>
                    </div>
                  </Grid>
                </Grid>

                <br />

                <Grid container justify="center">
                  <Grid item>
                    <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                      <UserVariablesTable />
                    </Grid>
                  </Grid>
                </Grid>

                <br />

                <div className="downloadableReport">
                  <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item>
                    <Typography
                        variant={"h5"}
                        className={classes.titleMargin}
                      >
                        Metrics
                      </Typography>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.metricMargin}
                      >
                        Disparity: MH/SUD claims are denied at <b>Disparity%</b> of the rate 
                        that Med/Surg claims are denied
                      </Typography>

                      <Typography
                        variant={"h5"}
                        className={classes.titleMargin}
                      >
                        Denied Claims Analysis
                      </Typography>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.titleMargin}
                      >
                        This analysis compares the denial rate of MH/SUD and
                        Med/Surg claim lines. If MH/SUD claim lines are denied
                        at a higher rate, then the last column will display a
                        positive percent.
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className={classes.grid}
                      >
                        <DeniedClaimsTable />
                      </Grid>

                      <Typography
                        variant={"h5"}
                        className={classes.titleMargin}
                      >
                        Out of Network Analysis
                      </Typography>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.titleMargin}
                      >
                        This analysis tests network adequacy by comparing the
                        out of network rate of MH/SUD and Med/Surg claim lines.
                        If MH/SUD claim lines have a higher out of network rate,
                        then the last column will display a positive percent.
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className={classes.grid}
                      >
                        <OutOfNetworkTable />
                      </Grid>

                      <Typography
                        variant={"h5"}
                        className={classes.titleMargin}
                      >
                        Timeliness Analysis
                      </Typography>
                      <Typography
                        variant={"subtitle1"}
                        className={classes.titleMargin}
                      >
                        This analysis tests timeliness by comparing the rate of
                        MH/SUD and Med/Surg claim lines over{" "}
                        {timelinessThreshold} days. If a higher rate of MH/SUD
                        claim lines are over the threshold, then the last column
                        will display a positive percent.
                      </Typography>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className={classes.grid}
                      >
                        <TimelinessTable
                          timelinessThreshold={timelinessThreshold}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            )}
        </Paper>
      </Grid>
    </Grid>
  );
}
