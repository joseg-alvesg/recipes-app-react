import copy from "clipboard-copy";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  useHistory,
  useLocation,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "react-bootstrap";
import useRecipeDetails from "../../helpers/hooks/useRecipeDetails";
import {
  getFavoriteRecipes,
  getInProgressRecipes,
  saveDoneRecipes,
  saveFavoriteRecipes,
  saveInProgressRecipes,
} from "../../util/localStorageHelper";
import blackHeartIcon from "../../images/blackHeartIcon.svg";
import whiteHeartIcon from "../../images/whiteHeartIcon.svg";
import ShareButton from "../../components/ShareButton";
import FavoriteButton from "../../components/FavoriteButton";

export default function RecipeInProgress() {
  const [recipeDetails, ingredients] = useRecipeDetails();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const route = history.location.pathname.split("/")[1];
    if (
      getInProgressRecipes() &&
      getInProgressRecipes()[route] &&
      getInProgressRecipes()[route][id]
    ) {
      setCheckedIngredients(getInProgressRecipes()[route][id]);
    } else {
      // console.log("aqui");

      const hasIngredients = ingredients.reduce((acc, ingredient) => {
        acc[ingredient] = false;
        return acc;
      }, {});
      setCheckedIngredients(hasIngredients);
    }
  }, [ingredients]);

  const toggleIngredient = useCallback(
    (value) => {
      setCheckedIngredients((prevCheckedIngredients) => {
        const newCheckedIngredients = { ...prevCheckedIngredients };
        newCheckedIngredients[value] = !newCheckedIngredients[value];
        saveInProgressRecipes(
          history.location.pathname.split("/")[1],
          id,
          newCheckedIngredients,
        );
        return newCheckedIngredients;
      });
    },
    [history, id],
  );

  const disableFinishRecipe = useCallback(() => {
    const ingredientsArray = Object.values(checkedIngredients);
    return ingredientsArray.some((ingredient) => ingredient === false);
  }, [checkedIngredients]);

  useEffect(() => {
    setIsFinished(!disableFinishRecipe());
  }, [checkedIngredients]);

  const finishRecipe = useCallback(() => {
    const recipe = {
      id,
      type: history.location.pathname.split("/")[1].replace("s", ""),
      nationality: recipeDetails.strArea || "",
      category: recipeDetails?.strCategory || "",
      alcoholicOrNot: recipeDetails.strAlcoholic || "",
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,

      doneDate: new Date(),
      tags: recipeDetails.strTags ? recipeDetails.strTags.split(",") : [],
    };

    saveDoneRecipes(recipe);
    history.push("/done-recipes");
  }, [recipeDetails]);

  return (
    <div className=" w-100 h-100">
      <img
        data-testid="recipe-photo"
        src={recipeDetails.strMealThumb || recipeDetails.strDrinkThumb}
        alt="recipe"
        style={{ width: "100px" }}
      />
      <h1 data-testid="recipe-title">
        {recipeDetails.strMeal || recipeDetails.strDrink}
      </h1>

      <ShareButton dataTestid="share-btn" />
      <FavoriteButton id={id} recipeDetails={recipeDetails && recipeDetails} />

      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>

      <p data-testid="instructions">{recipeDetails.strInstructions}</p>

      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <label
            key={index}
            data-testid={`${index}-ingredient-step`}
            style={{
              textDecoration: checkedIngredients[ingredient]
                ? "line-through solid rgb(0, 0, 0)"
                : "none",
            }}
            onClick={() => toggleIngredient(ingredient)}
          >
            <input
              type="checkbox"
              name={ingredient}
              onClick={() => toggleIngredient(ingredient)}
              onChange={() => {
                toggleIngredient(ingredient);
                // saveIngredients(e.target.id);
              }}
              id={ingredient}
              checked={checkedIngredients[ingredient] || false}
            />
            {ingredient}
          </label>
        </div>
      ))}

      <button
        data-testid="finish-recipe-btn"
        disabled={!isFinished}
        onClick={finishRecipe}
      >
        Finalizar Receita
      </button>
    </div>
  );
}
