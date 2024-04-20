import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import useRecipeDetails from "../../helpers/hooks/useRecipeDetails";
import {
  getInProgressRecipes,
  saveInProgressRecipes,
} from "../../util/localStorageHelper";

export default function RecipeInProgress() {
  const [recipeDetails, ingredients] = useRecipeDetails();
  const [checkedIngredients, setCheckedIngredients] = useState([]);
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
      return;
    } else {
      console.log("aqui");
      const hasIngredients = ingredients.reduce((acc, ingredient) => {
        acc[ingredient] = false;
        return acc;
      }, {});
      setCheckedIngredients(hasIngredients);
    }
  }, []);

  const toggleIngredient = useCallback((value) => {
    setCheckedIngredients((prevCheckedIngredients) => {
      const newCheckedIngredients = { ...prevCheckedIngredients };

      newCheckedIngredients[value] = !newCheckedIngredients[value];
      return newCheckedIngredients;
    });
  }, []);

  const saveIngredients = () => {
    const route = history.location.pathname.split("/")[1];
    const newCheckedIngredients = { ...checkedIngredients };
    console.log("newCheckedIngredients", newCheckedIngredients);
    saveInProgressRecipes(route, id, newCheckedIngredients);
  };

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

      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>

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
            onClick={(e) => toggleIngredient(e.target.id)}
            id={ingredient}
          >
            <input
              type="checkbox"
              name={ingredient}
              onChange={(e) => {
                toggleIngredient(e.target.id);
                saveIngredients(e.target.id);
              }}
              id={ingredient}
              checked={checkedIngredients[ingredient] || false}
            />
            {ingredient}
          </label>
        </div>
      ))}

      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}
