import React, { useCallback, useEffect, useState } from "react";
import {
  getFavoriteRecipes,
  saveFavoriteRecipes,
} from "../../util/localStorageHelper";
import { ReactComponent as BlackHeartIcon } from "../../images/blackHeartIcon.svg";
import { ReactComponent as WhiteHeartIcon } from "../../images/whiteHeartIcon.svg";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function FavoriteButton({ id, recipeDetails }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  const saveFavorite = useCallback(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const existingRecipe = favoriteRecipes?.find((recipe) => recipe.id === id);
    if (existingRecipe) {
      favoriteRecipes.splice(favoriteRecipes.indexOf(existingRecipe), 1);
      localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
      setIsFavorite(false);
    } else {
      const recipe = {
        id,
        type: history.location.pathname.split("/")[1].replace("s", ""),
        nationality: recipeDetails.strArea || "",
        category: recipeDetails.strCategory || "",
        alcoholicOrNot: recipeDetails.strAlcoholic || "",
        name: recipeDetails.strMeal || recipeDetails.strDrink,
        image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
      };
      saveFavoriteRecipes(recipe);
      setIsFavorite(true);
    }
  }, [recipeDetails]);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const existingRecipe = favoriteRecipes?.find((recipe) => recipe.id === id);
    if (existingRecipe) {
      setIsFavorite(true);
    }
  }, []);

  return (
    <>
      {isFavorite ? (
        <WhiteHeartIcon
          alt="recipe"
          onClick={saveFavorite}
          data-testid="favorite-btn"
          className="point w-30-p h-30-p ms-2"
          fill="#fdc500"
        />
      ) : (
        <BlackHeartIcon
          alt="recipe"
          onClick={saveFavorite}
          data-testid="favorite-btn"
          className="point w-30-p h-30-p ms-2"
          fill="#fdc500"
        />
      )}
    </>
  );
}
