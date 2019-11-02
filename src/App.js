import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";

import { setUser } from "./containers/Auth/Auth.action";
import getRoutes from "./routes";

const App = ({ setUser, status }) => {
  // useEffect(() => {
  //   checkLoggedIn();
  // }, []);

  // const checkLoggedIn = () => {
  //   const user = JSON.parse(localStorage.getItem("crs"));
  //   if (user) {
  //     setSignedIn(user);
  //   }
  // };

  let routes = getRoutes(status);
  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    status: state.auth.user,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
