import React from "react";
import Table from "react-bootstrap/Table";
import OutOfNetworkRow from "./OutOfNetworkRow";

export default function OutOfNetworkTable(props) {
    return (
        <Table id="out-of-network-table" striped bordered responsive>
            <thead>
                <tr>
                    <th></th>
                    <th 
                        colSpan="3" 
                        class="table-primary" 
                        style={{borderRightWidth:"5px",
                                fontSize:"18px"}}
                    >
                        MH/SUD
                    </th>
                    <th 
                        colSpan="3" 
                        class="table-warning" 
                        style={{borderRightWidth:"5px",
                                fontSize:"18px"}}
                    >
                        Med/Surg
                    </th>
                    <th class="table-primary"></th>
                </tr>
                <tr>
                    <th></th>
                    <th class="table-primary">Out of Network Claim Lines (%)</th>
                    <th class="table-primary">Out of Network Claim Lines (#)</th>
                    <th class="table-primary" style={{borderRightWidth:"5px"}}>Out of Network Allowed Amount</th>
                    <th class="table-warning">Out of Network Claim Lines (%)</th>
                    <th class="table-warning">Out of Network Claim Lines (#)</th>
                    <th class="table-warning" style={{borderRightWidth:"5px"}}>Out of Network Allowed Amount</th>
                    <th class="table-primary">Disparity</th>
                </tr>
            </thead>
            <tbody>
                <OutOfNetworkRow
                    inpatientOutpatient="Inpatient"
                />
                <OutOfNetworkRow
                    inpatientOutpatient="Outpatient"
                />
                <OutOfNetworkRow
                    inpatientOutpatient="Total"
                />
            </tbody>
        </Table>
    )
}