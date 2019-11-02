import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import styles from "./Auth.styles";
import { signin, signup } from "./Auth.service";

const Auth = ({user, history}) => {
  return <div onClick={() => history.push('/questions')}>Auth, {user}</div>;
};

const mapStateToProps = state => ({
  user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
  callSignin: () => dispatch(signin()),
  callSignup: () => dispatch(signup()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Auth));
