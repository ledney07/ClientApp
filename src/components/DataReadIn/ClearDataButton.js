import React from "react";
import { useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import { CLEAR_COLS, CLEAR_BROWSE, CLEAR_UPLOAD } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    marginTop: 10,
  },
}));

export default function ClearDataButton(props) {
  const classes = useStyles();
  const dispatch = useDispatch();

  function resetInputs() {
    document.getElementById("browseForm").reset();
    window.location.reload();
  }

  function clearUploadData() {
    dispatch({ type: CLEAR_BROWSE });
    dispatch({ type: CLEAR_UPLOAD });
    dispatch({ type: CLEAR_COLS });
    resetInputs();
  }

  return (
    <div className={classes.root}>
      <Tooltip title={<text style={{ fontSize: 11 }}>Reset Inputs</text>}>
        <IconButton aria-label="delete" size="small" onClick={clearUploadData}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}
