import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';

const NewProduct = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            available: '',
            weight: '',
            solds: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('El nombre es obligatorio'),
            price: Yup.string().required('El precio es obligatorio'),
        }),
        onSubmit: async (valores) => {
            const product = {
                ...valores,
                id: uuidv4(),
            };

            try {
                const respose = await axiosClient.post('products', product);
                console.log(respose);
                Swal.fire('Añadido!', 'Tu producto ha sido añadido', 'success').then((res) => {
                    if (res.value) router.push('/products');
                });
            } catch (error) {
                console.log(error);
                Swal.fire('Oops...', 'Something went wrong!', 'error');
            }
        },
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Producto</h1>

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
                                htmlFor="price"
                            >
                                Precio
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="price"
                                type="text"
                                placeholder="Precio"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.price}
                            />
                        </div>
                        {formik.touched.company && formik.errors.company ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null}
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="available"
                            >
                                Disponibles
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="available"
                                type="text"
                                placeholder="Disponibles"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.available}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="weight"
                            >
                                Peso
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="weight"
                                type="text"
                                placeholder="Peso"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.weight}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="solds"
                            >
                                Vendidos
                            </label>

                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="solds"
                                type="text"
                                placeholder="Vendidos"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.solds}
                            />
                        </div>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Crear Producto"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewProduct;
