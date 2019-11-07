import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Navbar.styles";

const Navbar = ({
  classes,
  showModal,
  callLogout,
  showFiltersModal,
  filtersApplied,
}) => {
  return (
    <div className={classes.container}>
      <p
        className={classes["navbar-action"]}
        onClick={() => showFiltersModal(true)}
      >
        Filters
        {filtersApplied
          ? <span className={classes['filters-symbol']}></span>
          : null}
      </p>
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
