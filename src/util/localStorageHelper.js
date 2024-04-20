export const setUser = (key, value) => {
  const valueToStore = JSON.stringify({ [key]: value });
  localStorage.setItem("user", valueToStore);
};

export const getDoneRecipes = () => {
  const doneRecipes = JSON.parse(localStorage.getItem("doneRecipes"));
  console.log("getDoneRecipes -> doneRecipes", doneRecipes);
  return doneRecipes;
};

export const saveDoneRecipes = (key, value) => {
  if (getDoneRecipes()) {
    const doneRecipes = getDoneRecipes();
    doneRecipes.push({ [key]: value });
    localStorage.setItem("doneRecipes", JSON.stringify(doneRecipes));
  } else {
    localStorage.setItem("doneRecipes", JSON.stringify([{ [key]: value }]));
  }
};
// {
//     drinks: {
//         id-da-bebida: [lista-de-ingredientes-utilizados],
//         ...
//     },
//     meals: {
//         id-da-comida: [lista-de-ingredientes-utilizados],
//         ...
//     }
// }

export const getInProgressRecipes = () => {
  const inProgressRecipes = JSON.parse(
    localStorage.getItem("inProgressRecipes"),
  );
  return inProgressRecipes;
};

export const saveInProgressRecipes = (route, key = "123", value = "123") => {
  if (getInProgressRecipes()) {
    let inProgressRecipes = getInProgressRecipes();
    inProgressRecipes = {
      ...inProgressRecipes,
      [route]: { ...inProgressRecipes[route], [key]: value },
    };
    localStorage.setItem(
      "inProgressRecipes",
      JSON.stringify(inProgressRecipes),
    );
  } else {
    localStorage.setItem(
      "inProgressRecipes",
      JSON.stringify({ [route]: { [key]: value } }),
    );
  }
};
