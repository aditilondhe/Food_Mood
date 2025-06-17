import React, { useEffect, useState } from "react";
import foodmood from "../../public/foodmood.png";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user } = useAuth();
  const [cart] = useCart();
  const location = useLocation();

  useEffect(() => {
    // Close all <details> elements when the route changes
    const details = document.querySelectorAll("details");
    details.forEach((detail) => detail.removeAttribute("open"));
  }, [location]);

  // Sticky navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <details>
          <summary>Menu</summary>
          <ul className="p-2 bg-white">
            <li>
              <Link to="/menu">All</Link>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2 bg-white">
            <Link to="/cart-page">
              <li>
                <a>Online Order</a>
              </li>
            </Link>
            <Link to="/order">
              <li>
                <a>Order Tracking</a>
              </li>
            </Link>
          </ul>
        </details>
      </li>
    </>
  );

  return (
    <header className="fixed w-full z-50 bg-white transition-all duration-300">
      <div
        className={`navbar max-w-screen-2xl mx-auto px-4 md:px-6 xl:px-24 transition-all duration-300 ${
          isSticky ? "shadow-md" : ""
        }`}
      >
        {/* Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[50] p-2 shadow bg-white rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>
          <Link to="/">
            <img src={foodmood} width={100} alt="logo" />
          </Link>
        </div>

        {/* Center: Main Nav */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">{navItems}</ul>
        </div>

        {/* End: Search, Cart, Login/Profile */}
        <div className="navbar-end space-x-3">
          {/* Search Icon (optional) */}
          <button className="btn btn-ghost btn-circle hidden lg:inline-flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart Icon */}
          <Link to="/cart-page">
            <div className="btn btn-ghost btn-circle relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item absolute top-0 right-0">
                {cart.length || 0}
              </span>
            </div>
          </Link>

          {/* Login/Profile */}
          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-green rounded-full px-4 text-white flex items-center gap-2"
            >
              <FaRegUser /> Login
            </button>
          )}
          <Modal />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
