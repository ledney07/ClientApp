import React from "react";
import { Button, Tooltip } from "@material-ui/core";

export default function PreviewLink(props) {
  function handleClick() {
    props.setOpen(true);
  }

  return (
    <React.Fragment>
      <Tooltip
              placement="top"
              title={<text style={{ fontSize: 12 }}>View data</text>}
            >
        <Button color="inherit" onClick={handleClick}>
          <text style={{ color: "#177BAD", fontSize: 12 }}>
            Data Preview
          </text>
        </Button>
      </Tooltip>
    </React.Fragment>
  );
}
