import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container px-4 sm:px-6 lg:px-10 my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Image section */}
        <div className="md:w-1/2 w-full">
          <img
            src="../../public/images/testimonials/chef.png"
            alt="Testimonials"
            className="w-full max-h-[500px] object-contain mx-auto"
          />
        </div>

        {/* Text section */}
        <div className="md:w-1/2 w-full">
          <div className="text-left md:w-4/5 w-full">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at FoodMood last night, and I'm
              still raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>

            {/* Avatar + rating */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 rounded-full cursor-pointer">
                    <img
                      src="../../public/images/testimonials/testimonial1.png"
                      alt="Customer 1"
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 rounded-full cursor-pointer">
                    <img
                      src="../../public/images/testimonials/testimonial2.png"
                      alt="Customer 2"
                    />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 rounded-full cursor-pointer">
                    <img
                      src="../../public/images/testimonials/testimonial3.png"
                      alt="Customer 3"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2 text-sm sm:text-base">
                  <FaStar className="text-yellow-400" />
                  <span className="font-medium">4.9</span>
                  <span className="text-gray-500">(18.6k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
