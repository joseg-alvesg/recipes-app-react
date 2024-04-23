import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import profileIcon from "../../images/profileIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import mealIcon from "../../images/mealIcon.svg";
import drinkIcon from "../../images/drinkIcon.svg";
import SearchBar from "../SearchBar";
import CategoryBar from "../CategoryBar";

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
      <div className="d-flex justify-content-between w-100 ps-5 pe-5 bg-dark">
        <button className="btn" onClick={() => history.push("/meals")}>
          <img
            src="cooking.png"
            alt="Logo"
            style={{ width: "50px" }}
            className="me-2"
          />
          <span className="fs-5 fw-bold">Recipes</span> App
        </button>
        <div>
          {history.location.pathname.includes("profile") ||
          history.location.pathname.includes("done-recipes") ||
          history.location.pathname.includes("favorite-recipes") ? null : (
            <button
              type="button"
              className="btn"
              onClick={handleInteractionSearch}
            >
              <img
                data-testid="search-top-btn"
                src={searchIcon}
                alt="Search Icon"
              />
            </button>
          )}
          <button
            type="button"
            className="btn"
            onClick={() => history.push("/profile")}
          >
            <img
              data-testid="profile-top-btn"
              src={profileIcon}
              alt="Profile Icon"
            />
          </button>
        </div>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center pt-1">
        <img
          src={title === "Meals" ? mealIcon : drinkIcon}
          alt="Title logo"
          className="w-50"
          data-testid="page-icon"
        />
        <h1 className="fs-3 fw-bold m-0 p-0" data-testid="page-title">
          {title}
        </h1>
      </div>
      <div>{searchBar && <SearchBar title={title} />}</div>
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
