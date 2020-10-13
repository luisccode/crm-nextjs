import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { getCurrentSeller } from '../helpers';

const NewClient = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            company: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            company: Yup.string().required('El nombre de la compañia es obligatorio'),
            email: Yup.string().email('Email invalido').required('El email es obligatorio'),
            password: Yup.string().required('La contraseña es obligatoria'),
        }),
        onSubmit: async (valores) => {
            try {
                const seller = getCurrentSeller();
                // crea un cliente automaticamente asignado al vendedor logueado
                const client = {
                    ...valores,
                    id: uuidv4(),
                    role: 'client',
                    sellerId: seller.id,
                };
                const respose = await axiosClient.post('users', client);
                console.log(respose);
                Swal.fire('Added!', 'El cliente ha sido actualizado', 'success').then((res) => {
                    if (res.value) router.push('/');
                });
            } catch (error) {
                console.log(error);
                Swal.fire('Oops...', 'Something went wrong!', 'error');
            }
        },
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="name"
                            >
                                Nombre
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Nombre"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                            />
                        </div>
                        {formik.touched.name && formik.errors.name ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="company"
                            >
                                Compañia
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="company"
                                type="text"
                                placeholder="Nombre de la compañia"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.company}
                            />
                        </div>
                        {formik.touched.company && formik.errors.company ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.company}</p>
                            </div>
                        ) : null}
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
                                type="text"
                                placeholder="Email"
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
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null}
                        </div>
                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Crear cliente"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewClient;
