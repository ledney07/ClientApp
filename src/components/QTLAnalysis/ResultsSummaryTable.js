import React from "react";
import Table from "react-bootstrap/Table";
import SummaryRow from "./SummaryRow";

export default function ResultsSummaryTable() {
  return (
    // style is striped, bordered, responsive for all tables in app
    // each non-blank header also has a 'table-primary' class
    <Table id="results-summary-table" striped bordered responsive>
      <thead>
        <tr>
          <th colSpan="2"></th>
          <th class="table-primary">Total MH/SUD Claims</th>
          <th class="table-primary">Cost-Sharing Type</th>
          <th class="table-primary"># MH/SUD Claims in Violation</th>
          <th class="table-primary">$ MH/SUD Claims in Violation</th>
          <th class="table-primary">Med/Surg Substantially All Test Result</th>
          <th class="table-primary">Med/Surg Predominant Level</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td rowSpan="4">
            <b>Inpatient</b>
          </td>
          <td rowSpan="2">
            <b>In Network</b>
          </td>
          <SummaryRow
            inpatientOutpatient="Inpatient"
            networkStatus="InNetwork"
            officeVisit={null}
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Inpatient"
            networkStatus="InNetwork"
            officeVisit={null}
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <b>Out of Network</b>
          </td>
          <SummaryRow
            inpatientOutpatient="Inpatient"
            networkStatus="OutNetwork"
            officeVisit={null}
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Inpatient"
            networkStatus="OutNetwork"
            officeVisit={null}
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="6">
            <b>Outpatient</b>
          </td>
          <td rowSpan="2">
            <b>In Network</b>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit={null}
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit={null}
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <b>Out of Network</b>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit={null}
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit={null}
            costSharingType="Coinsurance"
          />
        </tr>
      </tbody>
    </Table>
  );
}
