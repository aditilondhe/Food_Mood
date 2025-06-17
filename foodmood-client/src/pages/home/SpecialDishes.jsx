import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("http://localhost:6001/menu")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []); // ⬅️ Added missing dependency array to avoid multiple fetches

  // Slick slider settings for responsiveness
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1280, // xl
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024, // lg
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
      {
        breakpoint: 640, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="section-container my-20 px-4 sm:px-6 lg:px-10">
      <div className="text-left mb-8">
        <p className="subtitle">Special Dishes</p>
        <h2 className="title max-w-l">Standout Dishes From Our Menu</h2>
      </div>
      <Slider {...settings}>
        {recipes.map((item, i) => (
          <div key={i} className="px-2">
            <Cards item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
