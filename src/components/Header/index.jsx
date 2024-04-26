import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';
import { ReactComponent as Logo } from '../../images/recipesLogo.svg';
import { ReactComponent as SearchIcon } from '../../images/searchIcon.svg';
import { ReactComponent as ProfileIcon } from '../../images/profileIcon.svg';

export default function Header() {
  const { setSearchBar } = useContext(SearchContext);

  const history = useHistory();

  const handleInteractionSearch = () => {
    setSearchBar((prev) => !prev);
  };

  const checkRoutes = history.location.pathname.includes('profile')
    || history.location.pathname.includes('done-recipes')
    || history.location.pathname.includes('favorite-recipes');
  return (
    <div
      className="d-flex justify-content-between align-items-center w-100 ps-5 pe-5
        mikado-yellow-bg"
      style={ { position: 'sticky', top: 0, zIndex: 1000 } }
    >
      <button
        className="btn justify-content-center align-items-center d-flex"
        onClick={ () => history.push('/meals') }
      >
        <Logo style={ { width: '50px' } } className="me-2" />
        <span className="fs-4 texto indigo-light-color">Recipes</span>
        {' '}
        <span className="fw-bold indigo-dark-color">app</span>
      </button>
      <div className="d-flex align-items-center">
        {!checkRoutes && (
          <SearchIcon
            data-testid="search-top-btn"
            alt="Search Icon"
            onClick={ handleInteractionSearch }
            className="point w-30-p h-30-p"
            fill="#5c0099"
          />
        )}
        <ProfileIcon
          data-testid="profile-top-btn"
          alt="Profile Icon"
          onClick={ () => history.push('/profile') }
          className="ms-3 point w-30-p h-30-p"
          fill="#5c0099"
        />
      </div>
    </div>
  );
}
