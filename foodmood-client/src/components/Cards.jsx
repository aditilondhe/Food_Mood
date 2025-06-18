import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const handleAddtoCart = (item) => {
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        recipe,
        email: user.email,
      };

      fetch("http://localhost:6001/carts", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then(async (res) => {
          if (res.status === 401) {
            throw new Error("Unauthorized");
          } else if (res.status === 409) {
            throw new Error("AlreadyExists");
          }
          return res.json();
        })
        .then((data) => {
          if (data.insertedId) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "Item added to cart!",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((err) => {
          if (err.message === "Unauthorized") {
            Swal.fire({
              title: "Signup or Login",
              text: "Please create an account or log in to continue.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Sign Up Now",
            }).then((result) => {
              if (result.isConfirmed) {
                navigate("/signup", { state: { from: location } });
              }
            });
          } else if (err.message === "AlreadyExists") {
            Swal.fire({
              icon: "info",
              title: "Already in Cart",
              text: "This item is already in your cart!",
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went wrong while adding to cart.",
            });
            console.error(err);
          }
        });
    } else {
      Swal.fire({
        title: "Signup or Login",
        text: "Please create an account or log in to continue.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign Up Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card shadow-xl relative mr-5 md:my-5">
      <figure>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-[280px] object-cover rounded-t-xl hover:scale-105 transition-all duration-300"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{item.name}</h2>

        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red">$ </span> {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
