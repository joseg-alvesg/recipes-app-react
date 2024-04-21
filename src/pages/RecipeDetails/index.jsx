import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import CarouselCard from "../../components/CarouselCard";
import FavoriteButton from "../../components/FavoriteButton";
import ShareButton from "../../components/ShareButton";
import useRecipeDetails from "../../helpers/hooks/useRecipeDetails";
import {
  getDoneRecipes,
  getInProgressRecipes,
} from "../../util/localStorageHelper";

export default function RecipeDetails() {
  const [doneRecipe, setDoneRecipe] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const [progress, setProgress] = useState(false);
  const [recipeDetails, ingredients] = useRecipeDetails();

  const checkDoneRecipes = useCallback(() => {
    const map = new Map();
    const donerecipes = getDoneRecipes();
    if (!donerecipes) return;
    donerecipes.forEach((recipe) => {
      map.set(recipe.id, true);
    });

    if (map.get(id)) {
      setDoneRecipe(true);
      return;
    }
    setDoneRecipe(false);
  }, [id]);

  const checkInProgress = useCallback(() => {
    const inProgressRecipes = getInProgressRecipes();
    if (!inProgressRecipes) return;
    const route = history.location.pathname.split("/")[1];
    const recipee = inProgressRecipes[route];
    if (recipee && recipee[id]) {
      setProgress(true);
    }
  }, []);

  useEffect(() => {
    checkDoneRecipes();
    checkInProgress();
  }, [checkDoneRecipes, recipeDetails, checkInProgress]);

  return (
    <div className="d-flex w-100 h-100">
      {recipeDetails && (
        <div className="container">
          <img
            data-testid="recipe-photo"
            src={recipeDetails.strMealThumb || recipeDetails.strDrinkThumb}
            alt={recipeDetails.strMeal || recipeDetails.strDrink}
            className="img-fluid w-25 h-25"
          />
          <ShareButton dataTestid="share-btn" />
          <FavoriteButton id={id} recipeDetails={recipeDetails} />
          <h1 data-testid="recipe-title">
            {recipeDetails.strMeal || recipeDetails.strDrink}
          </h1>
          <p data-testid="recipe-category">
            {recipeDetails.strCategory} {recipeDetails.strAlcoholic}
          </p>
          {ingredients &&
            ingredients.map((ingredient, index) => (
              <p
                key={index}
                data-testid={`${index}-ingredient-name-and-measure`}
              >
                {ingredient}
              </p>
            ))}
          <p data-testid="instructions">{recipeDetails.strInstructions}</p>
          <p>{recipeDetails.strYoutube}</p>
          <div>
            <iframe
              data-testid="video"
              width="853"
              height="480"
              src={recipeDetails.strYoutube}
              allow="accelerometer; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <CarouselCard />
          {!doneRecipe && (
            <Link
              data-testid="start-recipe-btn"
              className="position-fixed bottom-0"
              to={`${history.location.pathname}/in-progress`}
            >
              {progress ? "Continue Recipe" : "start recipe"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
