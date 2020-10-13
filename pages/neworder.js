import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { getCurrentSeller, getClients } from '../helpers';
import Select from 'react-select';

const NewClient = () => {
    const router = useRouter();

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});

    const optionsStatus = [
        { value: 'completed', label: 'Completado' },
        { value: 'pending', label: 'Pendiente' },
        { value: 'canceled', label: 'Cancelado' },
    ];
    const optionsClients = clients.map((client) => ({
        label: client.name,
        value: client.name,
    }));
    const optionsProducts = products.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    useEffect(() => {
        const seller = getCurrentSeller();
        getClients(seller.id).then((res) => setClients(res.data));
        axiosClient.get('products').then((res) => {
            setProducts(res.data);
        });
    }, []);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // se obtiene la informacion de los productos a enviar
            let productsSubmit = [];
            data.productsId.map((id) => {
                productsSubmit.push(products.filter((product) => product.id === id.value)[0]);
            });
            const order = {
                id: uuidv4(),
                products: productsSubmit,
                total: data.total,
                clientName: data.client.value,
                status: data.status,
            };
            await axiosClient.post('orders', order);
            Swal.fire('Añadida!', 'Tu orden ha sido añadida', 'success').then((res) => {
                if (res.value) router.push('/orders');
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    };
    if (clients.length === 0) return null;
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nueva Orden</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="block text-gray-700 text-sm font-bold my-2">Cliente:</div>
                        <Select
                            options={optionsClients}
                            onChange={(e) => setData((prev) => ({ ...prev, client: e }))}
                        />

                        <div className="block text-gray-700 text-sm font-bold my-2">Productos:</div>
                        <Select
                            isMulti
                            options={optionsProducts}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e) => setData((prev) => ({ ...prev, productsId: e }))}
                        />

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold my-2"
                                htmlFor="total"
                            >
                                Total
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total"
                                type="text"
                                placeholder="Total"
                                onChange={(e) => {
                                    const total = e.target.value;
                                    setData((prev) => ({ ...prev, total }));
                                }}
                            />
                        </div>
                        <div className="block text-gray-700 text-sm font-bold my-2">Status:</div>
                        <Select
                            options={optionsStatus}
                            onChange={(e) => setData((prev) => ({ ...prev, status: e }))}
                        />

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
