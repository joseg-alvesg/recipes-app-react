import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import {
  getDoneRecipes,
  getFavoriteRecipes,
} from '../../util/localStorageHelper';
import ShareButton from '../../components/ShareButton';
import FavDoneFilters from '../../components/FavDoneFilters';
import FilterContext from '../../context/FilterContext';
import FavoriteButton from '../../components/FavoriteButton';

export default function DoneRecipes() {
  const { recipes, setRecipes } = useContext(FilterContext);
  const history = useHistory();

  const getDone = useCallback(() => {
    const storage = getDoneRecipes();
    setRecipes(storage);
  }, [setRecipes]);

  useEffect(() => {
    if (history.location.pathname.includes('done-recipes')) {
      getDone();
    }
    if (history.location.pathname.includes('favorite-recipes')) {
      const storage = getFavoriteRecipes();
      setRecipes(storage);
    }
  }, [history.location.pathname, getDone, setRecipes]);

  const goToDetails = useCallback(
    (type, id) => {
      const route = type === 'meal' ? 'meals' : 'drinks';
      const url = `/${route}/${id}`;
      history.push(url);
    },
    [history],
  );

  const removeFavorite = useCallback(
    (id) => {
      const storage = getFavoriteRecipes();
      const existingRecipe = storage.find((recipe) => recipe.id === id);
      storage.splice(storage.indexOf(existingRecipe), 1);
      localStorage.setItem('favoriteRecipes', JSON.stringify(storage));
      setRecipes(storage);
    },
    [setRecipes],
  );

  const dateWrapper = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString();
  };

  const buttonWrapper = (recipe, index) => (
    <div className="d-flex justify-content-end">
      <ShareButton
        type={ recipe.type }
        id={ recipe.id }
        dataTestid={ `${index}-horizontal-share-btn` }
      />
      {history.location.pathname.includes('favorite-recipes') && (
        <FavoriteButton
          id={ recipe.id }
          recipeDetails={ recipe }
          removeFavorite={ removeFavorite }
        />
      )}
    </div>
  );

  return (
    <div
      className="w-100 h-100 d-flex flex-column align-items-center
      justify-content-center"
    >
      <FavDoneFilters />
      <div className="container w-100 d-flex flex-wrap gap-3">
        {recipes?.map((recipe, index) => (
          <div key={ recipe.id + index } className="card mb-3 w-100">
            <div className="row g-0">
              <div className="col-6 col-md-3 d-flex align-items-center">
                <button
                  className="btn m-0 p-0 border-0"
                  type="button"
                  onClick={ () => goToDetails(recipe.type, recipe.id) }
                >
                  <img
                    src={ recipe.image }
                    alt="recipe"
                    key={ index }
                    className="img-fluid rounded-start"
                    style={ { objectFit: 'cover', height: '200px' } }
                    data-testid={ `${index}-horizontal-image` }
                  />
                </button>
              </div>
              <div
                className="col-6 col-md-9"
                style={ {
                  maxHeight: '200px',
                } }
              >
                <div className="card-body">
                  <button
                    type="button"
                    className="card-title fs-5 fw-bold m-0 p-0 btn border-0"
                    onClick={ () => goToDetails(recipe.type, recipe.id) }
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipe.name}
                  </button>
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="card-text m-0 p-0"
                  >
                    {recipe.nationality && `${recipe.nationality} - `}
                    {recipe.category}
                  </p>
                  <p
                    data-testid={ `${index}-horizontal-done-date` }
                    className="card-text m-0 p-0"
                  >
                    Done:
                    {' '}
                    {dateWrapper(recipe.doneDate)}
                  </p>
                  {recipe.tags
                    && recipe.tags.map((tag, i) => (
                      <p
                        key={ i }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                        className="card-text m-0 p-0 d-inline"
                      >
                        {tag}
                        {i < recipe.tags.length - 1 && ', '}
                      </p>
                    ))}
                  {recipe.alcoholicOrNot && (
                    <p
                      data-testid={ `${index}-horizontal-top-text` }
                      className="card-text fs-5"
                    >
                      {recipe.alcoholicOrNot}
                    </p>
                  )}
                  {buttonWrapper(recipe, index)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
