import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import * as format from "../NumberFormats.js";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2),
    textAlign: "center",
    backgroundColor: "#ffffff",
  },
}));

export default function PredominantTables(props) {
  const classes = useStyles();
  const predominantResults = useSelector(
    (state) => state.submit.predominantResult
  );

  function formatResult(value) {
    if (value === true) {
      return <b>Yes</b>;
    } else if (value === false) {
      return "No";
    }
  }

  // Function that returns an array of the copay predominant test
  // results given the json data structure and indicators
  function GetCopayResult(
    results,
    inpatientOutpatient,
    networkStatus,
    officeVisit
  ) {
    for (let result of results) {
      if (
        result.inpatientOutpatient === inpatientOutpatient &&
        result.networkStatus === networkStatus &&
        result.officeVisit === officeVisit
      ) {
        result.copayLevels.sort((a, b) => b.level - a.level);
        return result.copayLevels;
      }
    }
    return null;
  }

  // Function that returns an array of the coinsurance predominant test
  // results given the json data structure and indicators
  function GetCoinsuranceResult(
    results,
    inpatientOutpatient,
    networkStatus,
    officeVisit
  ) {
    for (let result of results) {
      if (
        result.inpatientOutpatient === inpatientOutpatient &&
        result.networkStatus === networkStatus &&
        result.officeVisit === officeVisit
      ) {
        result.coinsuranceLevels.sort((a, b) => b.level - a.level);
        return result.coinsuranceLevels;
      }
    }
    return null;
  }

  let finalCopayData = GetCopayResult(
    predominantResults,
    props.inpatientOutpatient,
    props.networkStatus,
    props.officeVisit
  );
  let finalCoinsData = GetCoinsuranceResult(
    predominantResults,
    props.inpatientOutpatient,
    props.networkStatus,
    props.officeVisit
  );

  return (
    (finalCopayData.length !== 0 || finalCoinsData.length !== 0) && (
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography
            style={{ fontWeight: "bold" }}
            className="downloadableReport"
          >
            Predominant Tests
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            className={classes.grid}
          >
            <div id="predominant-tables" className={"downloadableReport"}>
              <Grid item className={classes.grid}>
                {/* style is striped, bordered, responsive for all tables in app */}
                {/* each non-blank header also has a 'table-primary' class */}
                {finalCopayData.length !== 0 && (
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th>Copay Levels</th>
                        <th class="table-primary">Med/Surg Allowed Amount</th>
                        <th class="table-primary">% of Total</th>
                        <th class="table-primary">Predominant Level?</th>
                        <th class="table-primary">MH/SUD Copay Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalCopayData.map((arrayItem) => {
                        return (
                          <tr>
                            <td>{format.Dollar(arrayItem.level)}</td>
                            <td>{format.Dollar(arrayItem.allowedAmount)}</td>
                            <td>{format.Percent(arrayItem.allowedAmountPercent)}</td>
                            <td>{formatResult(arrayItem.predominant)}</td>
                            <td>{format.Dollar(arrayItem.mentalHealthCopayAmount)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Grid>
              <Grid item className={classes.grid}>
                {/* style is striped, bordered, responsive for all tables in app */}
                {/* each non-blank header also has a 'table-primary' class */}
                {finalCoinsData.length !== 0 && (
                  <Table striped bordered responsive>
                    <thead>
                      <tr>
                        <th>Coinsurance Levels</th>
                        <th class="table-primary">Med/Surg Allowed Amount</th>
                        <th class="table-primary">% of Total</th>
                        <th class="table-primary">Predominant Level?</th>
                        <th class="table-primary">MH/SUD Coinsurance Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalCoinsData.map((arrayItem) => {
                        return (
                          <tr>
                            <td>{format.Percent(arrayItem.level / 100)}</td>
                            <td>{format.Dollar(arrayItem.allowedAmount)}</td>
                            <td>{format.Percent(arrayItem.allowedAmountPercent)}</td>
                            <td>{formatResult(arrayItem.predominant)}</td>
                            <td>{format.Dollar(arrayItem.mentalHealthCoinsuranceAmount)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                )}
              </Grid>
            </div>
          </Grid>
        </AccordionDetails>
      </Accordion>
    )
  );
}
