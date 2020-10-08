import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import axiosClient from "../config/axios";
import Order from "../components/Order";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axiosClient.get("orders").then((res) => {
      setOrders(res.data);
    });
  }, []);
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">Orders</h1>
      <Link href="/neworder">
        <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
          New Order
        </a>
      </Link>
      <div className="flex flex-wrap justify-around mt-4">
        {orders.map((order) => (
          <Order key={order.id} data={order} />
        ))}
      </div>
    </Layout>
  );
}
