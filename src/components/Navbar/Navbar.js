import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Navbar.styles";

const Navbar = ({ classes, showModal, callLogout }) => {
  return (
    <div className={classes.container}>
      <span
        className={classes["navbar-action"]}
        onClick={() => showModal(true)}
      >
        Share Question
      </span>
      <span className={classes["navbar-action"]} onClick={callLogout}>
        Logout
      </span>
    </div>
  );
};

export default withStyles(styles)(Navbar);
