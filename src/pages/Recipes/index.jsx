import React, { useContext, useEffect } from "react";
import SearchContext from "../../context/SearchContext";

export default function Meals() {
  const { dbData } = useContext(SearchContext);
  return (
    <div
      className="container d-flex flex-column align-items-center overflow-hidden justify-content-center"
      style={{ marginTop: "200px" }}
    >
      <div className="row row-cols-2 overflow-auto justify-content-center gap-3 ">
        {dbData &&
          dbData?.map((data, i) =>
            i < 12 ? (
              <div
                key={data.idMeal || data.idDrink}
                className="col d-flex flex-column align-items-center justify-content-center w-25 border p-0 rounded"
                // style={{ width: "250px", height: "250px" }}
              >
                <div className="container rounded p-0">
                  <img
                    className="img-fluid w-100 rounded-top"
                    src={data.strMealThumb || data.strDrinkThum}
                    alt={data.strMeal || data.srtDrink}
                  />
                </div>
                <div className="container h-25 overflow-x-hidden text-nowrap">
                  <p>{data.strMeal || data.strDrink}</p>
                </div>
              </div>
            ) : null,
          )}
      </div>
    </div>
  );
}
