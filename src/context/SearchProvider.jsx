import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import SearchContext from "./SearchContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchCategories, fetchRecipes } from "../util/FetchFunctions";

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState();
  const [dbData, setDbData] = useState([]);
  // ("https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}");

  const searchRecipes = async (route, filterType = "name", content = "") => {
    const db = route === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchRecipes(db, filterType, content);
    if (!res.meals && !res.drinks) {
      alert("Sorry, we haven't found any recipes for these filters.");
      return;
    }
    const data = res.meals || res.drinks;
    console.log("provider data", data);
    setDbData(data);
    return data;
  };

  const searchByCategory = async (route, filter = "filter", category = "") => {
    const db = route === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchCategories(db, filter, category);
    const data = res.meals || res.drinks;
    setDbData(data);
    return data;
  };

  const value = useMemo(
    () => ({
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      dbData,
      setDbData,
      searchRecipes,
      searchByCategory,
    }),
    [
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      dbData,
      setDbData,
      searchRecipes,
      searchByCategory,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
