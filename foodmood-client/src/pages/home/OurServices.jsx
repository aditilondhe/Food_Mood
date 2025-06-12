import React from "react";

const serviceLists = [
  {
    id: 1,
    title: "Catering",
    des: "Delight your guests with our flavors and  presentation",
    img: "../../public/images/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast delivery",
    des: "We deliver your order promptly to your door",
    img: "../../public/images/services/icon2.png",
  },
  {
    id: 3,
    title: "Online Ordering",
    des: "Explore menu & order with ease using our Online Ordering n",
    img: "../../public/images/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift Cards",
    des: "Give the gift of exceptional dining with FoodMood Gift Cards",
    img: "../../public/images/services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 ">
        {/* text*/}
        <div className="md:w-1/2">
          <div className="md:text-center text-left md:w-4/5">
            <p className="subtitle"> Our Story and Services</p>
            <h2 className="title"> Our Culinary Journey and Services </h2>
            <p className="my-5 text-secondary leading-[30px] px-6">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality.
            </p>
            <button className="btn bg-green text-white px-8 py-3 rounded-full">
              Explore
            </button>
          </div>
        </div>

        {/*images */}
        <div className="md:w-1/2 pr-6">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 justify-items-center">
            {serviceLists.map((service) => (
              <div
                key={service.id}
                className="shadow-md rounded-sm py-5 px-4 pr-4 text-center space-y-2 text-green cursor-pointer hover:border-purple-600 transition-all duration-200 hover:border"
              >
                <img src={service.img} className="mx-auto w-24 h-24"></img>
                <h5 className="pt-3 font-semibold">{service.title}</h5>
                <p className="text-green">{service.des}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
