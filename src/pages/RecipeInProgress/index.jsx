import React, { useCallback, useContext, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';

export default function RecipeInProgress() {
  const { recipeDetails, ingredients, searchById } = useContext(SearchContext);
  const history = useHistory();
  const { id } = useParams();

  const handleSearch = useCallback(async () => {
    const route = history.location.pathname.split('/')[1];
    await searchById(route, id);
    handleIngredients();
  }, [history.location.pathname, searchById]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  return (
    <div className=" w-100 h-100">
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt="recipe"
        style={ { width: '100px' } }
      />
      <h1 data-testid="recipe-title">{recipeDetails.strMeal}</h1>

      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>

      <p data-testid="recipe-category">{recipeDetails.strCategory}</p>

      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
      {ingredients.map((ingredient, index) => (
        <>
          <label key={ index } htmlFor={ ingredient }>
            {' '}
            {ingredient}
            {' '}
          </label>
          <input
            key={ index }
            type="checkbox"
            data-testid={ `${index}-ingredient-step` }
          />
        </>
      ))}
    </div>
  );
}
