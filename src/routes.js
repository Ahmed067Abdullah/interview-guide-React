import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

// Containers
import Auth from "./containers/Auth/Auth";
import Questions from "./containers/Questions/Questions";

const getRoutes = status => {
  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Redirect to="/auth" />
    </Switch>
  );

  // routes for logged in user
  if (status) {
    routes = (
      <Switch>
        <Route path="/questions" exact component={Questions} />
        <Redirect to="/questions" />
      </Switch>
    );
  }
  return routes;
};

export default getRoutes;
