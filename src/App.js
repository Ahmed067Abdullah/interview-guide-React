import React, { useEffect } from "react";
import Auth from "./containers/Auth/Auth";
// import { BrowserRouter as Router } from "react-router-dom";
// import { connect } from "react-redux";

// import { setSignedIn } from "./store/actions/authActions";
// import getRoutes from "./routes";

const App = ({ setSignedIn, status }) => {
  // useEffect(() => {
  //   checkLoggedIn();
  // }, []);

  // const checkLoggedIn = () => {
  //   const user = JSON.parse(localStorage.getItem("crs"));
  //   if (user) {
  //     setSignedIn(user);
  //   }
  // };

  // let routes = getRoutes(status);
  return (
    // <Router>
    //   <div className="App">{routes}</div>
    // </Router>
    <Auth />
  );
};

// const mapStateToProps = state => {
//   return {
//     status: state.auth.status,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     setSignedIn: user => dispatch(setSignedIn(user)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(App);
export default App;
