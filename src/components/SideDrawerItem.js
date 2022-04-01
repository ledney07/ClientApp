import React from "react";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";

export default function SideDrawerItem(props) {
  return (
    <React.Fragment>
      {props.path === "/data_read_in" && (
        <Link component={RouterLink} to={props.path}>
          <MenuItem button selected={props.path === props.location}>
            <ListItemIcon className={props.classes}>{props.icon}</ListItemIcon>
            <ListItemText primary={props.itemText} />
          </MenuItem>
        </Link>
      )}
      {props.path !== "/data_read_in" && (
        <Link
          style={props.errorLength !== 0 ? { pointerEvents: "none" } : null}
          underline={props.errorLength !== 0 ? "none" : "hover"}
          component={RouterLink}
          to={props.errorLength === 0 ? props.path : "#"}
        >
          <MenuItem
            button
            disabled={props.errorLength !== 0}
            selected={props.path === props.location}
          >
            <ListItemIcon className={props.classes}>{props.icon}</ListItemIcon>
            <ListItemText primary={props.itemText} />
          </MenuItem>
        </Link>
      )}
    </React.Fragment>
  );
}
