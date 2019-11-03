import React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Navbar.styles";
import { logout } from "../../containers/Auth/Auth.service";

const Navbar = ({ classes, callLogout }) => {
  return (
    <div className={classes.container}>
      <span className={classes["navbar-action"]}>Share Question</span>
      <span className={classes["navbar-action"]} onClick={callLogout}>
        Logout
      </span>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  callLogout: () => dispatch(logout()),
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Navbar));
