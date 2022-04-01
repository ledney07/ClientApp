import React, { useState, forwardRef } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import { Help } from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Tooltip from "@material-ui/core/Tooltip";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  root: {
    float: "right",
    marginTop: 10,
  },
}));

export default function HelpButton(props) {
  let modalContent;
  let modalTitle;

  modalContent = (
    <React.Fragment>
      The tool accepts the following file types: XLSX, CSV. <br /> <br />
      The tool uses the first tab of your spreadsheet. If your data is in
      another tab, make a copy of your spreadsheet and move your data to the
      first tab. <br /> <br />
      If you are uploading an Excel file, the tool will read all rows regardless
      whether the rows are visible or hidden.
    </React.Fragment>
  );

  modalTitle = "Claims Data";

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <Tooltip title={<text style={{ fontSize: 11 }}>Help</text>}>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={handleClickOpen}
          >
            <Help />
          </IconButton>
        </Tooltip>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {modalContent}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
