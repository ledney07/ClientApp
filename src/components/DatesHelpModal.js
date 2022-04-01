import React, { useState, forwardRef } from "react";
import Table from "react-bootstrap/Table";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import HelpIcon from "@material-ui/icons/Help";
import Tooltip from "@material-ui/core/Tooltip";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DatesHelpModal(props) {
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClick() {
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Tooltip title={<text style={{ fontSize: 11 }}>Date Format Help</text>}>
        <HelpIcon
          button
          onClick={handleClick}
          style={{
            color: "#177BAD",
            fontSize: 16,
            marginTop: -7,
            cursor: "pointer",
          }}
        />
      </Tooltip>
      <Dialog
        open={open}
        maxWidth={700}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          Instruction to Input Date Formats
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <text>
              Below are some examples for common date formats {<br />}
              (e.g. For a date like "2021-01-01", use "yyyy-mm-dd".)
            </text>
            <Table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Format String</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>2021-01-01</td>
                  <td>yyyy-mm-dd</td>
                </tr>
                <tr>
                  <td>20210101</td>
                  <td>yyyymmdd</td>
                </tr>
                <tr>
                  <td>01/01/2021</td>
                  <td>mm/dd/yyyy</td>
                </tr>
                <tr>
                  <td>1/1/2021</td>
                  <td>m/d/yyyy</td>
                </tr>
              </tbody>
            </Table>

            <hr />

            <text>
              Below lists all possible options to input a date format for the
              day, month, and year.
            </text>
            <Table>
              <thead>
                <tr>
                  <th>Format Entry</th>
                  <th>Date Type</th>
                  <th>Range of Values</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>d</td>
                  <td>Day with no leading zero</td>
                  <td>1 to 31</td>
                </tr>
                <tr>
                  <td>dd</td>
                  <td>Day with leading zero</td>
                  <td>01 to 31</td>
                </tr>
                <tr>
                  <td>ddd</td>
                  <td>Abbreviated name of the day</td>
                  <td>Mon, Tues, etc.</td>
                </tr>
                <tr>
                  <td>dddd</td>
                  <td>Full name of the day</td>
                  <td>Monday, Tuesday, etc.</td>
                </tr>
                <tr>
                  <td>m</td>
                  <td>Month with no leading zero</td>
                  <td>1 to 12</td>
                </tr>
                <tr>
                  <td>mm</td>
                  <td>Month with leading zero</td>
                  <td>01 to 12</td>
                </tr>
                <tr>
                  <td>mmm</td>
                  <td>Abbreviated month</td>
                  <td>Jan, Feb, etc.</td>
                </tr>
                <tr>
                  <td>mmmm</td>
                  <td>Full month</td>
                  <td>January, February, etc.</td>
                </tr>
                <tr>
                  <td>yy</td>
                  <td>2-digit year</td>
                  <td>15, 16, etc.</td>
                </tr>
                <tr>
                  <td>yyyy</td>
                  <td>Full year</td>
                  <td>2015, 2016, etc.</td>
                </tr>
              </tbody>
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
