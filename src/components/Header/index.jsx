import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import { ReactComponent as MealIcon } from "../../images/mealIcon.svg";
import { ReactComponent as DrinkIcon } from "../../images/drinkIcon.svg";
import SearchBar from "../SearchBar";
import CategoryBar from "../CategoryBar";
import { ReactComponent as Logo } from "../../images/recipesLogo.svg";
import { ReactComponent as SearchIcon } from "../../images/searchIcon.svg";
import { ReactComponent as ProfileIcon } from "../../images/profileIcon.svg";

export default function Header({ title }) {
  const { searchBar, setSearchBar } = useContext(SearchContext);

  const history = useHistory();

  const handleInteractionSearch = () => {
    setSearchBar((prev) => !prev);
  };

  return (
    <div
      className="w-100 d-flex
      flex-column align-items-center justify-content-center"
    >
      <div
        className="d-flex justify-content-between align-items-center 
        w-100 ps-5 pe-5 mikado-yellow-bg "
      >
        <button
          className="btn justify-content-center align-items-center d-flex"
          onClick={() => history.push("/meals")}
        >
          <Logo style={{ width: "50px" }} className="me-2" />
          <span className="fs-4 texto indigo-light-color">Recipes</span>{" "}
          <span className="fw-bold indigo-dark-color">app</span>
        </button>
        <div className="d-flex align-items-center">
          {history.location.pathname.includes("profile") ||
          history.location.pathname.includes("done-recipes") ||
          history.location.pathname.includes("favorite-recipes") ? null : (
            <SearchIcon
              data-testid="search-top-btn"
              alt="Search Icon"
              onClick={handleInteractionSearch}
              className="point w-30-p h-30-p"
              fill="#5c0099"
            />
          )}
          <ProfileIcon
            data-testid="profile-top-btn"
            alt="Profile Icon"
            onClick={() => history.push("/profile")}
            className="ms-3 point w-30-p h-30-p"
            fill="#5c0099"
          />
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center pt-1">
        {title === "Meals" ? (
          <MealIcon
            alt="Title logo"
            className="w-30-p h-30-p mt-3"
            fill="#fdc500"
            data-testid="page-icon"
          />
        ) : (
          <DrinkIcon
            className="w-30-p h-30-p mt-3"
            fill="#fdc500"
            data-testid="page-icon"
          />
        )}
        <h1
          className="fs-3 fw-bold m-0 p-0 indigo-dark-color"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
      <div className="w-100 d-flex justify-content-center">
        {searchBar && <SearchBar title={title} />}
      </div>
      {history.location.pathname.includes("profile") ||
      history.location.pathname.includes("done-recipes") ||
      history.location.pathname.includes("favorite-recipes") ? null : (
        <CategoryBar />
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
