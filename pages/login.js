import React, { useState } from "react";
import Layout from "../components/Layout";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosClient from "../config/axios";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [message, setMessage] = useState({
    status: false,
    msg: "",
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (data) => {
      const users = await axiosClient.get("users");

      // validacion simple para ver si los datos son correctos
      const user = users.data.filter(
        (user) => user.email === data.email && user.password === data.password
      );

      if (user.length !== 0) {
        localStorage.setItem("isAuth", "true");
        const userAuth = {
          emai: user[0].email,
          name: user[0].name,
          id: user[0].id,
        };
        localStorage.setItem("userData", JSON.stringify(userAuth));
        console.log("correcto");
        router.push("/");
      } else {
        //hay algun dato incorrecto
        setMessage({
          status: true,
          msg: "password or email incorrect",
        });
        localStorage.setItem("isAuth", "false");
        setTimeout(() => {
          setMessage({
            status: false,
            msg: "",
          });
        }, 3000);
      }
    },
  });
  return (
    <Layout>
      <h1 className="text-center text-2xl text-white font-light">Login</h1>
      {message.status && (
        <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
          <p>{message.msg}</p>
        </div>
      )}
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-sm">
          <form
            className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
            onSubmit={formik.handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email Usuario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            {formik.touched.email && formik.errors.email ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.email}</p>
              </div>
            ) : null}

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>

              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password Usuario"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>

            {formik.touched.password && formik.errors.password ? (
              <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                <p className="font-bold">Error</p>
                <p>{formik.errors.password}</p>
              </div>
            ) : null}

            <input
              type="submit"
              className="bg-gray-800 w-full mt-5 p-2 text-white uppercas hover:cursor-pointer hover:bg-gray-900"
              value="Iniciar Sesión"
            />
          </form>
        </div>
      </div>{" "}
    </Layout>
  );
}
