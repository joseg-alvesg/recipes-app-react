import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import { fetchCategories } from "../../util/FetchFunctions";

const MAX_CATEGORIES = 5;

export default function CategoryBar() {
  const { dbData, searchRecipes, searchByCategory } = useContext(SearchContext);
  const [categories, setCategories] = useState([]);
  const [selectedCatedory, setSelectedCategory] = useState("");
  const history = useHistory();

  const categoriesLoad = useCallback(async () => {
    const db =
      history.location.pathname === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchCategories(db);
    setCategories(res.meals || res.drinks);
  }, [history.location.pathname]);

  useEffect(() => {
    categoriesLoad();
  }, [categoriesLoad]);

  const handleSearch = useCallback(
    async (category) => {
      const route = history.location.pathname;
      if (selectedCatedory === category) {
        setSelectedCategory("");
        searchRecipes(route);
        return;
      }
      console.log("route", route);
      await searchByCategory(route, undefined, category);
      setSelectedCategory(category);
    },
    [
      history.location.pathname,
      searchByCategory,
      searchRecipes,
      selectedCatedory,
    ],
  );

  return (
    <div>
      {categories &&
        categories.slice(0, MAX_CATEGORIES).map((category) => (
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
