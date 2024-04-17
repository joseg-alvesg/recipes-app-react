import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import { fetchRecipes } from "../../util/FetchFunctions";

export default function Meals() {
  const { dbData, searchBar, setDbData } = useContext(SearchContext);
  const history = useHistory();

  useEffect(() => {
    fetchStartPage();
  }, []);

  const fetchStartPage = async () => {
    const db =
      history.location.pathname === "/meals" ? "themealdb" : "thecocktaildb";
    const res = await fetchRecipes(db, "name", "");
    setDbData(res.meals || res.drinks);
  };

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
        {dbData &&
          dbData?.slice(0, 12).map((data, i) => (
            <div
              onClick={() =>
                history.push(
                  `${history.location.pathname}/${data.idMeal || data.idDrink}`,
                )
              }
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
      </div>
    </div>
  );
}
