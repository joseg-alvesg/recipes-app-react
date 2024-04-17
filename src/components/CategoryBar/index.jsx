import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import { fetchCategories } from "../../util/FetchFunctions";

export default function CategoryBar() {
  const { dbData, setDbData, searchRecipes, searchByCategory } =
    useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [selectedCatedory, setSelectedCategory] = useState("");
  const history = useHistory();

  const categoriesLoad = async () => {
    const db =
      history.location.pathname === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchCategories(db);
    console.log(res);
    setCategories(res.meals || res.drinks);
  };
  useEffect(() => {
    categoriesLoad();
  }, [dbData]);

  const handleSearch = async (category) => {
    const route = history.location.pathname;
    if (selectedCatedory === category) {
      searchRecipes(route);
      return;
    }
    await searchByCategory(route, undefined, category);
    setSelectedCategory(category);
  };

  return (
    <div>
      {categories &&
        categories.slice(0, 5).map((category) => (
          <button
            key={category.strCategory}
            data-testid={`${category.strCategory}-category-filter`}
            type="button"
            onClick={() => handleSearch(category.strCategory)}
          >
            {category.strCategory}
          </button>
        ))}
      <button
        data-testid="All-category-filter"
        type="button"
        onClick={() => searchRecipes(history.location.pathname)}
      >
        All
      </button>
    </div>
  );
}
