import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  grid: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
}));

export default function UserVariablesTable() {
  const classes = useStyles();
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const reportDateTime = useSelector((state) => state.submit.reportDateTime);
  const [displayColVals, setDisplayColVals] = useState([]);
  const [totalVars, setTotalVars] = useState(0);

  useEffect(() => {
    setDisplayColVals(claimsCols);
    setTotalVars(claimsCols.length);
    // eslint-disable-next-line
  }, [reportDateTime]);

  function Row(props) {
    return (
      <tr>
        <th>{props.desc}</th>
        <td>{props.value}</td>
      </tr>
    );
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography
          style={{ fontWeight: "bold" }}
          className="downloadableReport"
        >
          Claim Variables Selected
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div id="selected-variables-table" className={"downloadableReport"}>
          <Grid container row justify="center" className={classes.grid}>
            <Grid item direction="column" className={classes.grid}>
              {/* style is striped, bordered, responsive for all tables in app */}
              {/* each non-blank header also has a 'table-primary' class */}
              {/* Front-endIDs are used to split up the tables into 2, with (roughly) equal variables in each*/}
              <Table striped bordered responsive style={{ textAlign: "left" }}>
                <tbody>
                  {displayColVals
                    .filter((object, index) => index <= totalVars / 2)
                    .map((object) => {
                      return <Row desc={object.label} value={object.name} />;
                    })}
                </tbody>
              </Table>
            </Grid>
            <Grid item direction="column" className={classes.grid}>
              <Table striped bordered responsive style={{ textAlign: "left" }}>
                <tbody>
                  {displayColVals
                    .filter((object, index) => index > totalVars / 2)
                    .map((object) => {
                      if (
                        ![
                          "network_values",
                          "inpatient_values",
                          "mhsud_values",
                          "medsurg_values",
                          "approved_values",
                          "moop_values",
                          "timeliness_days",
                          "date_received_format",
                          "date_processed_format",
                          "service_start_date_format",
                        ].includes(object.setting)
                      ) {
                        return <Row desc={object.label} value={object.name} />;
                      } else {
                        return (
                          <Row
                            desc={object.label}
                            value={object.value.join(", ")}
                          />
                        );
                      }
                    })}
                </tbody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </AccordionDetails>
    </Accordion>
  );
}
