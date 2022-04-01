import React from "react";
import * as format from "../NumberFormats";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";

export default function SubstantiallyAllTable(props) {
  const substantiallyAllResults = useSelector(
    (state) => state.submit.substantiallyAllResult
  );

  function formatResult(value) {
    if (value === true) {
      return "Yes";
    } else if (value === false) {
      return "No";
    }
  }

  function formatDollar(data, check) {
    if (check !== 0) {
      return format.Dollar(data);
    } else {
      return "N/A";
    }
  }

  function formatPercent(data, check) {
    if (check !== 0) {
      return format.Percent(data);
    } else {
      return "N/A";
    }
  }

  // Function to take the inpatient/outpatient indicator,
  // network status, and office visit status, and get the necessary
  // data from the json structure
  function GetSubstantiallyAllTestResult(
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
        return result;
      }
    }
    return null;
  }

  const substantiallyAllResult = GetSubstantiallyAllTestResult(
    substantiallyAllResults,
    props.inpatientOutpatient,
    props.networkStatus,
    props.officeVisit
  );

  return (
    <Table striped bordered responsive id="substantially-all-table">
      <thead>
        <tr>
          <th rowSpan={2}></th>
          <th colSpan={3} class="table-primary">
            Substantially All Test Results
          </th>
        </tr>
        <tr>
          <th class="table-primary">Med/Surg Allowed Amount</th>
          <th class="table-primary">% of Total Med/Surg Allowed Amount</th>
          <th class="table-primary">Substantially All with Cost Sharing?</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Benefits with &gt;$0 Copay</th>
          <td>
            {formatDollar(
              substantiallyAllResult.copayAllowedAmount,
              substantiallyAllResult.numMedSurgCopay
            )}
          </td>
          <td>
            {formatPercent(
              substantiallyAllResult.copayPercent,
              substantiallyAllResult.numMedSurgCopay
            )}
          </td>
          <td>{formatResult(substantiallyAllResult.copayPass)}</td>
        </tr>
        <tr>
          <th>Benefits with &gt;$0 Coinsurance</th>
          <td>
            {formatDollar(
              substantiallyAllResult.coinsuranceAllowedAmount,
              substantiallyAllResult.numMedSurgCoins
            )}
          </td>
          <td>
            {formatPercent(
              substantiallyAllResult.coinsurancePercent,
              substantiallyAllResult.numMedSurgCoins
            )}
          </td>
          <td>{formatResult(substantiallyAllResult.coinsurancePass)}</td>
        </tr>
        <tr>
          <th>All Claims</th>
          <td>
            {formatDollar(
              substantiallyAllResult.totalAllowedAmount,
              substantiallyAllResult.numMedSurgCopay +
                substantiallyAllResult.numMedSurgCoins
            )}
          </td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </Table>
  );
}
