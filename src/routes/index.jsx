import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../pages/Login";
import Recipes from "../pages/Recipes";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route
        exact
        path="/meals"
        render={() => (
          <>
            <Header title="Meals" />
            <Recipes />
            <Footer />
          </>
        )}
      />
      <Route
        exact
        path="/drinks"
        render={() => (
          <>
            <Header title="Drinks" /> <Recipes />
            <Footer />
          </>
        )}
      />
    </Switch>
  );
}
