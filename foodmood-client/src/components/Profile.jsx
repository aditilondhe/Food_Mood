import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { Link } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const handleLogout = () => {
    logOut()
      .then(() => {
        //sign out successful
      })
      .catch((error) => {
        //an error happened.
      });
  };

  return (
    <div>
      <div className="drawer drawer-end z-50">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn-ghost avatar "
          >
            <div className="w-10 rounded-full">
              {user.photoURL ? (
                <img alt="Tailwind CSS Navbar component" src={user.photoURL} />
              ) : (
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              )}
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-white text-gray-700  min-h-full w-80 p-4">
            {/* Sidebar content here */}
            <li>
              <a href="/update-profile ">Profile</a>
            </li>
            <li>
              <Link to="/order">Orders</Link>
            </li>

            <li>
              <a>Setting</a>
            </li>

            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            {/* {!isAdminLoading && isAdmin && (
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )} */}
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
