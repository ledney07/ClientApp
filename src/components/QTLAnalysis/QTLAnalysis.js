import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import VariableSelect from "../VariableSelect";
import PreviewModal from "../PreviewModal";
import SubmitButton from "../SubmitButton";
import PredominantTables from "./PredominantTables";
import SubstantiallyAllTable from "./SubstantiallyAllTable";
import WarningIcon from "@material-ui/icons/Warning";
import ScrollToTop from "../ScrollToTop";
import ResultsSummaryTable from "./ResultsSummaryTable";
import FileSummaryTable from "../FileSummaryTable";
import OfficeVisitsSummaryTable from "./OfficeVisitsSummaryTable";
import UserVariablesTable from "../UserVariablesTable";
import CharacterTextField from "../CharacterTextField";
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

export default function QTLAnalysis(props) {
  const classes = useStyles();
  const [requiredFieldsMissing, setRequiredFieldsMissing] = useState(false);
  const substantiallyAllResult = useSelector(
    (state) => state.submit.substantiallyAllResult
  );
  const predominantResult = useSelector(
    (state) => state.submit.predominantResult
  );
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const dataPreview = useSelector((state) => state.upload.dataPreview);

  useEffect(() => {
    document.title = "MHPAEA Analysis Tool | QTL/FR Analysis";
  }, []);

  const qtlAnalysisCols = [
    "service_start_date",
    "service_start_date_format",
    "procedure_code_modifier",
    "allowed_amt",
    "copay_amt",
    "coinsurance_amt",
    "deductible_amt",
    "moop_status",
    "adjudication_status",
    "approved_values",
    "moop_values",
    "moop_single",
    "moop_family",
    "moop_cum_single",
    "moop_cum_family",
    "applicable_copay",
    "applicable_coinsurance",
  ];

  const pdfOptions = {
    margin: [1, 0.75],
    filename: "MHPAEA QTL Analysis Results.pdf",
    jsPDF: { unit: "in", format: "letter", orientation: "l" },
    pagebreak: {
      after: [
        "#file-summary-table",
        "#selected-variables-table",
        "#results-summary-table",
        "#office-visits-summary-table",
        "#predominant-tables",
      ],
    },
  };

  function networkStatusFormatter(value) {
    if (value === "InNetwork") {
      return "In-Network";
    } else if (value === "OutNetwork") {
      return "Out-of-Network";
    }
    return;
  }

  function officeVisitFormatter(value) {
    if (value === "Office") {
      return "Office Visits";
    } else if (value === "Other") {
      return "All Other Services";
    }
  }

  function QTLAnalysisTable(props) {
    return (
      <Grid item>
        <Grid item xs={12} md={12} lg={12} className={classes.grid}>
          <div className="downloadableReport">
            <Typography variant={"h6"} className={classes.titleMargin}>
              {props.inpatientOutpatient} &{" "}
              {networkStatusFormatter(props.networkStatus)}{" "}
              {officeVisitFormatter(props.officeVisit)}
            </Typography>
            <SubstantiallyAllTable
              inpatientOutpatient={props.inpatientOutpatient}
              networkStatus={props.networkStatus}
              officeVisit={props.officeVisit}
            />
          </div>
          <PredominantTables
            inpatientOutpatient={props.inpatientOutpatient}
            networkStatus={props.networkStatus}
            officeVisit={props.officeVisit}
          />
        </Grid>
      </Grid>
    );
  }

  // Function to enable/disable MOOP selectors
  function disableSelector() {
    let moop_selectors = [
      "moop_single",
      "moop_family",
      "moop_cum_single",
      "moop_cum_family",
    ];

    if (claimsCols.find((obj) => obj.setting === "moop_status").name !== "") {
      return true;
    } else if (
      claimsCols.find((obj) => obj.setting === "moop_status").name === "" &&
      claimsCols
        .filter((obj) => moop_selectors.includes(obj.setting))
        .map((obj) => obj.name !== "")
        .every((obj) => obj === true)
    ) {
      return false;
    } else {
      return null;
    }
  }

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
            <h6 className={classes.subtitle}>Service Information</h6>
            <VariableSelect id="service_start_date" />
            <CharacterTextField id="service_start_date_format" />

            <h6 className={classes.subtitle}>Payment Information</h6>
            {[
              "allowed_amt",
              "copay_amt",
              "coinsurance_amt",
              "deductible_amt",
              "applicable_copay",
              "applicable_coinsurance",
            ].map((variable) => {
              return <VariableSelect id={variable} />;
            })}

            <h6 className={classes.subtitle}>Maximum Out-of-Pocket</h6>
            <VariableSelect
              disabled={disableSelector() !== null ? !disableSelector() : null}
              id="moop_status"
            />
            {claimsCols.find((obj) => obj.setting === "moop_status").name !==
              "" && (
              <CheckboxValues
                labelRequired={true}
                label="Over MOOP Values"
                setting="moop_values"
              />
            )}
            {[
              "moop_single",
              "moop_family",
              "moop_cum_single",
              "moop_cum_family",
            ].map((variable) => {
              return (
                <VariableSelect
                  disabled={
                    disableSelector() !== null ? disableSelector() : null
                  }
                  id={variable}
                />
              );
            })}

            <h6 className={classes.subtitle}>Adjudication</h6>
            <VariableSelect id="adjudication_status" />
            {claimsCols.find((obj) => obj.setting === "adjudication_status")
              .name !== "" && (
              <CheckboxValues
                labelRequired={true}
                label="Paid or Approved Values"
                setting="approved_values"
              />
            )}
          </Grid>
          <hr />
          <Grid container row spacing={2}>
            <SubmitButton
              api={"api/qtlreport"}
              analysis={"qtl"}
              cols={qtlAnalysisCols}
              setRequiredFieldsMissing={setRequiredFieldsMissing}
            />
          </Grid>
        </Paper>
      </Grid>

      {/*QTL Analysis Results*/}
      <Grid item style={{ width: "calc(100vw - 630px)" }}>
        <Paper className={classes.paper}>
          {substantiallyAllResult.length === 0 &&
            predominantResult.length === 0 && (
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
          {/*Results Summary*/}
          {substantiallyAllResult.length > 0 && predominantResult.length > 0 && (
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
                      reportName="QTL Analysis"
                      pdfOptions={pdfOptions}
                    />
                  </Grid>
                  <Grid item>
                    <ClaimsDataDownloadButton api="api/qtlexport" />
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
                    <Typography variant={"h5"} className={classes.titleMargin}>
                      File Summary
                    </Typography>
                    <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                      <FileSummaryTable />
                      Note: Skipped lines include unapproved and COVID-related
                      claims.
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

              <Grid item>
                <div className="downloadableReport">
                  <Typography variant={"h5"} className={classes.titleMargin}>
                    Summary of QTL/FR Analysis Results
                  </Typography>
                  <Typography
                    variant={"subtitle1"}
                    className={classes.titleMargin}
                  >
                    Detailed results are displayed in the tables below.
                  </Typography>
                  <Typography variant={"body2"} className={classes.titleMargin}>
                    A category will show violation amounts under the following
                    conditions:
                  </Typography>
                  <ul className={classes.titleMargin}>
                    <li>
                      Med/surg claims FAIL the substantially all test, therefore
                      NO MH/SUD claims should have cost-sharing and ALL MH/SUD
                      cost sharing is in violation.
                    </li>
                    <li>
                      Med/surg claims PASS the substantially all test, therefore
                      MH/SUD claims with cost-sharing above the predominant
                      level are in violation.
                    </li>
                  </ul>
                  <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                    <ResultsSummaryTable />
                  </Grid>
                  <Typography variant={"h5"} className={classes.titleMargin}>
                    Summary of Outpatient Care Results - Office Visits vs. All
                    Other Services
                  </Typography>
                  <Typography
                    variant={"subtitle1"}
                    className={classes.titleMargin}
                  >
                    This table splits out outpatient care into office visits and
                    all other services and summarizes the QTL/FR analysis
                    results.
                  </Typography>
                  <Grid item xs={12} md={12} lg={12} className={classes.grid}>
                    <OfficeVisitsSummaryTable />
                  </Grid>
                </div>
              </Grid>

              <br />

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item>
                  <div className="downloadableReport">
                    <Typography variant={"h5"} className={classes.titleMargin}>
                      Substantially All Test and Predominant Test Results
                    </Typography>
                    <Typography
                      variant={"subtitle1"}
                      className={classes.titleMargin}
                    >
                      The tables below display detailed results for the QTL/FR
                      analysis. Click on "Predominant Tests" to expand the
                      predominant test results. Note that predominant test
                      results are only available if the substantially all test
                      passed.
                    </Typography>
                  </div>
                  <QTLAnalysisTable
                    inpatientOutpatient="Inpatient"
                    networkStatus="InNetwork"
                    officeVisit={null}
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Inpatient"
                    networkStatus="OutNetwork"
                    officeVisit={null}
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="InNetwork"
                    officeVisit={null}
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="OutNetwork"
                    officeVisit={null}
                  />
                </Grid>

                <br />

                <Grid item>
                  <div className="downloadableReport">
                    <Typography variant={"h5"} className={classes.titleMargin}>
                      Outpatient Care Substantially All Test and Predominant
                      Test Results
                    </Typography>
                    <Typography
                      variant={"subtitle1"}
                      className={classes.titleMargin}
                    >
                      The tables below split out outpatient care into office
                      visits and all other services and display detailed results
                      for the QTL/FR analysis. Click on "Predominant Tests" to
                      expand the predominant test results. Note that predominant
                      test results are only available if the substantially all
                      test passed.
                    </Typography>
                  </div>
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="InNetwork"
                    officeVisit="Office"
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="InNetwork"
                    officeVisit="Other"
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="OutNetwork"
                    officeVisit="Office"
                  />
                  <br />
                  <QTLAnalysisTable
                    inpatientOutpatient="Outpatient"
                    networkStatus="OutNetwork"
                    officeVisit="Other"
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
