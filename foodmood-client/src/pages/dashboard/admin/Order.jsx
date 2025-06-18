import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const Order = () => {
  const { user, loading } = useAuth();
  console.log(user?.email);
  const token = localStorage.getItem("access-token");
  console.log("Frontend token:", token);
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:6001/payments?email=${user?.email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  console.log(orders);
  // date format
  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString();
  };

  return (
    <div className="max w-sreen-2xl container mx-auto xl:px-24 px:4 bg-gradient-to-r from-[#FAFAFA] from 0% to-[#FCFCFC] to-100%">
      <div className="py-36 flex flex-col items-center justify-center gap-8">
        {/* texts */}
        <div className=" space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading snug">
            Track all the
            <span className="text-green"> Orders</span>
          </h2>
        </div>
      </div>

      {/* table content */}
      <div>
        {
          <div>
            <div>
              <div className="overflow-x-auto">
                <table className="table text-center">
                  {/* head */}
                  <thead className="bg-green text-white rounded-sm">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>TransactionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
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
                        <td>
                          <button className="btn btn-sm border-none text-orange-400 bg-transparent">
                            Contact
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <hr />
          </div>
        }
      </div>
    </div>
  );
};

export default Order;
