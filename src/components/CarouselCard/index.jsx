import React, { useContext, useEffect } from "react";
import SearchContext from "../../context/SearchContext";

import { Navigation, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function CarouselCard() {
  const { recommendations } = useContext(SearchContext);
  useEffect(() => {
    console.log(recommendations);
  }, [recommendations]);
  return (
    <Swiper
      modules={[Navigation, A11y]}
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      navigation
      spaceBetween={50}
      slidesPerView={2}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {recommendations.slice(0, 6).map((recommendation, i) => (
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
