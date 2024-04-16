import React, { useContext } from "react";
import SearchContext from "../../context/SearchContext";
import { fetchMealRecipes } from "../../util/FetchFunctions";

export default function SearchBar() {
  const { searchText, setSearchText, filterType, setFilterType, setMealData } =
    useContext(SearchContext);

  const handleSearch = async () => {
    if (!searchText) return;
    const res = await fetchMealRecipes(filterType, searchText);
    setMealData(res);
  };

  const handleChange = (e) => {
    if (e.target.type === "radio") setFilterType(e.target.value);
    if (e.target.type === "text") setSearchText(e.target.value);
  };
  return (
    <form className="">
      <input
        type="text"
        className="form-control"
        data-testid="search-input"
        onChange={(e) => handleChange(e)}
      />
      <label className="form-label">
        <input
          type="radio"
          name="ingredient"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={(e) => handleChange(e)}
          checked={filterType === "ingredient"}
        />
        ingredient
      </label>

      <label className="form-label">
        <input
          type="radio"
          name="name"
          value="name"
          data-testid="name-search-radio"
          onChange={(e) => handleChange(e)}
          checked={filterType === "name"}
        />
        name
      </label>
      <label className="form-label">
        <input
          type="radio"
          name="first-letter"
          value="first-letter"
          data-testid="first-letter-search-radio"
          onChange={(e) => handleChange(e)}
          checked={filterType === "first-letter"}
        />
        first letter
      </label>
      <button
        type="button"
        className="btn"
        data-testid="exec-search-btn"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </form>
  );
}
