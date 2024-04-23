import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchCategories } from "../../util/FetchFunctions";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const history = useHistory();

  const categoriesLoad = useCallback(async () => {
    const db =
      history.location.pathname === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchCategories(db);
    setCategories(res.meals || res.drinks);
    console.log(res.meals);
  }, [history.location.pathname]);

  useEffect(() => {
    categoriesLoad();
  }, [categoriesLoad]);

  return categories;
}
