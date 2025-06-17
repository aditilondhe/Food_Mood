import React from "react";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setcartItems] = useState([]);

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };
  //handle increase function
  const handleIncrease = (item) => {
    // console.log(item._id);
    fetch(`http://localhost:6001/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id == item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setcartItems(updatedCart);
      });

    refetch();
  };

  //handle decrease function
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      fetch(`http://localhost:6001/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id == item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setcartItems(updatedCart);
        });

      refetch();
    } else {
      alert("Items cannot be zero!");
    }
  };

  //calculate total price
  const cartSubtotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubtotal;
  //handle delete
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:6001/carts/${item._id}`, { method: "DELETE" })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Item deleted successfully",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className="section-container">
      {/* Banner */}
      <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
        <div className="max-w-screen-xl container mx-auto px-4 md:px-10">
          <div className="py-16 md:py-24 flex flex-col items-center justify-center gap-6 text-center">
            <h2 className="md:text-5xl text-3xl font-bold leading-snug">
              Items Added to the <span className="text-green">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/* Cart Table & Details */}
      {cart.length > 0 ? (
        <div className="px-4 md:px-10 py-8">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-green text-white rounded-sm">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt={item.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <div className="flex items-center">
                        <button
                          className="btn btn-xs bg-gray-200"
                          onClick={() => handleDecrease(item)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          readOnly
                          className="w-10 mx-2 text-center bg-inherit border-none"
                        />
                        <button
                          className="btn btn-xs bg-gray-200"
                          onClick={() => handleIncrease(item)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${calculatePrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn btn-ghost text-red btn-xs"
                        onClick={() => handleDelete(item)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Customer and Shopping Details */}
          <div className="mt-10 flex flex-col md:flex-row gap-10">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium text-xl">Customer Details</h3>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>Order ID: {user.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium text-xl">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total Price: ${orderTotal.toFixed(2)}</p>
              <Link to="/process-checkout">
                <button className="btn bg-green text-white mt-5">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 px-4">
          <p className="text-xl md:text-2xl font-semibold">Cart is Empty!</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-5">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
