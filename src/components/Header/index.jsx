import React, { useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchContext from "../../context/SearchContext";
import profileIcon from "../../images/profileIcon.svg";
import searchIcon from "../../images/searchIcon.svg";

export default function Header({ title }) {
  const { searchBar, setSearchBar } = useContext(SearchContext);

  const history = useHistory();

  const handleInteractionSearch = () => {
    setSearchBar((prev) => !prev);
  };

  return (
    <div className="fixed-top w-100 d-flex justify-content-between align-items-center">
      <h1 className="ms-5 fs-4 fw-bold m-0 p-0" data-testid="page-title">
        {title}
      </h1>
      <div className="me-5 d-flex">
        <div className="d-flex" id="search-box">
          {searchBar && (
            <input
              type="text"
              className="form-control"
              data-testid="search-input"
              id="search-input"
            />
          )}
          <button type="button" className="btn">
            <img
              src={searchIcon}
              alt="Search Icon"
              data-testid="search-top-btn"
              onClick={handleInteractionSearch}
            />
          </button>
        </div>
        <button type="button" className="btn">
          <img
            src={profileIcon}
            alt="Profile Icon"
            data-testid="profile-top-btn"
            onClick={() => history.push("/profile")}
          />
        </button>
      </div>
    </div>
  );
}
