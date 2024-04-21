import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  getDoneRecipes,
  getFavoriteRecipes,
} from "../../util/localStorageHelper";
import ShareButton from "../../components/ShareButton";
import FilterContext from "../../context/FilterProvider";
import FavDoneFilters from "../../components/FavDoneFilters";
import blackHeartIcon from "../../images/blackHeartIcon.svg";

export default function DoneRecipes() {
  const { recipes, setRecipes } = useContext(FilterContext);
  const history = useHistory();

  const getDone = useCallback(() => {
    const storage = getDoneRecipes();
    setRecipes(storage);
  }, []);

  useEffect(() => {
    if (window.location.href.includes("done-recipes")) {
      getDone();
    }
    if (window.location.href.includes("favorite-recipes")) {
      const storage = getFavoriteRecipes();
      console.log(storage);
      setRecipes(storage);
    }
  }, []);

  const goToDetails = useCallback((type, id) => {
    const route = type === "meal" ? "meals" : "drinks";
    const url = `/${route}/${id}`;
    history.push(url);
  }, []);

  const removeFavorite = useCallback((id) => {
    const storage = getFavoriteRecipes();
    const existingRecipe = storage.find((recipe) => recipe.id === id);
    storage.splice(storage.indexOf(existingRecipe), 1);
    localStorage.setItem("favoriteRecipes", JSON.stringify(storage));
    setRecipes(storage);
  }, []);

  return (
    <div>
      <FavDoneFilters />
      <div className="container d-flex">
        {recipes?.map((recipe, index) => (
          <div key={recipe.id + index}>
            <img
              src={recipe.image}
              alt="recipe"
              key={index}
              className="w-25"
              data-testid={`${index}-horizontal-image`}
              onClick={() => goToDetails(recipe.type, recipe.id)}
            />
            <p data-testid={`${index}-horizontal-top-text`}>
              {recipe.nationality && `${recipe.nationality} - `}
              {recipe.category}
            </p>
            {recipe.alcoholicOrNot && (
              <p data-testid={`${index}-horizontal-top-text`}>
                {recipe.alcoholicOrNot}
              </p>
            )}
            <p
              data-testid={`${index}-horizontal-name`}
              onClick={() => goToDetails(recipe.type, recipe.id)}
            >
              {recipe.name}
            </p>
            <p data-testid={`${index}-horizontal-done-date`}>
              {recipe.doneDate}
            </p>
            <ShareButton
              type={recipe.type}
              id={recipe.id}
              dataTestid={`${index}-horizontal-share-btn`}
            />
            {window.location.href.includes("favorite-recipes") && (
              <img
                src={blackHeartIcon}
                alt="heart"
                data-testid={`${index}-horizontal-favorite-btn`}
                onClick={() => removeFavorite(recipe.id)}
              />
            )}
            {recipe.tags &&
              recipe.tags?.map((tag, i) => (
                <p key={i} data-testid={`${index}-${tag}-horizontal-tag`}>
                  {tag}
                </p>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
