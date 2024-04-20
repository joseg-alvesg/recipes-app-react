import React, { useCallback, useContext, useEffect, useState } from "react";
import { getDoneRecipes } from "../../util/localStorageHelper";
import shareIcon from "../../images/shareIcon.svg";
import ShareButton from "../../components/ShareButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const history = useHistory();

  const getRecipes = useCallback(() => {
    const recipes = getDoneRecipes();
    setDoneRecipes(recipes);
    console.log(recipes);
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

  const filter = useCallback((type) => {
    const recipes = getDoneRecipes();
    if (type === "Meals") {
      return setDoneRecipes(recipes.filter((recipe) => recipe.type === "meal"));
    }
    if (type === "Drinks") {
      return setDoneRecipes(
        recipes.filter((recipe) => recipe.type === "drink"),
      );
    }
    setDoneRecipes(recipes);
  }, []);

  const goToDetails = useCallback((type, id) => {
    const route = type === "meal" ? "meals" : "drinks";
    const url = `/${route}/${id}`;
    history.push(url);
  }, []);

  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn" onClick={() => filter("All")}>
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={() => filter("Meals")}
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={() => filter("Drinks")}
        >
          Drinks
        </button>
      </div>

      <div className="container d-flex">
        {doneRecipes.map((recipe, index) => (
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
            {recipe.tags.map((tag, i) => (
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
