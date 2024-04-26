import React, { useCallback, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import useRecipeDetails from "../../helpers/hooks/useRecipeDetails";
import {
  getInProgressRecipes,
  saveDoneRecipes,
  saveInProgressRecipes,
} from "../../util/localStorageHelper";
import DetailsCard from "../../components/DetailsCard";

export default function RecipeInProgress() {
  const [recipeDetails, ingredients] = useRecipeDetails();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
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
      const hasIngredients = ingredients.reduce((acc, ingredient) => {
        acc[ingredient] = false;
        return acc;
      }, {});
      setCheckedIngredients(hasIngredients);
    }
  }, [ingredients, history.location.pathname, id]);

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
  }, [checkedIngredients, disableFinishRecipe]);

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
  }, [recipeDetails, history, id]);

  return (
    <DetailsCard
      recipeDetails={recipeDetails}
      ingredients={ingredients}
      id={id}
      toggleIngredient={toggleIngredient}
      checkedIngredients={checkedIngredients}
      isFinished={isFinished}
      finishRecipe={finishRecipe}
    />
  );
}
