import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SearchContext from '../../context/SearchContext';
import { ReactComponent as MealIcon } from '../../images/mealIcon.svg';
import { ReactComponent as DrinkIcon } from '../../images/drinkIcon.svg';
import { ReactComponent as BlackHeartIcon } from '../../images/blackHeartIcon.svg';
import { ReactComponent as DoneIcon } from '../../images/doneIcon.svg';
import { ReactComponent as ProfileIcon } from '../../images/profileIcon.svg';
import SearchBar from '../SearchBar';
import CategoryBar from '../CategoryBar';

const IconList = {
  Meals: MealIcon,
  Drinks: DrinkIcon,
  'Favorite Recipes': BlackHeartIcon,
  'Done Recipes': DoneIcon,
  Profile: ProfileIcon,
};

export default function SecondHeader({ title }) {
  const { searchBar } = useContext(SearchContext);
  const history = useHistory();
  const checkRoutes = history.location.pathname.includes('profile')
    || history.location.pathname.includes('done-recipes')
    || history.location.pathname.includes('favorite-recipes');

  const IconComponent = IconList[title];
  return (
    <div
      className="w-100 d-flex
      flex-column align-items-center justify-content-center"
    >
      <div className="d-flex flex-column align-items-center justify-content-center pt-1">
        {IconComponent && (
          <IconComponent
            alt="Title logo"
            className="w-30-p h-30-p mt-3"
            style={ title === 'Profile' ? { width: '50px', height: '50px' } : {} }
            fill="#fdc500"
            data-testid="page-icon"
          />
        )}
        <h1
          className="fs-3 fw-bold m-0 p-0 indigo-dark-color p-2"
          data-testid="page-title"
        >
          {title}
        </h1>
      </div>
      {searchBar && (
        <div className="w-100 d-flex justify-content-center">
          <SearchBar title={ title } />
        </div>
      )}
      {!checkRoutes && <CategoryBar />}
    </div>
  );
}

SecondHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
