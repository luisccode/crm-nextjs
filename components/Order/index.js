import React, { useState, useEffect } from 'react';
import axiosClient from '../../config/axios';
import Select from 'react-select';
import { statusOptions } from '../../helpers';

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
        } catch (error) {
            console.log(error);
        }
    };

    const borderColor =
        orderStatus.value === 'completed'
            ? `border-green-400`
            : orderStatus.value === 'pending'
            ? `border-orange-400`
            : `border-red-600`;

    return (
        <div
            className={`shadow-lg border-t-4 bg-white mb-8 rounded-b-lg rounded-t ${borderColor} w-3/4 md:w-2/5 lg:w-1/4 lg:mx-1`}
        >
            <div className="px-6 py-4 mb-2 mt-4 mb-8">
                <div className="capitalize tracking-wide text-c2 mb-2">Productos</div>
                {products.map((product, index) => {
                    const border = index === products.length ? `border-b-0"` : ``;
                    return (
                        <div
                            key={index}
                            className={`flex border px-4 py-2 text-lg text-grey-darkest ${border}`}
                        >
                            <div className="pl-2">{product.name}</div>
                        </div>
                    );
                })}
                <div className="mt-4 capitalize  tracking-wide text-c2 mb-2">
                    Cliente:
                    <span className="capitalize text-grey-darkest">{' ' + clientName}</span>
                </div>
                <div className="my-2 capitalize tracking-wide text-c2 ">Status:</div>

                <Select
                    defaultValue={orderStatus}
                    options={statusOptions}
                    onChange={(e) => handleChange(e)}
                />
                <div className="mt-2 uppercase tracking-wide text-c2 ">Total: {total}</div>
            </div>
        </div>
    );
};
export default Order;
