import React, { useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import makeStyles from "@material-ui/core/styles/makeStyles";
import PreviewLink from "./PreviewLink";
import { DataGrid } from "@material-ui/data-grid";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
  },
}));

export default function PreviewModal(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const previewRows = useSelector((state) => state.upload.previewRows);
  const previewCols = useSelector((state) => state.upload.previewCols);

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <div className={classes.root}>
        <PreviewLink setOpen={setOpen} />
      </div>
      <Dialog
        open={open}
        maxWidth={700}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Claims Data</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {previewCols && previewRows && (
              <div style={{ height: 400, width: 900 }}>
                <DataGrid
                  rows={previewRows}
                  columns={previewCols}
                  hideFooter={true}
                />
              </div>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
