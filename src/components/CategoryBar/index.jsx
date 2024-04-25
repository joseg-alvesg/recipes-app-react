import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import useCategories from "../../helpers/hooks/useCategories";
import CategoryCard from "../CategoryCard";

export default function CategoryBar() {
  const { searchRecipes, searchByCategory } = useContext(SearchContext);
  const categories = useCategories();
  const [selectedCatedory, setSelectedCategory] = useState("");
  const history = useHistory();

  const handleSearch = useCallback(
    async (category) => {
      const route = history.location.pathname;
      if (selectedCatedory === category || category === "All") {
        setSelectedCategory("");
        searchRecipes(route);
        return;
      }
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
    <div className="d-flex justify-content-center w-100 overflow-auto scroll-custom">
      <div
        className={`d-flex w-100 justify-content-xl-center ${history.location.pathname.includes("meals") ? "" : "justify-content-lg-center"}`}
      >
        <CategoryCard
          strCategory="All"
          handleSearch={() => handleSearch("All")}
          dataTestid="All-category-filter"
          selected={selectedCatedory === ""}
        />
        {categories &&
          categories.map((category) => (
            <CategoryCard
              key={category.strCategory}
              strCategory={category.strCategory}
              handleSearch={handleSearch}
              dataTestid={`${category.strCategory}-category-filter`}
              selected={selectedCatedory === category.strCategory}
            />
          ))}
      </div>
    </div>
  );
}
