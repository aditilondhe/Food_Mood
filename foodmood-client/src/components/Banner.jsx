import React from "react";
import banner from "../../public/banner.png";
import bfood1 from "../../public/b-food1.png";
import noodles from "../../public/noodles.avif";
import burger from "../../public/burger.jpg";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="max w-sreen-2xl container mx-auto xl:px-24 px:4 bg-gradient-to-r from-[#FAFAFA] from 0% to-[#FCFCFC] to-100%">
      <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
        {/*imgs*/}
        <div className="md:w-1/2">
          <img src={banner}></img>
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img
                src={noodles}
                className="w-20 h-20 object-cover rounded-2xl"
                alt="noodles"
              />

              <div className="space-y-1">
                <h5 className="font-medium mb-1">Noodles</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">$18</p>
              </div>
            </div>
            <div className="sm:flex hidden flex bg-white py-2 px-3 rounded-2xl items-center gap-3 shadow-md w-64">
              <img
                src={burger}
                className="w-20 h-20 object-cover rounded-2xl"
                alt="burger"
              />

              <div className="space-y-1">
                <h5 className="font-medium mb-1">Burger</h5>
                <div className="rating rating-sm">
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-500"
                    checked
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                  <input
                    type="radio"
                    name="rating-6"
                    className="mask mask-star-2 bg-orange-400"
                    readOnly
                  />
                </div>
                <p className="text-red">$20</p>
              </div>
            </div>
          </div>
        </div>

        {/* texts */}
        <div className="md:2-1/2 space-y-7 px-4">
          <h2 className="md:text-6xl text-4xl font-bold md:leading-snug leading snug">
            Savor the Magic of Every
            <span className="text-green"> Meal</span>
          </h2>
          <p className="text-2xl text-[#4A4A4A]">
            Where Every Dish is a Blend of Culinary Mastery and Passionate
            Craftsmanship
          </p>
          <Link to="/menu">
            <button className="bg-green mt-10 px-8 py-3 font-semibold ext-white rounded-full">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
