import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import axiosClient from '../../config/axios';
import Swal from 'sweetalert2';

const EditClient = () => {
    const [client, setClient] = useState({});
    const router = useRouter();
    const {
        query: { id },
    } = router;

    useEffect(() => {
        // obtiene el cliente a editar
        axiosClient.get(`users?id=${id}`).then((res) => {
            setClient(res.data[0]);
        });
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        company: Yup.string().required('El nombre de la compania es obligatorio'),
        email: Yup.string().email('Correo invalido').required('El email es obligatorio'),
        password: Yup.string().required("La contraseña es obligatoria'"),
    });

    const handleSubmit = async (data) => {
        try {
            const updatedClient = { ...client, ...data };
            const respose = await axiosClient.put(`users/${client.id}`, updatedClient);
            Swal.fire('Actualizado!', 'Tu cliente ha sido actualizado! ', 'success').then((res) => {
                if (res.value) router.push('/');
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    };
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <Formik
                        validationSchema={validationSchema}
                        enableReinitialize
                        initialValues={{
                            name: client.name,
                            company: client.company,
                            email: client.email,
                            password: client.password,
                        }}
                        onSubmit={(valores) => {
                            handleSubmit(valores);
                        }}
                    >
                        {(props) => {
                            return (
                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.name}
                                        />
                                    </div>
                                    {props.touched.name && props.errors.name ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.name}</p>
                                        </div>
                                    ) : null}
                                    <div className="mb-4">
                                        <label
                                            className="block text-gray-700 text-sm font-bold mb-2"
                                            htmlFor="company"
                                        >
                                            Compania
                                        </label>
                                        <input
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                            id="company"
                                            type="text"
                                            placeholder="Nombre de la compania"
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.company}
                                        />
                                    </div>
                                    {props.touched.company && props.errors.company ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.company}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.email}
                                        />
                                    </div>
                                    {props.touched.email && props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
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
                                            onChange={props.handleChange}
                                            onBlur={props.handleBlur}
                                            value={props.values.password}
                                        />
                                        {props.touched.password && props.errors.password ? (
                                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                                <p className="font-bold">Error</p>
                                                <p>{props.errors.password}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                    <input
                                        type="submit"
                                        className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                                        value="Editar Cliente"
                                    />
                                </form>
                            );
                        }}
                    </Formik>
                     
                </div>
            </div>
        </Layout>
    );
};
export default EditClient;
