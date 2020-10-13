import React, { useState, useEffect } from 'react';
import axiosClient from '../../config/axios';

const Order = ({ data }) => {
    const { products, clientName, status, total, id } = data;

    const [orderStatus, setOrderStatus] = useState(status);

    const handleChange = async (value) => {
        setOrderStatus(value);
        try {
            const response = await axiosClient.put(`orders/${id}`, {
                ...data,
                status: value,
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="overflow-hidden shadow-lg border-t-4 bg-white mb-4 mx-2 rounded-b-lg rounded-t border-red-light w-auto">
            <div className="px-6 py-4 mb-2 mt-4 mb-8">
                <div className="uppercase tracking-wide text-c2 mb-2">Productos</div>
                {products.map((product, index) => {
                    if (index === products.length)
                        return (
                            <div className="flex  border px-4 py-2 text-lg text-grey-darkest border-b-0">
                                <div className="pl-2">{product.name}</div>
                            </div>
                        );
                    else
                        return (
                            <div className="flex  border px-4 py-2 text-lg text-grey-darkest">
                                <div className="pl-2">{product.name}</div>
                            </div>
                        );
                })}
                <div className="mt-4 uppercase tracking-wide text-c2 mb-2">
                    Clientes:
                    <span className="capitalize text-grey-darkest">{' ' + clientName}</span>
                </div>
                <div className="mt-2 uppercase tracking-wide text-c2 ">Status:</div>
                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-white p-2 text-center rounded leading-tight focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold "
                    value={orderStatus}
                    onChange={(e) => handleChange(e.target.value)}
                >
                    <option value="complete">Completo</option>
                    <option value="pending">Pendiente</option>
                    <option value="canceled">Cancelada</option>
                </select>
                <div className="mt-2 uppercase tracking-wide text-c2 ">Total: {total}</div>
            </div>
        </div>
    );
};
export default Order;
