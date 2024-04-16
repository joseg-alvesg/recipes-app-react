import { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import SearchContext from "./SearchContext";

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState();
  const [mealData, setMealData] = useState([]);
  ("https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}");
  const value = useMemo(
    () => ({
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      mealData,
      setMealData,
    }),
    [
      searchBar,
      setSearchBar,
      searchText,
      setSearchText,
      filterType,
      setFilterType,
      mealData,
      setMealData,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}
