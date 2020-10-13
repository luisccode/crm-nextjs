import axiosClient from '../config/axios';

// obtiene los datos del vendedor logueado
export const getCurrentSeller = () => JSON.parse(localStorage.getItem('userData'));

// retorna una promesa con todos clientes dado el id del vendedor
export const getClients = (sellerId) => {
    return axiosClient.get(`/users?role=client&sellerId=${sellerId}`);
};
export const statusOptions = [
    { value: 'completed', label: 'Completado' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'canceled', label: 'Cancelado' },
];
