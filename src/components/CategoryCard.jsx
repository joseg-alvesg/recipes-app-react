import React from "react";
import { categoriesIcons } from "../images/categories/categories";

export default function CategoryCard({
  strCategory,
  handleSearch,
  dataTestid,
  selected,
}) {
  return (
    <button
      data-testid={dataTestid}
      type="button"
      className={`btn ${selected ? "active" : ""} `}
      onClick={() => handleSearch(strCategory)}
    >
      <img
        src={categoriesIcons[strCategory]}
        // className="img-fuild border rounded-circle p-1 h-100"
        style={{ width: "40px", height: "40px" }}
        alt={strCategory}
      />
      {strCategory}
    </button>
  );
}
