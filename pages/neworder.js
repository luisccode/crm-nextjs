import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { v4 as uuidv4 } from "uuid";
import axiosClient from "../config/axios";
import Swal from "sweetalert2";

const NewClient = () => {
  const router = useRouter();

  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const seller = JSON.parse(localStorage.getItem("userData"));
    axiosClient.get(`/users?role=client&sellerId=${seller.id}`).then((res) => {
      setClients(res.data);
    });
    axiosClient.get("products").then((res) => {
      setProducts(res.data);
    });
  }, []);
  const formik = useFormik({
    initialValues: {
      client: "",
      productId: "",
      total: "",
      status: "",
    },
    validationSchema: Yup.object({
      total: Yup.string().required("Price is required"),
    }),
    onSubmit: async (valores) => {
      console.log("ejecuta");
      console.log(valores);
      try {
      } catch (error) {
        console.log(error);
        Swal.fire("Oops...", "Something went wrong!", "error");
      }
    },
  });
  if (clients.length === 0) return null;
  return (
    <Layout>
      <h1 className="text-2xl text-gray-800 font-light">New Client</h1>

      <div className="flex justify-center mt-5">
        <div className="w-full max-w-lg">
          <form
            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <select
              className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
              id="client"
              onChange={formik.handleChange}
              value={formik.values.client}
            >
              {clients.map((client) => (
                <option value={client.name}>{client.name}</option>
              ))}
            </select>
            <select
              className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
              id="productId"
              onChange={formik.handleChange}
              value={formik.values.productId}
            >
              {products.map((product) => (
                <option value={product.id}>{product.name}</option>
              ))}
            </select>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="total"
              >
                Total
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="total"
                type="text"
                placeholder="Total"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.total}
              />
            </div>
            {formik.touched.total && formik.errors.total ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.total}</p>
              </div>
            ) : null}

            <div className="mt-2 uppercase tracking-wide text-c2 ">Status:</div>
            <select className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold ">
              <option value="complete">Complete</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
              value="Create Client"
            />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewClient;
