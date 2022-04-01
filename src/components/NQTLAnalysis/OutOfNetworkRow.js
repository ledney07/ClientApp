import React from "react";
import { useSelector } from "react-redux";
import * as format from "../NumberFormats.js";

export default function OutOfNetworkRow(props) {
    const results = useSelector(
        (state) => state.submit.outOfNetworkResults
      );

    function GetMedSurgResults(results, inpatientOutpatient) {
        for (let result of results) {
            if (result.claimType === "MedSurg" &&
                result.inpatientOutpatient === inpatientOutpatient) {
                return result;
            }
        }
        return null;
    }

    function GetMentalHealthResults(results, inpatientOutpatient) {
        for (let result of results) {
            if (result.claimType === "MentalHealth" &&
                result.inpatientOutpatient === inpatientOutpatient) {
                return result;
            }
        }
        return null;
    }

    let medSurgResults = {
        totalOutOfNetworkLines: 0,
        totalClaimLines: 0,
        percentOutOfNetwork: 0,
        allowedAmount: 0,
    };
    let mentalHealthResults = {
        totalOutOfNetworkLines: 0,
        totalClaimLines: 0,
        percentOutOfNetwork: 0,
        allowedAmount: 0,
    };

    function GetMentalHealthTotal(results) {
        for (let result of results) {
            if (result.claimType === "MentalHealth") {
                mentalHealthResults.totalOutOfNetworkLines = mentalHealthResults.totalOutOfNetworkLines + result.totalOutOfNetworkLines;
                mentalHealthResults.totalClaimLines = mentalHealthResults.totalClaimLines + result.totalClaimLines;
                mentalHealthResults.allowedAmount = mentalHealthResults.allowedAmount + result.allowedAmount;
            }
        }
        mentalHealthResults.percentOutOfNetwork = mentalHealthResults.totalOutOfNetworkLines / mentalHealthResults.totalClaimLines;
        return mentalHealthResults;
    };

    function GetMedSurgTotal(results) {
        for (let result of results) {
            if (result.claimType === "MedSurg") {
                medSurgResults.totalOutOfNetworkLines = medSurgResults.totalOutOfNetworkLines + result.totalOutOfNetworkLines;
                medSurgResults.totalClaimLines = medSurgResults.totalClaimLines + result.totalClaimLines;
                medSurgResults.allowedAmount = medSurgResults.allowedAmount + result.allowedAmount;
            }
        }
        medSurgResults.percentOutOfNetwork = medSurgResults.totalOutOfNetworkLines / medSurgResults.totalClaimLines;
        return medSurgResults;
    };

    if (props.inpatientOutpatient === "Total") {
        mentalHealthResults = GetMentalHealthTotal(results);
        medSurgResults = GetMedSurgTotal(results);
    } else {
        medSurgResults = GetMedSurgResults(results, props.inpatientOutpatient)
        mentalHealthResults = GetMentalHealthResults(results, props.inpatientOutpatient)
    }
    
    function getDifference(){
        const difference = format.Percent(mentalHealthResults.percentOutOfNetwork / medSurgResults.percentOutOfNetwork);

        return <b>{difference}</b>;
    }

    return(
        <React.Fragment>
            <tr>
                <td><b>{props.inpatientOutpatient}</b></td>
                <td>{format.Percent(mentalHealthResults.percentOutOfNetwork)}</td>
                <td>{format.Comma(mentalHealthResults.totalOutOfNetworkLines)}</td>
                <td style={{borderRightWidth:"thick"}}>{format.Dollar(mentalHealthResults.allowedAmount)}</td>
                <td>{format.Percent(medSurgResults.percentOutOfNetwork)}</td>
                <td>{format.Comma(medSurgResults.totalOutOfNetworkLines)}</td>
                <td style={{borderRightWidth:"thick"}}>{format.Dollar(medSurgResults.allowedAmount)}</td>
                <td>{getDifference()}</td>
            </tr>
        </React.Fragment>
    )
}