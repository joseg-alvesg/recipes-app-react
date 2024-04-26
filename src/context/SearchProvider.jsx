import PropTypes from 'prop-types';
import { useCallback, useState, useMemo } from 'react';
import SearchContext from './SearchContext';
import { fetchCategories, fetchRecipes } from '../util/FetchFunctions';

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState();
  const [dbData, setDbData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [alertCall, setAlertCall] = useState({
    error: '',
    sucess: '',
    notification: '',
  });

  const searchRecipes = useCallback(
    async (route, filter = 'name', content = '') => {
      const db = route === '/meals' ? 'themealdb' : 'thecocktaildb';
      const res = await fetchRecipes(db, filter, content);
      if (!res.meals && !res.drinks) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
        return;
      }
      const data = res.meals || res.drinks;
      setRecipes(data);
      return data;
    },
    [],
  );
  const searchByCategory = useCallback(
    async (route, filter = 'filter', category = '') => {
      const db = route === '/meals' ? 'themealdb' : 'thecocktaildb';
      const res = await fetchCategories(db, filter, category);
      const data = res.meals || res.drinks;
      setRecipes(data);
      return data;
    },
    [],
  );

  const value = useMemo(
    () => ({
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      dbData,
      setDbData,
      searchByCategory,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
      alertCall,
      setAlertCall,
      searchRecipes,
    }),
    [
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      dbData,
      setDbData,
      searchByCategory,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
      alertCall,
      setAlertCall,
      searchRecipes,
    ],
  );

  return (
    <SearchContext.Provider value={ value }>{children}</SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
