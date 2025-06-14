import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import {
  FaEdit,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaShoppingBag,
  FaShoppingCart,
  FaUser,
} from "react-icons/fa";
import logo from "/foodmood.png";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";

const sharedLinks = (
  <>
    <li>
      {" "}
      <Link to="/">
        {" "}
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
      {" "}
      <Link to="/menu">
        {" "}
        <FaShoppingCart />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        {" "}
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      {" "}
      <Link to="/menu">
        {" "}
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  return (
    <div>
      {isAdmin ? (
        <div className="drawer sm:drawer-open bg-white">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
            {/* Page content here */}
            <div className="flex items-center justify-between mx-4 ">
              <label
                htmlFor="my-drawer-2"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <MdDashboard />
              </label>
              <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden">
                Logout
              </button>
            </div>
            <div className="mt-5 md:mt-2 mx-4">
              <Outlet />
            </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu  bg-[#f4f4f0] text-base-content min-h-full w-80 p-4">
              {/* Sidebar content here */}
              <li>
                <Link to="/dashboard" className="flex justify-start mb-3">
                  <img src={logo} alt="logo" className="w-20" />
                  <span className="badge badge-primary">Admin</span>
                </Link>
              </li>
              <hr />
              <li className="mt-3">
                <Link to="/dashboard">
                  {" "}
                  <MdDashboard />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/dashboard">
                  {" "}
                  <FaShoppingBag />
                  Manage Bookings
                </Link>
              </li>
              <li>
                <Link to="/dashboard/add-menu">
                  {" "}
                  <FaPlusCircle />
                  Add Menu
                </Link>
              </li>
              <li>
                <Link to="/dashboard/manage-items">
                  {" "}
                  <FaEdit />
                  Manage Items
                </Link>
              </li>

              <li className="mb-3">
                <Link to="/dashboard/users">
                  {" "}
                  <FaUser />
                  All Users
                </Link>
              </li>
              <hr />

              {/* shared nav links */}
              {sharedLinks}
            </ul>
          </div>
        </div>
      ) : loading ? (
        <Login />
      ) : (
        <div className="h-screen flex bg-white justify-center items-center">
          <Link to="/">
            <button className="btn  bg-green text-white">Back to Home</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
