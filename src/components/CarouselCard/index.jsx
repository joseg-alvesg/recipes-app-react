import React from "react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.less";
import "swiper/components/pagination/pagination.less";
import "swiper/components/scrollbar/scrollbar.less";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, A11y, Pagination } from "swiper/core";

import useGetRecipes from "../../helpers/hooks/useGetRecipes";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const MAX_CARDS = 6;

SwiperCore.use([Navigation, Pagination, A11y]);

export default function CarouselCard() {
  const [recipes] = useGetRecipes(undefined, undefined, true);
  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation
      spaceBetween={30}
      slidesPerView={2}
      // onSwiper={(swiper) => console.log(swiper)}
      // onSlideChange={() => console.log("slide change")}
      className="mb-5 me-2 ms-2"
    >
      {recipes.slice(0, MAX_CARDS).map((recommendation, i) => (
        <SwiperSlide
          key={recommendation.idMeal || recommendation.idDrink}
          data-testid={`${i}-recommendation-card`}
          style={{ maxWidth: "300px" }}
        >
          <Link
            to={
              recommendation.idMeal
                ? `/meals/${recommendation.idMeal}`
                : `/drinks/${recommendation.idDrink}`
            }
            className="text-decoration-none text-dark"
          >
            <div className="card">
              <img
                src={
                  recommendation.strMealThumb || recommendation.strDrinkThumb
                }
                alt={recommendation.strMeal || recommendation.strDrink}
              />
            </div>
            <div className="card-body mb-5">
              <h5
                className="card-title"
                data-testid={`${i}-recommendation-title`}
              >
                {recommendation.strMeal || recommendation.strDrink}
              </h5>
              <p className="card-text">
                {recommendation.strCategory || recommendation.strAlcoholic}
              </p>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
