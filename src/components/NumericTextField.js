import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TextField from "@material-ui/core/TextField";
import { Grid } from "@material-ui/core";
import { UPDATE_COLS } from "../actions/types";

export default function NumericTextField(props) {
  const dispatch = useDispatch();
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);

  // Get parameters for selector (i.e. required, error, etc.)
  const parameters = claimsCols.find((col) => col.setting === props.id);

  function changeAction(event) {
    let errorCheck;
    const inputValue = event.target.value;
    if (inputValue > 999 || inputValue <= 0) {
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
        <Grid container justify="space-between">
          <TextField
            id={props.id}
            type="number"
            size="small"
            fullWidth
            margin="normal"
            variant="outlined"
            defaultValue={parameters.value}
            onChange={changeAction}
            label={parameters.label}
            required={parameters.required}
            error={parameters.error}
            style={{ minWidth: 240 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </div>
    </Grid>
  );
}
