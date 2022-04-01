import React from "react";
import { useSelector } from "react-redux";
import * as format from "../NumberFormats.js";

export default function DeniedClaimsRow(props) {
  const results = useSelector((state) => state.submit.deniedClaimsResults);

  function GetMedSurgResults(results, inpatientOutpatient, networkStatus) {
    for (let result of results) {
      if (
        result.claimType === "MedSurg" &&
        result.inpatientOutpatient === inpatientOutpatient &&
        result.networkStatus === networkStatus
      ) {
        return result;
      }
    }
    return null;
  }

  function GetMentalHealthResults(results, inpatientOutpatient, networkStatus) {
    for (let result of results) {
      if (
        result.claimType === "MentalHealth" &&
        result.inpatientOutpatient === inpatientOutpatient &&
        result.networkStatus === networkStatus
      ) {
        return result;
      }
    }
    return null;
  }

  function getDifference() {
    const difference = format.Percent(
      mentalHealthResults.percentDenied / medSurgResults.percentDenied
    );

    return <b>{difference}</b>;
  }

  const medSurgResults = GetMedSurgResults(
    results,
    props.inpatientOutpatient,
    props.networkStatus
  );

  const mentalHealthResults = GetMentalHealthResults(
    results,
    props.inpatientOutpatient,
    props.networkStatus
  );

  return (
    <React.Fragment>
      <td>{format.Percent(mentalHealthResults.percentDenied)}</td>
      <td>{format.Comma(mentalHealthResults.totalDeniedLines)}</td>
      <td style={{ borderRightWidth: "5px" }}>
        {format.Comma(mentalHealthResults.totalClaimLines)}
      </td>
      <td>{format.Percent(medSurgResults.percentDenied)}</td>
      <td>{format.Comma(medSurgResults.totalDeniedLines)}</td>
      <td style={{ borderRightWidth: "5px" }}>
        {format.Comma(medSurgResults.totalClaimLines)}
      </td>
      <td>{getDifference()}</td>
    </React.Fragment>
  );
}
