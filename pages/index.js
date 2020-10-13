import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Client from '../components/Client';
import axiosClient from '../config/axios';
import { getCurrentSeller, getClients } from '../helpers';

export default function Home() {
    const router = useRouter();
    const [clients, setClients] = useState([]);
    useEffect(() => {
        const isAuth = JSON.parse(localStorage.getItem('isAuth'));
        if (!isAuth) {
            router.push('/login');
        } else {
            const seller = getCurrentSeller();
            getClients(seller.id).then((res) => setClients(res.data));
        }
    }, []);
    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>
            <Link href="/newclient">
                <a className="bg-blue-800 py-2 px-5 mt-3 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold w-full lg:w-auto text-center">
                    Nuevo Cliente
                </a>
            </Link>

            <div className="overflow-x-scroll">
                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/5 py-2">Nombre</th>
                            <th className="w-1/5 py-2">Compañia</th>
                            <th className="w-1/5 py-2">Email</th>
                            <th className="w-1/5 py-2">Eliminar</th>
                            <th className="w-1/5 py-2">Editar</th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        {clients.map((client) => (
                            <Client
                                key={client.id}
                                data={client}
                                clients={clients}
                                setClients={setClients}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}
