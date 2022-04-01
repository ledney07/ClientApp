import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Grid, Typography } from "@material-ui/core";
import CheckErrorCheckbox from "./CheckErrorCheckbox";
import { CHECKBOX_FILL, CHECKBOX_RETAIN } from "../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    marginLeft: "16px",
    marginTop: "12px",
    marginBottom: "-4px",
  },
  label: {
    fontSize: "12px",
  },
  checkboxLabel: { fontSize: "14px" },
}));

export default function CheckboxValues(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const claimsCols = useSelector((state) => state.claimsCols.claimsCols);
  const [checkboxError, setCheckboxError] = useState(false);
  const checkboxValues = useSelector((state) => state.claimsCols.checkboxValues);
  const values = checkboxValues.find((obj) => obj.setting === props.setting).options;

  function handleChange(event) {
    const bool = (element) => element === true;

    let arr = claimsCols.map((obj) => {
      return Object.values(obj).includes(props.setting);
    });

    let checkboxName = event.target.name;
    let checked = event.target.checked;

    dispatch({
      type: CHECKBOX_RETAIN,
      payload: {
        value: checkboxName,
        checked: checked,
        setting: props.setting,
      },
    });

    if (checked === true && arr.some(bool)) {
      dispatch({
        type: CHECKBOX_FILL,
        payload: {
          checkboxName: checkboxName,
          checked: checked,
          setting: props.setting,
        },
      });
    } else if (checked === false && arr.some(bool)) {
      dispatch({
        type: CHECKBOX_FILL,
        payload: {
          checkboxName: checkboxName,
          checked: checked,
          setting: props.setting,
        },
      });
    }
  }

  useEffect(() => {
    setCheckboxError(CheckErrorCheckbox(claimsCols, props.setting));
  }, [claimsCols, props.setting]);

  return (
    <FormControl
      required={props.labelRequired}
      error={checkboxError}
      component="fieldset"
      className={classes.formControl}
      fullWidth
    >
      <FormLabel component="legend" className={classes.label}>
        {props.label}
      </FormLabel>
      <FormGroup>
        <Grid container>
          {values &&
            values.map((object) => {
              return (
                <Grid item>
                  <FormControlLabel
                    classes={classes.label}
                    control={
                      <Checkbox
                        value={object}
                        color="primary"
                        size="small"
                        onChange={handleChange}
                        checked={object.checked}
                        name={object.value}
                      />
                    }
                    label={
                      <Typography className={classes.checkboxLabel}>
                        {object.value}
                      </Typography>
                    }
                  />
                </Grid>
              );
            })}
        </Grid>
      </FormGroup>
    </FormControl>
  );
}
