import React from "react";
import * as format from "../NumberFormats";
import { useSelector } from "react-redux";

export default function SummaryRow(props) {
  const substantiallyAllResultsList = useSelector(
    (state) => state.submit.substantiallyAllResult
  );
  const predominantResultsList = useSelector(
    (state) => state.submit.predominantResult
  );

  var dollarFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
    style: "currency",
    currency: "USD",
  });
  var percentFormatter = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  });

  function formatNumViolation(violation, total) {
    if (total === 0) {
      return "N/A";
    } else if (violation > 0) {
      return <b style={{ color: "red" }}>{format.Comma(violation)}</b>;
    } else {
      return <b style={{ color: "green" }}>{format.Comma(violation)}</b>;
    }
  }

  function formatViolationAmt(violation, total) {
    if (total === 0) {
      return "N/A";
    } else if (violation > 0) {
      return (
        <b style={{ color: "red" }}>{dollarFormatter.format(violation)}</b>
      );
    } else {
      return (
        <b style={{ color: "green" }}>{dollarFormatter.format(violation)}</b>
      );
    }
  }

  function formatSubstantiallyAllResult(substantially_all_result) {
    if (substantially_all_result === true) {
      return "PASS";
    } else if (substantially_all_result === false) {
      return "FAIL";
    } else {
      return "N/A";
    }
  }

  function formatPredominantLevel(
    substantially_all_result,
    cost_sharing_type,
    predominant_level
  ) {
    if (
      substantially_all_result === false ||
      substantially_all_result === null
    ) {
      return "N/A";
    }
    if (cost_sharing_type === "Copay") {
      return dollarFormatter.format(predominant_level);
    } else {
      return percentFormatter.format(predominant_level) + "%";
    }
  }

  function Row(
    cost_sharing_type,
    total_mental_health_claims,
    total_med_surg_claims,
    num_violation,
    amt_violation,
    substantially_all_result,
    predominant_level
  ) {
    return (
      <React.Fragment>
        {/*Copay and coinsurance totals will be equal, so we only need to display the first (copay) value*/}
        {cost_sharing_type === "Copay" && 
          <td rowSpan="2"> {format.Comma(total_mental_health_claims)}</td>
        }
        <td>
          <b>{cost_sharing_type}</b>
        </td>
        <td>{formatNumViolation(num_violation, total_med_surg_claims)}</td>
        <td>{formatViolationAmt(amt_violation, total_med_surg_claims)}</td>
        <td>{formatSubstantiallyAllResult(substantially_all_result)}</td>
        <td>
          {formatPredominantLevel(
            substantially_all_result,
            cost_sharing_type,
            predominant_level
          )}
        </td>
      </React.Fragment>
    );
  }

  function GetResultFor(list, inpatientOutpatient, networkStatus, officeVisit) {
    for (let result of list) {
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

  const substantiallyAllResult = GetResultFor(
    substantiallyAllResultsList,
    props.inpatientOutpatient,
    props.networkStatus,
    props.officeVisit
  );
  const predominantResult = GetResultFor(
    predominantResultsList,
    props.inpatientOutpatient,
    props.networkStatus,
    props.officeVisit
  );

  if (props.costSharingType === "Copay") {
    return Row(
      props.costSharingType,
      predominantResult.totalMentalHealthClaims,
      substantiallyAllResult.numMedSurgCopay,
      predominantResult.numCopaysInViolation,
      predominantResult.copayViolationAmount,
      substantiallyAllResult.copayPass,
      predominantResult.copayPredominantLevel
    );
  } else {
    return Row(
      props.costSharingType,
      predominantResult.totalMentalHealthClaims,
      substantiallyAllResult.numMedSurgCoins,
      predominantResult.numCoinsuranceInViolation,
      predominantResult.coinsuranceViolationAmount,
      substantiallyAllResult.coinsurancePass,
      predominantResult.coinsurancePredominantLevel
    );
  }
}
