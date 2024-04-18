import React, { useCallback, useContext, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import CarouselCard from '../../components/CarouselCard';
import SearchContext from '../../context/SearchContext';

const INGREDIENTS = 20;

export default function RecipeDetails() {
  const { searchById, recipeDetails, getRecommends } = useContext(SearchContext);
  const history = useHistory();
  const { id } = useParams();

  const handleSearch = useCallback(async () => {
    const route = history.location.pathname.split('/')[1];
    await searchById(route, id);
    const recRoute = route === 'meals' ? 'drinks' : 'meals';
    await getRecommends(recRoute);
  }, [getRecommends, history.location.pathname, id, searchById]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const handleIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= INGREDIENTS; i += 1) {
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
            src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
            alt={ recipeDetails.strMeal || recipeDetails.strDrink }
            className="img-fluid w-25 h-25"
          />
          <h1 data-testid="recipe-title">
            {recipeDetails.strMeal || recipeDetails.strDrink}
          </h1>
          <p data-testid="recipe-category">
            {recipeDetails.strCategory}
            {' '}
            {recipeDetails.strAlcoholic}
          </p>
          {handleIngredients().map((ingredient, index) => (
            <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
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
              src={ recipeDetails.strYoutube }
              allow="accelerometer; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
          </div>
          <CarouselCard />
        </div>
      )}
    </div>
  );
}
