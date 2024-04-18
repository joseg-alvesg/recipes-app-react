import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="d-flex justify-content-center align-items-center fixed-bottom"
    >
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          className="btn"
          alt="meal-icon"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          className="btn"
          alt="drink-icon"
        />
      </button>
    </footer>
  );
}
