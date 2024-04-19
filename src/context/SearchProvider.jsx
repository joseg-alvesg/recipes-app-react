import PropTypes from "prop-types";
import { useCallback, useState, useMemo } from "react";
import SearchContext from "./SearchContext";
import {
  fetchCategories,
  fetchDetails,
  fetchRecipes,
} from "../util/FetchFunctions";

export default function SearchProvider({ children }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterType, setFilterType] = useState();
  const [dbData, setDbData] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const searchRecipes = useCallback(
    async (route, filter = "name", content = "") => {
      const db = route === "/meals" ? "themealdb" : "thecocktaildb";
      const res = await fetchRecipes(db, filter, content);
      if (!res.meals && !res.drinks) {
        global.alert("Sorry, we haven't found any recipes for these filters.");
        return;
      }
      const data = res.meals || res.drinks;
      // console.log("provider data", data);
      setRecipes(data);
      return data;
    },
    [],
  );

  const searchByCategory = useCallback(
    async (route, filter = "filter", category = "") => {
      const db = route === "/meals" ? "themealdb" : "thecocktaildb";
      const res = await fetchCategories(db, filter, category);
      const data = res.meals || res.drinks;
      console.log("data", data);
      setRecipes(data);
      // console.log("searchByCategory", data);
      return data;
    },
    [],
  );

  const searchById = useCallback(async (route, id) => {
    const db = route === "meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchDetails(db, id);
    const data = res.meals || res.drinks;
    if (data[0].strYoutube) {
      data[0].strYoutube = data[0].strYoutube.replace("watch?v=", "embed/");
    } else if (data[0].strVideo) {
      data[0].srtVideo = data[0].strVideo.replace("watch?v=", "embed/");
    }
    console.log("data[0]", data[0]);
    setRecipeDetails(data[0]);
    return data[0];
  }, []);

  const getRecommends = useCallback(async (route) => {
    const db = route === "meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchRecipes(db, "name", "");
    const data = res.meals || res.drinks;
    setRecommendations(data);
    return data;
  }, []);

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
      searchById,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      getRecommends,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
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
      searchById,
      recipeDetails,
      setRecipeDetails,
      recommendations,
      setRecommendations,
      getRecommends,
      ingredients,
      setIngredients,
      recipes,
      setRecipes,
    ],
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

SearchProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
