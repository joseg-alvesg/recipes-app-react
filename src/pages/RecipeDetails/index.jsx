import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Link,
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import CarouselCard from "../../components/CarouselCard";
import SearchContext from "../../context/SearchContext";
import useGetRecipes from "../../helpers/hooks/useGetRecipes";
import useRecipeDetails from "../../helpers/hooks/useRecipeDetails";
import { getDoneRecipes } from "../../util/localStorageHelper";

const INGREDIENTS = 20;

export default function RecipeDetails() {
  const { searchById, getRecommends, setIngredients } =
    useContext(SearchContext);
  const [doneRecipe, setDoneRecipe] = useState(false);
  const history = useHistory();
  const { id } = useParams();
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

  // const handleSearch = useCallback(async () => {
  //   const route = history.location.pathname.split("/")[1];
  //   await searchById(route, id);
  //   const recRoute = route === "meals" ? "drinks" : "meals";
  //   await getRecommends(recRoute);
  //   handleIngredients();
  // }, [getRecommends, history.location.pathname, id, searchById]);

  useEffect(() => {
    // handleSearch();
    checkDoneRecipes();
  }, [checkDoneRecipes, recipeDetails]);

  const handleIngredients = () => {
    const ingr = [];
    for (let i = 1; i <= INGREDIENTS; i += 1) {
      if (recipeDetails[`strIngredient${i}`]) {
        ingr.push(
          `${recipeDetails[`strIngredient${i}`]} - ${recipeDetails[`strMeasure${i}`]}`,
        );
      }
    }
    setIngredients(ingr);
  };

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
              Start Recipe
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
