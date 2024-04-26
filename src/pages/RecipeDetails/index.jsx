import React, { useCallback, useEffect, useState } from 'react';
import {
  useHistory,
  useParams,
} from 'react-router-dom/cjs/react-router-dom.min';
import useRecipeDetails from '../../helpers/hooks/useRecipeDetails';
import {
  getDoneRecipes,
  getInProgressRecipes,
} from '../../util/localStorageHelper';
import DetailsCard from '../../components/DetailsCard';

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
    const route = history.location.pathname.split('/')[1];
    const recipee = inProgressRecipes[route];
    if (recipee && recipee[id]) {
      setProgress(true);
    }
  }, [history.location.pathname, id]);

  useEffect(() => {
    checkDoneRecipes();
    checkInProgress();
  }, [checkDoneRecipes, recipeDetails, checkInProgress]);

  return (
    <DetailsCard
      recipeDetails={ recipeDetails }
      ingredients={ ingredients }
      id={ id }
      doneRecipe={ doneRecipe }
      progress={ progress }
    />
  );
}
