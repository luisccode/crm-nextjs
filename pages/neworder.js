import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { getCurrentSeller, getClients } from '../helpers';

const NewClient = () => {
    const router = useRouter();

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const seller = getCurrentSeller();
        getClients(seller.id).then((res) => setClients(res.data));
        axiosClient.get('products').then((res) => {
            setProducts(res.data);
        });
    }, []);
    const formik = useFormik({
        initialValues: {
            clientId: '',
            productId: '',
            total: '',
            status: '',
        },
        validationSchema: Yup.object({
            total: Yup.string().required('El precio es obligatorio'),
        }),
        onSubmit: async (valores) => {
            const product = products.filter((product) => product.id === valores.productId)[0];
            try {
                const order = {
                    id: uuidv4(),
                    products: [product],
                    total: valores.total,
                    clientId: valores.clientId,
                    clientName: '',
                    status: valores.status,
                };
                const respose = await axiosClient.post('orders', order);
                console.log(respose);
                Swal.fire('Añadida!', 'Tu orden ha sido añadida', 'success').then((res) => {
                    if (res.value) router.push('/orders');
                });
            } catch (error) {
                console.log(error);
                Swal.fire('Oops...', 'Something went wrong!', 'error');
            }
        },
    });
    if (clients.length === 0) return null;
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nueva Orden</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mt-2 uppercase tracking-wide text-c2 ">Cliente:</div>
                        <select
                            className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                            id="clientId"
                            onChange={formik.handleChange}
                            value={formik.values.clientId}
                        >
                            {clients.map((client) => (
                                <option value={client.id}>{client.name}</option>
                            ))}
                        </select>

                        <div className="mt-2 uppercase tracking-wide text-c2 ">Producto:</div>
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
                        <select
                            className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                            id="status"
                            onChange={formik.handleChange}
                            value={formik.values.status}
                        >
                            <option value="complete">Completo</option>
                            <option value="pending">Pendiente</option>
                            <option value="canceled">Cancelado</option>
                        </select>

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Crear Orden"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewClient;
