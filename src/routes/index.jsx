import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Recipes from '../pages/Recipes';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import FavDoneRecipes from '../pages/FavDoneRecipes';
import Profile from '../pages/Profile';
import SecondHeader from '../components/SecondHeader';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/meals"
        render={ () => (
          <>
            <Header />
            <SecondHeader title="Meals" />
            <Recipes />
            <Footer />
          </>
        ) }
      />
      <Route
        exact
        path="/drinks"
        render={ () => (
          <>
            <Header />
            <SecondHeader title="Drinks" />
            <Recipes />
            <Footer />
          </>
        ) }
      />
      <Route exact path="/meals/:id" component={ RecipeDetails } />
      <Route exact path="/drinks/:id" component={ RecipeDetails } />
      <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
      <Route
        exact
        path="/drinks/:id/in-progress"
        component={ RecipeInProgress }
      />
      <Route
        exact
        path="/done-recipes"
        render={ () => (
          <>
            <Header />
            <SecondHeader title="Done Recipes" />
            <FavDoneRecipes />
            <Footer />
          </>
        ) }
      />
      <Route
        exact
        path="/favorite-recipes"
        render={ () => (
          <>
            <Header />
            <SecondHeader title="Favorite Recipes" />
            <FavDoneRecipes />
            <Footer />
          </>
        ) }
      />
      <Route
        exactpath="/profile"
        render={ () => (
          <>
            <Header />
            <SecondHeader title="Profile" />
            <Profile />
            <Footer />
          </>
        ) }
      />
    </Switch>
  );
}
