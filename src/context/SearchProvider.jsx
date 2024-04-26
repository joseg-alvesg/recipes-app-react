import PropTypes from "prop-types";
import { useCallback, useState, useMemo } from "react";
import SearchContext from "./SearchContext";
import { fetchCategories } from "../util/FetchFunctions";

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState();
  const [dbData, setDbData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [alertCall, setAlertCall] = useState({
    error: "",
    sucess: "",
    notification: "",
  });

  const searchByCategory = useCallback(
    async (route, filter = "filter", category = "") => {
      const db = route === "/meals" ? "themealdb" : "thecocktaildb";
      const res = await fetchCategories(db, filter, category);
      const data = res.meals || res.drinks;
      setRecipes(data);
      return data;
    },
    [],
  );

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
      searchByCategory,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
      alertCall,
      setAlertCall,
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
      searchByCategory,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
      alertCall,
      setAlertCall,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
