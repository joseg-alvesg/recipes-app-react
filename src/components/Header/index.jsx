import React, { useContext } from "react";
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
    <div className="position-fixed top-0 w-100 d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex align-items-center">
        <img src="cooking.png" alt="Logo" style={{ width: "50px" }} />
        <button type="button" className="btn">
          <img
            src={searchIcon}
            alt="Search Icon"
            data-testid="search-top-btn"
            onClick={handleInteractionSearch}
          />
        </button>
        <button type="button" className="btn">
          <img
            src={profileIcon}
            alt="Profile Icon"
            data-testid="profile-top-btn"
            onClick={() => history.push("/profile")}
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
      <div>{<CategoryBar />}</div>
    </div>
  );
}
