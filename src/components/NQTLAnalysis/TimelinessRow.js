import React from "react";
import { useSelector } from "react-redux";
import * as format from "../NumberFormats.js";

export default function TimelinessRow(props) {
  const results = useSelector((state) => state.submit.timelinessResults);

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
      mentalHealthResults.percentOverThreshold /
        medSurgResults.percentOverThreshold
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
      <td>{format.Percent(mentalHealthResults.percentOverThreshold)}</td>
      <td>{format.Comma(mentalHealthResults.linesOverThreshold)}</td>
      <td style={{ borderRightWidth: "5px" }}>
        {format.Comma(mentalHealthResults.averageDaysProcessed)}
      </td>
      <td>{format.Percent(medSurgResults.percentOverThreshold)}</td>
      <td>{format.Comma(medSurgResults.linesOverThreshold)}</td>
      <td style={{ borderRightWidth: "5px" }}>
        {format.Comma(medSurgResults.averageDaysProcessed)}
      </td>
      <td>{getDifference()}</td>
    </React.Fragment>
  );
}
