import React from "react";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    img: "/images/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    img: "/images/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering",
    img: "/images/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with FoodMood Gift Cards",
    img: "/images/services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-16 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <div className="w-full md:w-1/2">
          <div className="text-left md:text-center md:w-4/5 mx-auto">
            <p className="subtitle">Our Story and Services</p>
            <h2 className="title">Our Culinary Journey and Services</h2>
            <p className="my-5 text-secondary leading-relaxed">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <div className="text-left md:text-center">
              <button className="btn bg-green text-white px-8 py-3 rounded-full">
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="w-full md:w-1/2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-md p-5 text-center hover:border-purple-600 transition-all duration-200 border border-transparent"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="mx-auto w-20 h-20"
                />
                <h5 className="pt-3 font-semibold text-green text-lg">
                  {service.title}
                </h5>
                <p className="text-green text-sm">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
