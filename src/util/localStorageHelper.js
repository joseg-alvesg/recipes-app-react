export const setUser = (key, value) => {
  const valueToStore = JSON.stringify({ [key]: value });
  localStorage.setItem('user', valueToStore);
};

export const getInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  );
  return inProgressRecipes;
};

export const saveInProgressRecipes = (route, key = '123', value = '123') => {
  if (getInProgressRecipes()) {
    let inProgressRecipes = getInProgressRecipes();
    inProgressRecipes = {
      ...inProgressRecipes,
      [route]: { ...inProgressRecipes[route], [key]: value },
    };
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify(inProgressRecipes),
    );
  } else {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({ [route]: { [key]: value } }),
    );
  }
};

export const getFavoriteRecipes = () => {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  return favoriteRecipes;
};

export const saveFavoriteRecipes = (value) => {
  if (getFavoriteRecipes()) {
    const favoriteRecipes = getFavoriteRecipes();
    favoriteRecipes.push({ ...value });
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  } else {
    localStorage.setItem('favoriteRecipes', JSON.stringify([{ ...value }]));
  }
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  return doneRecipes;
};

export const saveDoneRecipes = (value) => {
  if (getDoneRecipes()) {
    const doneRecipes = getDoneRecipes();
    doneRecipes.push({ ...value });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([{ ...value }]));
  }
};
