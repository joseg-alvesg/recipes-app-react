import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import profileIcon from "../../images/profileIcon.svg";
import searchIcon from "../../images/searchIcon.svg";
import mealIcon from "../../images/mealIcon.svg";
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
      className="position-fixed top-0 w-100 d-flex
      flex-column align-items-center justify-content-center"
    >
      <div className="d-flex align-items-center">
        <img src="cooking.png" alt="Logo" style={{ width: "50px" }} />
        {window.location.pathname.includes("profile") ||
        window.location.pathname.includes("done-recipes") ||
        window.location.pathname.includes("favorite-recipes") ? null : (
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
      <div className="d-flex flex-column align-items-center justify-content-center">
        <img src={mealIcon} alt="Logo" className="w-25" />
        <h1 className="ms-5 fs-4 fw-bold m-0 p-0" data-testid="page-title">
          {title}
        </h1>
      </div>
      <div>{searchBar && <SearchBar title={title} />}</div>
      {window.location.pathname.includes("profile") ||
      window.location.pathname.includes("done-recipes") ||
      window.location.pathname.includes("favorite-recipes") ? null : (
        <CategoryBar />
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
