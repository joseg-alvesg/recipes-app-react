import { useEffect, useContext, useCallback } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';
import { fetchRecipes } from '../../util/FetchFunctions';

export default function useGetRecipes(
  filter = 'name',
  content = '',
  recomendation = false,
) {
  const { recipes, setRecipes, setAlertCall } = useContext(SearchContext);
  const history = useHistory();

  const searchRecipes = useCallback(async () => {
    const route = history.location.pathname.split('/')[1];

    let db = route === 'meals' ? 'themealdb' : 'thecocktaildb';
    if (recomendation) {
      db = route === 'meals' ? 'thecocktaildb' : 'themealdb';
    }
    const res = await fetchRecipes(db, filter, content);
    if (!res.meals && !res.drinks) {
      setAlertCall({
        error: 'Sorry, we haven\'t found any recipes for these filters.',
      });
      return;
    }
    const data = res.meals || res.drinks;
    setRecipes(data);
    return data;
  }, [
    content,
    filter,
    history.location.pathname,
    recomendation,
    setRecipes,
    setAlertCall,
  ]);

  useEffect(() => {
    searchRecipes();
  }, [searchRecipes, history.location.pathname]);

  return [recipes];
}
