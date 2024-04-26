import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {
  getFavoriteRecipes,
  saveFavoriteRecipes,
} from "../../util/localStorageHelper";
import { ReactComponent as BlackHeartIcon } from "../../images/blackHeartIcon.svg";
import { ReactComponent as WhiteHeartIcon } from "../../images/whiteHeartIcon.svg";

export default function FavoriteButton({
  id,
  recipeDetails,
  removeFavorite = null,
}) {
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
  }, [recipeDetails, id, history.location.pathname]);

  useEffect(() => {
    const favoriteRecipes = getFavoriteRecipes();
    const existingRecipe = favoriteRecipes?.find((recipe) => recipe.id === id);
    if (existingRecipe) {
      setIsFavorite(true);
    }
  }, [id]);

  return (
    <div className="p-3">
      {!isFavorite ? (
        <WhiteHeartIcon
          alt="recipe"
          onClick={() => saveFavorite()}
          data-testid="favorite-btn"
          className="point w-30-p h-30-p"
          fill="#fdc500"
        />
      ) : (
        <BlackHeartIcon
          alt="recipe"
          onClick={() => removeFavorite(id)}
          data-testid="favorite-btn"
          className="point w-30-p h-30-p"
          fill="#fdc500"
        />
      )}
    </div>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string.isRequired,
  recipeDetails: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  removeFavorite: PropTypes.func,
};
