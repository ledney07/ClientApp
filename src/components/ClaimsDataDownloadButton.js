import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  fab: {
    margin: 0,
    top: "auto",
    right: 20,
    bottom: 20,
    left: "auto",
    "&:hover": {
      color: "#FFFFFF",
    },
    zIndex: 1e9,
  },
}));

export default function ClaimsDataDownloadButton(props) {
  const classes = useStyles();
  const reportId = useSelector((state) => state.submit.reportId);
  const reportRunTimeMs = useSelector((state) => state.submit.reportRunTimeMs);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getTime() {
    let timeMinutes = reportRunTimeMs / 60000;
    let displayedTime;

    if (timeMinutes < 1) {
      displayedTime = "< 1";
    } else {
      displayedTime = Math.round(timeMinutes).toString();
    }

    return displayedTime;
  }

  const time = getTime();

  return (
    <div>
      <Fab
        style={{ outline: "none" }}
        variant="extended"
        size="medium"
        color="primary"
        aria-label="add"
        className={classes.fab}
        href={`${props.api}/${reportId}`}
        onClick={handleClickOpen}
      >
        <GetAppIcon className={classes.extendedIcon} />
        Download Claims Data
      </Fab>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Download Claim Line Level Results"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This export will include your original data along with results from
            the analysis.
            <br />
            <br />
            Please note that it will take approximately <b>{time} minute(s) </b>
            before the downloaded file will appear below. If the webpage appears
            to be loading, the download is still processing.
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
