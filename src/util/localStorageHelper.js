export const setUser = (key, value) => {
  const valueToStore = JSON.stringify({ [key]: value });
  localStorage.setItem('user', valueToStore);
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  console.log('getDoneRecipes -> doneRecipes', doneRecipes);
  return doneRecipes;
};

export const saveDoneRecipes = (key, value) => {
  if (getDoneRecipes()) {
    const doneRecipes = getDoneRecipes();
    doneRecipes.push({ [key]: value });
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  } else {
    localStorage.setItem('doneRecipes', JSON.stringify([{ [key]: value }]));
  }
};
