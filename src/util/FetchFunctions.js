export const fetchMealRecipes = async (type, content) => {
  const baseUrl = "https://www.themealdb.com/api/json/v1/1/";
  const filterType = {
    ingredient: ["i", "filter.php"],
    name: ["s", "search.php"],
    "first-letter": ["f", "search.php"],
  };
  const response = await fetch(
    `${baseUrl}${filterType[type][1]}?${filterType[type][0]}=${content}`,
  );
  const data = await response.json();
  return data;
};
