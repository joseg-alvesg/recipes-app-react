export const fetchRecipes = async (db, type, content) => {
  const filterType = {
    ingredient: ["i", "filter.php"],
    name: ["s", "search.php"],
    "first-letter": ["f", "search.php"],
  };
  const url = `https://www.${db}.com/api/json/v1/1/${filterType[type][1]}?${filterType[type][0]}=${content}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
