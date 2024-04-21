import React from "react";

import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.less";
import "swiper/components/pagination/pagination.less";
import "swiper/components/scrollbar/scrollbar.less";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, A11y, Pagination } from "swiper/core";

import useGetRecipes from "../../helpers/hooks/useGetRecipes";

const MAX_CARDS = 6;

SwiperCore.use([Navigation, Pagination, A11y]);

export default function CarouselCard() {
  const [recipes] = useGetRecipes(undefined, undefined, true);
  return (
    <Swiper
      pagination={{ clickable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={2}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {recipes.slice(0, MAX_CARDS).map((recommendation, i) => (
        <SwiperSlide
          key={recommendation.idMeal || recommendation.idDrink}
          data-testid={`${i}-recommendation-card`}
        >
          <div className="card">
            <img
              src={recommendation.strMealThumb || recommendation.strDrinkThumb}
              alt={recommendation.strMeal || recommendation.strDrink}
            />
          </div>
          <div className="card-body">
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
