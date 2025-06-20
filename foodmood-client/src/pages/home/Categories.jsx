import React from "react";

const categoryItems = [
  {
    id: 1,
    title: "Main Course",
    des: "(86 Items)",
    image: "/img1.png",
  },
  {
    id: 2,
    title: "Breakfast",
    des: "(12 Items)",
    image: "/img2.png",
  },
  {
    id: 3,
    title: "Dessert",
    des: "(48 Items)",
    image: "/img3.png",
  },
  {
    id: 4,
    title: "Browse All",
    des: "(255 Items)",
    image: "/img4.png",
  },
];

const Categories = () => {
  return (
    <div className="section-container py-16">
      <div className="text-center">
        <p className="subtitle">Customer Favorites</p>
        <h2 className="title">Popular Categories</h2>
      </div>
      {/* Categories card*/}
      <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-12 ">
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className="shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:-translate-y-4 duration-300 transition-all"
          >
            <div className="flex w-full mx-auto items-center justify-center">
              <img
                src={item.image}
                className="bg-[#C1F1C6] p-5 rounded-full w-28 h-28"
              ></img>
            </div>
            <div className="mt-5 space-y-1">
              <h5>{item.title}</h5>
              <p>{item.des}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
