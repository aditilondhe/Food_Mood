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

const DashboardLayout = () => {
  const { loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  // Handles drawer close on mobile
  const handleCloseDrawer = () => {
    const drawerCheckbox = document.getElementById("my-drawer-2");
    if (drawerCheckbox) drawerCheckbox.checked = false;
  };

  const sharedLinks = (
    <>
      <li>
        <Link to="/" onClick={handleCloseDrawer}>
          <MdDashboard />
          Home
        </Link>
      </li>
      <li>
        <Link to="/menu" onClick={handleCloseDrawer}>
          <FaShoppingCart />
          Menu
        </Link>
      </li>
    </>
  );

  if (loading || isAdminLoading) {
    return (
      <div className="h-screen flex bg-white justify-center items-center">
        <span className="loading loading-spinner loading-lg text-green"></span>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex bg-white justify-center items-center">
        <Link to="/">
          <button className="btn bg-green text-white">Back to Home</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open bg-white min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col px-4 py-2">
        {/* Top bar on mobile */}
        <div className="flex items-center justify-between lg:hidden mb-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button"
          >
            <MdDashboard className="text-xl" />
          </label>
          <button className="btn bg-green text-white rounded-full px-4">
            Logout
          </button>
        </div>

        {/* Main content */}
        <div className="overflow-y-auto">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu bg-[#f4f4f0]  w-80 min-h-full p-4 space-y-1">
          <li className="flex flex-col items-start mb-4">
            <Link to="/dashboard" onClick={handleCloseDrawer}>
              <img src={logo} alt="Logo" className="w-20 mb-2" />
              <span className="badge badge-primary">Admin</span>
            </Link>
          </li>

          <hr />
          <li>
            <Link to="/dashboard" onClick={handleCloseDrawer}>
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-bookings" onClick={handleCloseDrawer}>
              <FaShoppingBag />
              Manage Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-menu" onClick={handleCloseDrawer}>
              <FaPlusCircle />
              Add Menu
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-items" onClick={handleCloseDrawer}>
              <FaEdit />
              Manage Items
            </Link>
          </li>
          <li>
            <Link to="/dashboard/users" onClick={handleCloseDrawer}>
              <FaUser />
              All Users
            </Link>
          </li>
          <hr />
          {sharedLinks}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
