import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { UPDATE_COLS } from "../actions/types";
import DatesHelpModal from "./DatesHelpModal";

export default function CharacterTextField(props) {
  const dispatch = useDispatch();
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);

  // Get parameters for selector (i.e. required, error, etc.)
  const parameters = claimsCols.find((col) => col.setting === props.id);

  function handleChange(event) {
    let errorCheck;
    const inputValue = event.target.value;
    if (parameters.required === true && event.target.value === "") {
      errorCheck = true;
    } else {
      errorCheck = false;
    }

    dispatch({
      type: UPDATE_COLS,
      payload: { id: props.id, error: errorCheck, number: inputValue },
    });
  }

  return (
    <Grid item style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Grid container justify="flex-end">
          {(props.id === "date_received_format" ||
            props.id === "date_processed_format" ||
            props.id === "service_start_date_format") && <DatesHelpModal />}
        </Grid>
        <TextField
          id={props.id}
          size="small"
          fullWidth
          variant="outlined"
          defaultValue={parameters.value}
          onChange={handleChange}
          label={parameters.label}
          required={parameters.required}
          error={parameters.error}
          style={{ minWidth: 240 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
    </Grid>
  );
}
