import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import drinkIcon from "../../images/drinkIcon.svg";
import mealIcon from "../../images/mealIcon.svg";

export default function Footer() {
  const history = useHistory();
  return (
    <footer
      data-testid="footer"
      className="w-100 align-self-end d-flex justify-content-between pe-5 ps-5 align-items-center"
    >
      <img
        src={mealIcon}
        data-testid="meals-bottom-btn"
        className="btn"
        alt="meal-icon"
        onClick={() => history.push("/meals")}
      />
      <img
        src={drinkIcon}
        data-testid="drinks-bottom-btn"
        className="btn"
        alt="drink-icon"
        onClick={() => history.push("/drinks")}
      />
    </footer>
  );
}
