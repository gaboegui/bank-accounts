import { api } from './api';
import type { Cliente, BaseResponse } from '../types';

/**
 * Obtiene todos los clientes de la API.
 * @returns Una promesa que resuelve a un array de objetos Cliente.
 */
export const getClientes = async () => {
    // Si el backend soporta parámetro de búsqueda
    // return api.get<Cliente[]>('/clientes', { params: { search } });

    // Asumiendo que el backend devuelve todos y filtramos (o actualizamos el backend luego)
    // Por ahora solo obtenemos todos.
    const response = await api.get<BaseResponse<Cliente[]>>('/clientes');
    return response.data.data;
};

/**
 * Crea un nuevo cliente.
 * @param cliente - Los datos del cliente a crear.
 * @returns Una promesa que resuelve al objeto Cliente creado.
 */
export const createCliente = async (cliente: Cliente) => {
    const response = await api.post<BaseResponse<Cliente>>('/clientes', cliente);
    return response.data.data;
};

/**
 * Actualiza un cliente existente.
 * @param id - El ID del cliente a actualizar.
 * @param cliente - Los datos actualizados del cliente.
 * @returns Una promesa que resuelve al objeto Cliente actualizado.
 */
export const updateCliente = async (id: number, cliente: Cliente) => {
    const response = await api.put<BaseResponse<Cliente>>(`/clientes/${id}`, cliente);
    return response.data.data;
};

/**
 * Elimina un cliente por ID.
 * @param id - El ID del cliente a eliminar.
 * @returns Una promesa que resuelve cuando la eliminación se completa.
 */
export const deleteCliente = async (id: number) => {
    return api.delete(`/clientes/${id}`);
};
