import React from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import moment from "moment";

function comma(value) {
  return value.toLocaleString();
}

function Row(props) {
  return (
    <tr>
      <th>{props.desc}</th>
      <td>{props.value}</td>
    </tr>
  );
}

export default function FileSummaryTable(props) {
  const fileSummaryData = useSelector((state) => state.submit.fileSummaryData);
  const reportDateTime = useSelector((state) => state.submit.reportDateTime);
  const fileName = useSelector((state) => state.submit.fileName);
  const excludeSkippedLines = props.dropSkippedLines;

  return (
    // style is striped, bordered, responsive for all tables in app
    <Table id="file-summary-table" striped bordered responsive style={{ textAlign: "left" }}>
      <thead></thead>
      <tbody>
        <Row
          desc="Date"
          value={moment(reportDateTime).format("MM/DD/YYYY, h:mm a")}
        />
        <Row desc="File Name" value={fileName} />
        <Row desc="Claim Lines" value={comma(fileSummaryData.rowCount)} />
        {excludeSkippedLines !== true && (<Row desc="Skipped Claim Lines" value={comma(fileSummaryData.skippedClaimLines)} />)}
        <Row desc="Claims" value={comma(fileSummaryData.claimCount)} />
        <Row
          desc="Med/Surg Claims"
          value={comma(
            fileSummaryData.medSurgInNetwork + fileSummaryData.medSurgOutNetwork
          )}
        />
        <Row
          desc="MH/SUD Claims"
          value={comma(
            fileSummaryData.mentalHealthInNetwork +
              fileSummaryData.mentalHealthOutNetwork
          )}
        />
        <Row desc="ER Claims" value={comma(fileSummaryData.emergencyRoom)} />
        <Row
          desc="Pharma Claims"
          value={comma(fileSummaryData.pharmaceutical)}
        />
      </tbody>
      </Table>
  );
}
