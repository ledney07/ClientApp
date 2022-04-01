import React from "react";
import Table from "react-bootstrap/Table";
import SummaryRow from "./SummaryRow";

export default function OfficeVisitsSummaryTable() {
  return (
    // style is striped, bordered, responsive for all tables in app
    // each non-blank header also has a 'table-primary' class
    <Table id="office-visits-summary-table" striped bordered responsive>
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
          <td rowSpan="8">
            <b>Outpatient</b>
          </td>
          <td rowSpan="2">
            <p><b>In Network</b> {<br />} Office Visits</p>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit="Office"
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit="Office"
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <p><b>In Network</b> {<br />} All Other Services</p>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit="Other"
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="InNetwork"
            officeVisit="Other"
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <p><b>Out of Network</b> {<br />} Office Visits</p>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit="Office"
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit="Office"
            costSharingType="Coinsurance"
          />
        </tr>
        <tr>
          <td rowSpan="2">
            <p><b>Out of Network</b> {<br />} All Other Services </p>
          </td>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit="Other"
            costSharingType="Copay"
          />
        </tr>
        <tr>
          <SummaryRow
            inpatientOutpatient="Outpatient"
            networkStatus="OutNetwork"
            officeVisit="Other"
            costSharingType="Coinsurance"
          />
        </tr>
      </tbody>
    </Table>
  );
}
