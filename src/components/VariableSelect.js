import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Grid, Tooltip } from "@material-ui/core";
import {
  UPDATE_COLS,
  DELETE_COLS,
  CHECKBOX_FILL,
  CHECKBOX_INITIALIZE,
} from "../actions/types";
import InfoIcon from "@material-ui/icons/Info";
const dataForge = require("data-forge");

export default function VariableSelect(props) {
  const dispatch = useDispatch();
  const uploadFileCols = useSelector((state) => state.upload.uploadFileCols);
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const previewRows = useSelector((state) => state.upload.previewRows);

  // Get the parameters of the selector (i.e. whether it is required, etc.)
  const parameters = claimsCols.find((column) => column.setting === props.id);

  const options = getOptions();

  // Function to get the options which will populate the variable selectors
  function getOptions() {
    let options = [];
    if (props.id === "network_status") {
      // If it's the network status selector, add the "N/A - All In or Out of Network" option
      // Copy the uploaded file columns
      options = uploadFileCols.map((col) => Object.assign({}, col));

      // Add on the all in/out of network status column
      const allInOutNetworkOption = [
        {
          id: null,
          name: "N/A - All In or Out of Network",
          number: null,
        },
      ];

      options.push(allInOutNetworkOption[0]);

      // Sort the options by id so "N/A - All In or Out of Network" is first
      options.sort(function (a, b) {
        return a.id - b.id;
      });
    } else if (props.id === "inpatient_outpatient") {
      // If it's the inpatient/outpatient selector, add "All inpatient or outpatient" option
      options = uploadFileCols.map((col) => Object.assign({}, col));

      const allInpatientOutpatient = [
        {
          id: null,
          name: "All Inpatient or Outpatient",
          number: null,
        },
      ];

      options.push(allInpatientOutpatient[0]);

      options.sort(function (a, b) {
        return a.id - b.id;
      });
    } else {
      // If the options don't need to be modified, copy the uploaded file columns
      options = uploadFileCols.map((col) => Object.assign({}, col));
    }

    return options;
  }

  // Look up the variable number corresponding to a given name.
  // If none match, return null. If more than one, return the first.
  function getVariableNumber(name) {
    var number = uploadFileCols.filter((col) => col.name === name);
    if (number.length === 0) {
      return null;
    }
    return number[0].number;
  }

  function getCheckboxValues(colData, name, previewRows) {
    let checkboxValues = [];
    let uniqueValues = colData.uniqueValues;

    // If the backend did not return a list
    // of unique values, then use the data preview
    // otherwise add each value to the array
    try {
      if (uniqueValues.length === 0) {
        uniqueValues = new dataForge.DataFrame(previewRows)
          .subset([name])
          .distinct((column) => column[name])
          .toArray()
          .map((column) => column[name])
          .sort();
        for (let i = 0; i < uniqueValues.length; i++) {
          checkboxValues.push({
            name: null,
            value: uniqueValues[i],
            checked: false,
          });
        }
      } else {
        for (let i = 0; i < uniqueValues.length; i++) {
          checkboxValues.push({
            name: null,
            value: uniqueValues[i].value,
            checked: false,
          });
        }
      }
    } catch (err) {
      if (err) {
        return [];
      }
    }

    // Iterate over the list of unique values
    // and replace "" with "(Blank)"
    for (let i = 0; i < checkboxValues.length; i++) {
      if (checkboxValues[i].value === "") {
        checkboxValues[i].value = "(Blank)";
      }
    }

    function compare(a, b) {
      if (a.value < b.value) {
        return -1;
      }
      if (a.value > b.value) {
        return 1;
      }
      return 0;
    }

    return checkboxValues.sort(compare);
  }

  // Function to handle changes to inputs
  function handleChange(event, value, reason) {
    if (event !== null) {
      let name = value;
      let number = getVariableNumber(name);
      let colData = options.find((object) => object.name === name);
      let checkboxValues;

      // If the option exists in the options array,
      // then dispatch actions to update the state of the
      // claimsCols and checkbox arrays
      if (colData) {
        dispatch({
          type: UPDATE_COLS,
          payload: { id: props.id, name: name, number: number },
        });
        // Dispatch actions to update the state
        // of checkbox arrays
        if (props.id === "network_values") {
          dispatch({
            type: CHECKBOX_FILL,
            payload: {
              checkboxName: "",
              checked: false,
              setting: "network_values",
            },
          });
        } else if (props.id === "inpatient_values") {
          dispatch({
            type: CHECKBOX_FILL,
            payload: {
              checkboxName: "",
              checked: false,
              setting: "inpatient_values",
            },
          });
        } else if (props.id === "moop_values") {
          dispatch({
            type: CHECKBOX_FILL,
            payload: {
              checkboxName: "",
              checked: false,
              setting: "moop_values",
            },
          });
        } else if (props.id === "approved_values") {
          dispatch({
            type: CHECKBOX_FILL,
            payload: {
              checkboxName: "",
              checked: false,
              setting: "approved_values",
            },
          });
        }
        // Get unique checkbox values
        checkboxValues = getCheckboxValues(colData, name, previewRows);
        dispatch({
          type: CHECKBOX_INITIALIZE,
          payload: { id: props.id, name: name, checkboxValues: checkboxValues },
        });
      } else if (reason === "clear") {
        dispatch({
          type: DELETE_COLS,
          payload: props.id,
        });
      }
    }
  }

  return (
    <Grid item style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Grid container justify="flex-end">
          {(props.id === "copay_amt" || props.id === "coinsurance_amt") && (
            <Tooltip
              title={
                <text style={{ fontSize: 11 }}>
                  Please fill-in either Copay amount or Coinsurance amount; you
                  may fill in both fields, if desired.
                </text>
              }
            >
              <InfoIcon
                style={{ color: "#177BAD", fontSize: 16, marginTop: -8 }}
              />
            </Tooltip>
          )}
          {(props.id === "place_of_service" ||
            props.id === "inpatient_outpatient") && (
            <Tooltip
              title={
                <text style={{ fontSize: 11 }}>
                  Please fill-in either Place of Service or
                  Inpatient/Outpatient; you may fill in both fields, if desired.
                </text>
              }
            >
              <InfoIcon
                style={{ color: "#177BAD", fontSize: 16, marginTop: -8 }}
              />
            </Tooltip>
          )}
          {[
            "moop_status",
            "moop_single",
            "moop_family",
            "moop_cum_single",
            "moop_cum_family",
          ].includes(props.id) && (
            <Tooltip
              title={
                <text style={{ fontSize: 11 }}>
                  Please fill-in either the MOOP indicator, or all of the single
                  and family MOOP limits and cumulative totals.
                </text>
              }
            >
              <InfoIcon
                style={{ color: "#177BAD", fontSize: 16, marginTop: -7 }}
              />
            </Tooltip>
          )}
        </Grid>

        <Autocomplete
          size="small"
          fullWidth
          options={options}
          id={props.id}
          value={parameters}
          disabled={props.disabled}
          onInputChange={handleChange}
          getOptionLabel={(option) => option.name}
          style={{ minWidth: 240 }}
          renderInput={(params) => (
            <TextField
              {...params}
              error={parameters.error}
              required={parameters.required}
              variant="outlined"
              label={parameters.label}
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      </div>
    </Grid>
  );
}
