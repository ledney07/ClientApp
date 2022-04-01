import React from "react";

import Table from "react-bootstrap/Table";
import TimelinessRow from "./TimelinessRow";

export default function TimelinessTable(props) {
  return (
    <Table id="timeliness-analysis-table" striped bordered responsive>
      <thead>
        <tr>
          <th colSpan="2"></th>
          <th
            colSpan="3"
            class="table-primary"
            style={{ borderRightWidth: "5px", fontSize: "18px" }}
          >
            MH/SUD
          </th>
          <th
            colSpan="3"
            class="table-warning"
            style={{ borderRightWidth: "5px", fontSize: "18px" }}
          >
            Med/Surg
          </th>
          <th class="table-primary"></th>
        </tr>
        <tr>
          <th colSpan="2"></th>
          <th class="table-primary">
            Claim Lines Over {props.timelinessThreshold} Days (%)
          </th>
          <th class="table-primary">
            Claim Lines Over {props.timelinessThreshold} Days (#)
          </th>
          <th class="table-primary" style={{ borderRightWidth: "5px" }}>
            Average Processing Time (Days)
          </th>
          <th class="table-warning">
            Claim Lines Over {props.timelinessThreshold} Days (%)
          </th>
          <th class="table-warning">
            Claim Lines Over {props.timelinessThreshold} Days (#)
          </th>
          <th class="table-warning" style={{ borderRightWidth: "5px" }}>
            Average Processing Time (Days)
          </th>
          <th class="table-primary">Disparity</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan="2">
            <b>Inpatient</b>
          </td>
          <td>
            <b>In Network</b>
          </td>
          <TimelinessRow
            inpatientOutpatient="Inpatient"
            networkStatus="InNetwork"
          />
        </tr>
        <tr>
          <td>
            <b>Out of Network</b>
          </td>
          <TimelinessRow
            inpatientOutpatient="Inpatient"
            networkStatus="OutNetwork"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <b>Outpatient</b>
          </td>
          <td>
            <b>In Network</b>
          </td>
          <TimelinessRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
          />
        </tr>
        <tr>
          <td>
            <b>Out of Network</b>
          </td>
          <TimelinessRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
          />
        </tr>
      </tbody>
    </Table>
  );
}
