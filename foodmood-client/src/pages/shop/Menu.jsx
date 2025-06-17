import React, { useEffect, useState, useRef } from "react";
import Cards from "../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const menuSectionRef = useRef(null);
  const [filteredItems, setfilteredItems] = useState([]);
  const [selectedCategory, setselectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  //loading data
  useEffect(() => {
    //fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:6001/menu");
        const data = await response.json();
        // console.log(data);

        setMenu(data);
        setfilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    //call the function
    fetchData();
  }, []);

  //filtering data
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((items) => items.category === category);

    setfilteredItems(filtered);
    setselectedCategory(category);
    setCurrentPage(1);
  };

  //show all data functions
  const showAll = () => {
    setfilteredItems(menu);
    selectedCategory("all");
    setCurrentPage(1);
  };

  //sorting based on A-Z,Z-A,Low-High pricing
  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];

    //logic
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setfilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexofLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexofLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexofFirstItem, indexofLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {/*  menu*/}
      <div className="max-w-sreen-2xl container mx-auto xl:px-24 px:4 bg-gradient-to-r from-[#FAFAFA] from 0% to-[#FCFCFC] to-100%">
        <div className="py-48 flex flex-col  justify-center items-center gap-6">
          {/* texts */}
          <div className="text-center space-y-4 px-4 ">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading snug">
              For the Love of Delicious
              <span className="text-green"> Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md-w:4/5 mx-auto ">
              Come with family & feel the joy of mouthwatering food such as
              Paneer Tikka, Butter Chicken, Hyderabadi Biryani, Masala Dosa,
              Chole Bhature, and more — all at a moderate cost.
            </p>
          </div>
          <div className="flex justify-center mt-6 ">
            <button
              className="bg-green px-8 py-3 font-semibold rounded-full"
              onClick={() =>
                menuSectionRef.current?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Order Now
            </button>
          </div>
        </div>
      </div>

      {/* menu shop section(multiline comment added using shift+alt+a) */}
      <div ref={menuSectionRef} className="section-container mx-5">
        {/* filtering and sorting */}
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">
          {/*all category btns */}
          <div className="px-4 flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>

          {/* sorting based on filtering */}

          <div className="flex justify-end mb-4 rounded-sm mx-5">
            <div className="bg-black pd-2">
              <FaFilter className="h-4 w-4  text-green" />
            </div>

            {/* sorting options */}
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-grey text-white px-2 py-1 rounded-sm"
            >
              <option value="default">Default</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
              <option value="low-to-high">Low-High</option>
              <option value="high-to-low">High-Low</option>
            </select>
          </div>
        </div>
        {/* products card */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 card bg-base-90 flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8 px-4">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination section*/}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 rounded-full ${
              currentPage === index + 1 ? "bg-green text-white" : "bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
