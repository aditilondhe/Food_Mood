import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user, loading } = useAuth();
  const token = localStorage.getItem("access-token");

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `https://foodmood-low6.onrender.com/payments?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="py-36 flex flex-col items-center justify-center gap-8">
        <div className="space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Track all the <span className="text-green">Orders</span>
          </h2>
        </div>
      </div>

      {orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table text-center">
            <thead className="bg-green text-white rounded-sm">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>TransactionId</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{formatDate(item.createdAt)}</td>
                  <td className="font-medium">{item.transactionId}</td>
                  <td>${item.price}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex justify-center items-center py-10 text-gray-700 text-2xl font-semibold">
          No orders found.
        </div>
      )}
    </div>
  );
};

export default Order;
