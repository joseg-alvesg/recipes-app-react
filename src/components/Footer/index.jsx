import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ReactComponent as MealIcon } from '../../images/mealIcon.svg';
import { ReactComponent as DrinkIcon } from '../../images/drinkIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="w-100 align-self-end d-flex justify-content-between pe-5 ps-5
      align-items-center indigo-dark-bg sticky-bottom"
      style={ { minHeight: '45px' } }
    >
      <MealIcon
        data-testid="meals-bottom-btn"
        className="point w-30-p h-30-p"
        fill="#fdc500"
        alt="meal-icon"
        onClick={ () => history.push('/meals') }
      />
      <DrinkIcon
        data-testid="drinks-bottom-btn"
        className="point w-30-p h-30-p"
        fill="#fdc500"
        alt="drink-icon"
        onClick={ () => history.push('/drinks') }
      />
    </footer>
  );
}
