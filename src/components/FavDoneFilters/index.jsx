import React, { useCallback, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FilterContext from "../../context/FilterContext";
import {
  getDoneRecipes,
  getFavoriteRecipes,
} from "../../util/localStorageHelper";
import { ReactComponent as AllIcon } from "../../images/mealCategories/all.svg";
import { ReactComponent as MealIcon } from "../../images/mealIcon.svg";
import { ReactComponent as DrinkIcon } from "../../images/drinkIcon.svg";

export default function FavDoneFilters() {
  const { setRecipes } = useContext(FilterContext);
  const history = useHistory();
  const filter = useCallback(
    (type) => {
      let storage = [];
      if (history.location.pathname.includes("done-recipes")) {
        storage = getDoneRecipes();
      }
      if (history.location.pathname.includes("favorite-recipes")) {
        storage = getFavoriteRecipes();
      }
      if (type === "Meals") {
        return setRecipes(storage.filter((recipe) => recipe.type === "meal"));
      }
      if (type === "Drinks") {
        return setRecipes(storage.filter((recipe) => recipe.type === "drink"));
      }
      setRecipes(storage);
    },
    [history.location.pathname, setRecipes],
  );

  return (
    <div className="d-flex">
      <button
        className="btn d-flex flex-column align-items-center"
        onClick={() => filter("All")}
        data-testid="filter-by-all-btn"
      >
        <div className="radius-button-yellow p-2">
          <AllIcon className="w-100 h-100" fill="#fdc500" />
        </div>
        <span
          className="w-100 fs-5 mikado-yellow-color border-bottom border-2
          border-warning"
        >
          All
        </span>
      </button>
      <button
        className="btn d-flex flex-column align-items-center"
        data-testid="filter-by-meal-btn"
        onClick={() => filter("Meals")}
      >
        <div className="radius-button-yellow p-2">
          <MealIcon className="p-1 w-100 h-100" fill="#fdc500" />
        </div>
        <span
          className="w-100 fs-5 mikado-yellow-color border-bottom border-2
          border-warning"
        >
          Meals
        </span>
      </button>
      <button
        className="btn d-flex flex-column align-items-center"
        data-testid="filter-by-drink-btn"
        onClick={() => filter("Drinks")}
      >
        <div className="radius-button-yellow p-2">
          <DrinkIcon className="p-1 w-100 h-100" fill="#fdc500" />
        </div>
        <span
          className="w-100 fs-5 mikado-yellow-color border-bottom border-2
          border-warning"
        >
          Drinks
        </span>
      </button>
    </div>
  );
}
