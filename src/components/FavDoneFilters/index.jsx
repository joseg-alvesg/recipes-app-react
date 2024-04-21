import React, { useCallback, useContext } from 'react';
import FilterContext from '../../context/FilterProvider';
import {
  getDoneRecipes,
  getFavoriteRecipes,
} from '../../util/localStorageHelper';

export default function FavDoneFilters() {
  const { setRecipes } = useContext(FilterContext);
  const filter = useCallback((type) => {
    let storage = [];
    if (window.location.href.includes('done-recipes')) {
      storage = getDoneRecipes();
    } else if (window.location.href.includes('favorite-recipes')) {
      storage = getFavoriteRecipes();
    }
    if (type === 'Meals') {
      return setRecipes(storage.filter((recipe) => recipe.type === 'meal'));
    }
    if (type === 'Drinks') {
      return setRecipes(storage.filter((recipe) => recipe.type === 'drink'));
    }
    setRecipes(storage);
  }, []);

  return (
    <div>
      <button data-testid="filter-by-all-btn" onClick={ () => filter('All') }>
        All
      </button>
      <button data-testid="filter-by-meal-btn" onClick={ () => filter('Meals') }>
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('Drinks') }
      >
        Drinks
      </button>
    </div>
  );
}
