import React, { useCallback, useContext, useEffect, useState } from "react";
import { getDoneRecipes } from "../../util/localStorageHelper";

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  const getRecipes = useCallback(() => {
    const recipes = getDoneRecipes();
    setDoneRecipes(recipes);
    console.log(recipes);
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <div>
      <div>
        <button data-testid="filter-by-all-btn">All</button>
        <button data-testid="filter-by-meal-btn">Meals</button>
        <button data-testid="filter-by-drink-btn">Drinks</button>
      </div>

      {doneRecipes.map((recipe, index) => (
        <div key={recipe.id}>
          <img
            src={recipe.image}
            alt="recipe"
            key={index}
            className="w-25"
            data-testid={`${index}-horizontal-image`}
          />
          <p data-testid={`${index}-horizontal-top-text`}>{recipe.category}</p>
          <p data-testid={`${index}-horizontal-name`}>{recipe.name}</p>
          <p data-testid={`${index}-horizontal-done-date`}>{recipe.doneDate}</p>
          <button data-testid={`${index}-horizontal-share-btn`}>Share</button>
          {recipe.tags.map((tag, i) => (
            <p key={i} data-testid={`${index}-${tag}-horizontal-tag`}>
              {tag}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}
