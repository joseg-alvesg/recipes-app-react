import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PaginationComponent from "../../components/PaginationComponent";
import SearchContext from "../../context/SearchContext";
import useGetRecipes from "../../helpers/hooks/useGetRecipes";

export default function Meals() {
  const { searchBar } = useContext(SearchContext);
  const history = useHistory();
  const MAX_RECIPES = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [recipes] = useGetRecipes();

  const startIndex = (currentPage - 1) * MAX_RECIPES;
  const endIndex = currentPage * MAX_RECIPES;

  useEffect(() => {}, [useGetRecipes]);

  return (
    <div
      className="d-flex flex-column align-items-center
      overflow-hidden justify-content-center "
    >
      <div
        className="d-flex flex-wrap w-100 overflow-auto 
        justify-content-center scroll-custom gap-3"
      >
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
                  const base = history.location.pathname;
                  const id = data.idMeal || data.idDrink;
                  const newPath = base.endsWith(`/${id}`)
                    ? base
                    : `${base}/${id}`;
                  history.push(newPath);
                }
              }}
              role="button"
              tabIndex={0}
              key={data.idMeal || data.idDrink}
              className="col d-flex flex-column align-items-center
                justify-content-center p-1 col-4  rounded col-sm-3 col-md-3 col-lg-2 col-xl-2 col-xxl-2"
              data-testid={`${i}-recipe-card`}
            >
              <div className="card rounded p-0 bg-light w-100">
                <img
                  className="card-img-top"
                  src={data.strMealThumb || data.strDrinkThumb}
                  alt={data.strMeal || data.srtDrink}
                  data-testid={`${i}-card-img`}
                />
                <div className="card-img-overlay d-flex p-0 flex-column justify-content-end">
                  <h4
                    className="card-title text-truncate p-1 m-0 text-light text-center fs-sm-1"
                    data-testid={`${i}-card-name`}
                    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                  >
                    {data.strMeal || data.strDrink}
                  </h4>
                </div>
              </div>
            </div>
          ))}
      </div>
      <PaginationComponent
        recipes={recipes}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}
