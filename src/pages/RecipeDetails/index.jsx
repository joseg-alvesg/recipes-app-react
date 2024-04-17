import React, { useContext, useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";

export default function RecipeDetails() {
  const { searchById, recipeDetails } = useContext(SearchContext);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const route = history.location.pathname.split("/")[1];
    await searchById(route, id);
  };

  const handleIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i += 1) {
      if (recipeDetails[`strIngredient${i}`]) {
        ingredients.push(
          `${recipeDetails[`strIngredient${i}`]} - ${recipeDetails[`strMeasure${i}`]}`,
        );
      }
    }
    return ingredients;
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
          {handleIngredients().map((ingredient, index) => (
            <p key={index} data-testid={`${index}-ingredient-name-and-measure`}>
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
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
        </div>
      )}
    </div>
  );
}
