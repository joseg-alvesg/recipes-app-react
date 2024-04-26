import PropTypes, { arrayOf } from "prop-types";
import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CarouselCard from "../CarouselCard";
import CategoryCard from "../CategoryCard";
import FavoriteButton from "../FavoriteButton";
import ShareButton from "../ShareButton";

export default function DetailsCard({
  recipeDetails = {},
  ingredients,
  id,
  doneRecipe = false,
  progress = false,
  toggleIngredient = undefined,
  checkedIngredients = {},
  isFinished = false,
  finishRecipe = undefined,
}) {
  const history = useHistory();
  const checkInProgressRoute =
    history.location.pathname.includes("in-progress");
  useEffect(() => {}, [checkedIngredients]);
  return (
    <div className="d-flex w-100 align-items-center justify-content-center ">
      {recipeDetails && (
        <div
          className="w-100 d-flex flex-column justify-content-center
          align-items-center"
        >
          <div
            className="card d-flex w-100 align-items-center"
            style={{ maxWidth: "640px" }}
          >
            <img
              data-testid="recipe-photo"
              src={recipeDetails.strMealThumb || recipeDetails.strDrinkThumb}
              alt={recipeDetails.strMeal || recipeDetails.strDrink}
              className="card-img w-100"
            />
            <div
              className="card-img-overlay d-flex w-100 p-3 h-100 align-items-start"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
            >
              <CategoryCard
                strCategory={recipeDetails.strCategory}
                strAlcoholic={recipeDetails.strAlcoholic}
                dataTestid="recipe-category"
                className="d-flex flex-wrap"
              />
            </div>
            <div
              className="card-img-overlay align-self-center w-100 d-flex
            justify-content-center"
            >
              <h1 data-testid="recipe-title" className="mikado-yellow-color">
                {recipeDetails.strMeal || recipeDetails.strDrink}
              </h1>
            </div>
            <div className="card-img-overlay d-flex w-100 justify-content-end">
              <ShareButton dataTestid="share-btn" />
              <FavoriteButton id={id} recipeDetails={recipeDetails} />
            </div>
          </div>
          <div className="container mt-3">
            <p className="fs-5 fw-bold">Ingredients</p>
            <ul className="list-group border p-3 mt-2">
              {ingredients &&
                ingredients.map((ingredient, index) =>
                  checkInProgressRoute ? (
                    <li
                      key={index}
                      data-testid={`${index}-ingredient-step`}
                      className="list-group-item border-0"
                    >
                      <button
                        className="btn border-0"
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        <input
                          type="checkbox"
                          key={index}
                          data-testid={`${index}-ingredient-step`}
                          checked={checkedIngredients[ingredient] || false}
                          onChange={() => {}}
                        />
                        <label
                          className={
                            checkedIngredients[ingredient]
                              ? "text-decoration-line-through text-muted ms-2"
                              : "ms-2"
                          }
                        >
                          {ingredient}
                        </label>
                      </button>
                    </li>
                  ) : (
                    <li
                      key={index}
                      data-testid={`${index}-ingredient-name-and-measure`}
                      className="list-group-item border-0"
                    >
                      {ingredient}
                    </li>
                  ),
                )}
            </ul>
          </div>
          <div className="container mt-3 w-100">
            <p className="fs-5 fw-bold">Instructions</p>
            <div className="border rounded p-3 mt-2">
              <p data-testid="instructions" className="text-justify fs-5">
                {recipeDetails.strInstructions}
              </p>
            </div>
            {recipeDetails.strYoutube && (
              <div className="w-100 ratio ratio-16x9 mt-3">
                <iframe
                  className="rounded"
                  data-testid="video"
                  src={recipeDetails.strYoutube}
                  allow="accelerometer; clipboard-write;
              encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Embedded youtube"
                />
              </div>
            )}
            {checkInProgressRoute && (
              <button
                data-testid="finish-recipe-btn"
                disabled={!isFinished}
                onClick={finishRecipe}
                className={`mikado-yellow-bg w-100 rounded-3 text-dark mt-5
                p-2 fs-5 border-0
                fw-bold ${!isFinished ? "disable" : "point"}`}
              >
                Finalizar Receita
              </button>
            )}
          </div>
          <div className="container w-100 mt-5">
            <p className="fs-5 fw-bold">Drink recomendations</p>
            {!checkInProgressRoute && <CarouselCard />}
          </div>
          {!checkInProgressRoute && !doneRecipe && (
            <Link
              data-testid="start-recipe-btn"
              className="position-fixed bottom-0 m-3 mikado-yellow-bg w-50 rounded-3
              text-center p-2 fs-5 text-decoration-none text-dark"
              style={{ zIndex: 100 }}
              to={`${history.location.pathname}/in-progress`}
            >
              {progress ? "Continue Recipe" : "start recipe"}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

DetailsCard.propTypes = {
  id: PropTypes.string.isRequired,
  recipeDetails: PropTypes.shape({
    strArea: PropTypes.string,
    strCategory: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  doneRecipe: PropTypes.bool,
  progress: PropTypes.bool,
  toggleIngredient: PropTypes.func,
  checkedIngredients: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isFinished: PropTypes.bool,
  finishRecipe: PropTypes.func,
};
