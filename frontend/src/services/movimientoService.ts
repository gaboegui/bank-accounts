import { api } from './api';
import type { Movimiento, BaseResponse } from '../types';

/**
 * Obtiene todos los movimientos de la API.
 * @returns Una promesa que resuelve a un array de objetos Movimiento.
 */
export const getMovimientos = async () => {
    const response = await api.get<BaseResponse<Movimiento[]>>('/movimientos');
    return response.data.data;
};

/**
 * Crea un nuevo movimiento.
 * @param movimiento - Los datos del movimiento a crear.
 * @returns Una promesa que resuelve al objeto Movimiento creado.
 */
export const createMovimiento = async (movimiento: Movimiento) => {
    const response = await api.post<BaseResponse<Movimiento>>('/movimientos', movimiento);
    return response.data.data;
};

/**
 * Actualiza un movimiento existente.
 * @param id - El ID del movimiento a actualizar.
 * @param movimiento - Los datos actualizados del movimiento.
 * @returns Una promesa que resuelve al objeto Movimiento actualizado.
 */
export const updateMovimiento = async (id: number, movimiento: Movimiento) => {
    const response = await api.put<BaseResponse<Movimiento>>(`/movimientos/${id}`, movimiento);
    return response.data.data;
};

/**
 * Elimina un movimiento por ID.
 * @param id - El ID del movimiento a eliminar.
 * @returns Una promesa que resuelve cuando la eliminación se completa.
 */
export const deleteMovimiento = async (id: number) => {
    return api.delete(`/movimientos/${id}`);
};
