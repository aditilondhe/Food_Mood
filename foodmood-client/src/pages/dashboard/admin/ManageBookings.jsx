import React, { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import {
  FaArrowCircleRight,
  FaArrowLeft,
  FaArrowRight,
  FaEdit,
  FaTrashAlt,
  FaUsers,
} from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const ManageBookings = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access_token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://foodmood-low6.onrender.com/payments/all`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  //   console.log(menu)
  const axiosSecure = useAxiosSecure();

  //   pagination
  const [currentPage, setCurrentPage] = useState(1);
  const items_Per_Page = 10;
  const indexOfLastItem = currentPage * items_Per_Page;
  const indexOfFirstItem = indexOfLastItem - items_Per_Page;
  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // confirm order
  const confirmedOrder = async (item) => {
    console.log(item);
    await axiosSecure.patch(`/payments/${item._id}`).then((res) => {
      console.log(res.data);
      Swal.fire({
        icon: "success",
        title: `Order Confirmed!`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    });
  };

  console.log(orders);

  return (
    <div className="w-full md:w-[870px] mx-auto px-4 ">
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green">Bookings</span>
      </h2>

      {/* menu items table  */}
      <div>
        <div className="overflow-x-auto lg:overflow-x-visible">
          <table className="table w-full">
            {/* head */}
            <thead className="text-gray-700">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Transaction Id</th>
                <th>Price</th>
                <th>Status</th>
                <th>Confirm Order</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{indexOfFirstItem + index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.transactionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                  <td className="text-center">
                    {item.status === "confirmed" ? (
                      "done"
                    ) : (
                      <button
                        className="btn bg-green text-white btn-xs text-center"
                        onClick={() => confirmedOrder(item)}
                      >
                        <GiConfirmed />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center my-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-sm mr-2 btn-warning"
        >
          <FaArrowLeft /> Previous
        </button>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastItem >= orders.length}
          className="btn btn-sm bg-green text-white"
        >
          Next <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ManageBookings;
