import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Meals from "../pages/meals";
import Header from "../components/Header";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/meals"
        render={() => (
          <>
            <Header title="Meals" /> <Meals />
          </>
        )}
      />
    </Switch>
  );
}
