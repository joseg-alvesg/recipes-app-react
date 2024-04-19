import React, { useContext, useEffect, useCallback, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import useGetRecipes from "../../helpers/hooks/useGetRecipes";
import { fetchRecipes } from "../../util/FetchFunctions";

export default function Meals() {
  const { searchBar } = useContext(SearchContext);
  const history = useHistory();
  const MAX_RECIPES = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes] = useGetRecipes();

  const startIndex = (currentPage - 1) * MAX_RECIPES;
  const endIndex = currentPage * MAX_RECIPES;

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const jumpToPage = (page) => {
    setCurrentPage(page);
  };

  // const fetchStartPage = useCallback(async () => {
  //   const db =
  //     history.location.pathname === "/meals" ? "themealdb" : "thecocktaildb";
  //   const res = await fetchRecipes(db, "name", "");
  //   setDbData(res.meals || res.drinks);
  // }, [history, setDbData]);
  //
  // useEffect(() => {
  //   fetchStartPage();
  //   console.log("recipes", recipes);
  // }, [fetchStartPage, recipes]);

  return (
    <div
      className="container d-flex flex-column align-items-center
      overflow-hidden justify-content-center"
      style={
        searchBar
          ? { marginTop: "190px", marginBottom: "60px" }
          : { marginTop: "130px", marginBottom: "60px" }
      }
    >
      <div className="row row-cols-2 overflow-auto justify-content-center gap-3">
        {recipes &&
          recipes.slice(startIndex, endIndex).map((data, i) => (
            <div
              onClick={() =>
                history.push(
                  `${history.location.pathname}/${data.idMeal || data.idDrink}`,
                )
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  history.push(
                    `${history.location.pathname}/${data.idMeal || data.idDrink}`,
                  );
                }
              }}
              role="button"
              tabIndex={0}
              key={data.idMeal || data.idDrink}
              className="col d-flex flex-column align-items-center
                justify-content-center w-25 border p-0 rounded"
              data-testid={`${i}-recipe-card`}
              // style={{ width: "250px", height: "250px" }}
            >
              <div className="container rounded p-0">
                <img
                  className="img-fluid w-100 rounded-top"
                  src={data.strMealThumb || data.strDrinkThumb}
                  alt={data.strMeal || data.srtDrink}
                  data-testid={`${i}-card-img`}
                />
              </div>
              <div className="container h-25 overflow-x-hidden text-nowrap">
                <p data-testid={`${i}-card-name`}>
                  {data.strMeal || data.strDrink}
                </p>
              </div>
            </div>
          ))}
        <div className="d-flex">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Anterior
          </button>
          <ul className="d-flex">
            {Array.from({
              length: Math.ceil(recipes.length / MAX_RECIPES),
            }).map((_, i) => (
              <li key={i} className="list-unstyled">
                <button onClick={() => jumpToPage(i + 1)}>{i + 1}</button>
              </li>
            ))}
          </ul>
          <button onClick={nextPage} disabled={endIndex >= recipes.length}>
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
