import React, { useEffect } from "react";
import { mealCategoriesIcons } from "../../images/mealCategories/categories";
import { drinkCategoriesIcons } from "../../images/drinkCategories/categories";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CategoryCard({
  strCategory,
  handleSearch,
  dataTestid,
  selected,
  strAlcoholic,
}) {
  const history = useHistory();

  const selectedStyle = {
    width: "45px",
    height: "45px",
    border: "2px solid #5c0099",
    borderRadius: "50%",
  };
  const notSelectedStyle = {
    width: "45px",
    height: "45px",
    border: "2px solid #fdc500",
    borderRadius: "50%",
  };
  const IconComponent = history.location.pathname.includes("meals")
    ? mealCategoriesIcons[strCategory]
    : drinkCategoriesIcons[strCategory];

  const checkLocation =
    history.location.pathname.includes("drinks/") ||
    history.location.pathname.includes("meals/");
  return (
    <button
      data-testid={dataTestid}
      type="button"
      className={`btn d-flex align-items-center justify-content-center
        ${checkLocation ? "gap-3 fs-4" : "flex-column"}`}
      onClick={() => handleSearch(strCategory)}
    >
      {IconComponent && (
        <div
          className="p-2 "
          style={selected ? selectedStyle : notSelectedStyle}
        >
          <IconComponent
            fill={selected ? `#5c0099` : `#fdc500`}
            alt={strCategory}
            className="w-100 h-100"
          />
        </div>
      )}
      <span className={`${checkLocation ? "mikado-yellow-color" : "fs-6"}`}>
        {strCategory?.split(" ")[0]}
      </span>
    </button>
  );
}
