import { useCallback, useContext, useEffect } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';
import { fetchDetails } from '../../util/FetchFunctions';

export default function useRecipeDetails() {
  const INGREDIENTS = 20;
  const {
    recipeDetails,
    setRecipeDetails,
    setIngredients,
    ingredients } = useContext(SearchContext);
  const history = useHistory();
  const { id } = useParams();

  const searchById = useCallback(async () => {
    const route = history.location.pathname.split('/')[1];
    const db = route === 'meals' ? 'themealdb' : 'thecocktaildb';
    const res = await fetchDetails(db, id);
    const data = res.meals || res.drinks;
    if (data[0].strYoutube) {
      data[0].strYoutube = data[0].strYoutube.replace('watch?v=', 'embed/');
    } else if (data[0].strVideo) {
      data[0].srtVideo = data[0].strVideo.replace('watch?v=', 'embed/');
    }
    setRecipeDetails(data[0]);
    return data[0];
  }, [history.location.pathname, id, setRecipeDetails]);

  const handleIngredients = useCallback(() => {
    const ingr = [];
    for (let i = 1; i <= INGREDIENTS; i += 1) {
      if (recipeDetails[`strIngredient${i}`]) {
        ingr.push(
          `${recipeDetails[`strIngredient${i}`]} - ${recipeDetails[`strMeasure${i}`]}`,
        );
      }
    }
    setIngredients(ingr);
    return ingr;
  }, [recipeDetails, setIngredients]);

  useEffect(() => {
    searchById();
  }, [searchById]);
  useEffect(() => {
    handleIngredients();
  }, [handleIngredients]);

  return [recipeDetails, ingredients];
}
