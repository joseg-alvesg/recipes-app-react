import React, { useContext, useEffect } from "react";

// eslint-disable-next-line
import { Navigation, A11y } from "swiper/modules";
// eslint-disable-next-line
import { Swiper, SwiperSlide } from "swiper/react";
// eslint-disable-next-line
import SearchContext from "../../context/SearchContext";
// eslint-disable-next-line
import "swiper/css";
// eslint-disable-next-line
import "swiper/css/navigation";
// eslint-disable-next-line
import "swiper/css/pagination";
// eslint-disable-next-line
import "swiper/css/scrollbar";
import useGetRecipes from "../../helpers/hooks/useGetRecipes";

const MAX_CARDS = 6;

export default function CarouselCard() {
  const { recommendations } = useContext(SearchContext);
  const [recipes] = useGetRecipes(undefined, undefined, true);
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
