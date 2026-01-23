import { api } from './api';
import type { Cuenta, BaseResponse } from '../types';

/**
 * Obtiene todas las cuentas de la API.
 * @returns Una promesa que resuelve a un array de objetos Cuenta.
 */
export const getCuentas = async () => {
    const response = await api.get<BaseResponse<Cuenta[]>>('/cuentas');
    return response.data.data;
};

/**
 * Crea una nueva cuenta.
 * @param cuenta - Los datos de la cuenta a crear.
 * @returns Una promesa que resuelve al objeto Cuenta creado.
 */
export const createCuenta = async (cuenta: Cuenta) => {
    // Backend expects { cliente: { id: 123 } } instead of { clienteId: 123 }
    const payload = {
        ...cuenta,
        cliente: cuenta.clienteId ? { id: cuenta.clienteId } : undefined
    };
    const response = await api.post<BaseResponse<Cuenta>>('/cuentas', payload);
    return response.data.data;
};

/**
 * Actualiza una cuenta existente.
 * @param id - El ID de la cuenta a actualizar.
 * @param cuenta - Los datos actualizados de la cuenta.
 * @returns Una promesa que resuelve al objeto Cuenta actualizado.
 */
export const updateCuenta = async (id: number, cuenta: Cuenta) => {
    const payload = {
        ...cuenta,
        cliente: cuenta.clienteId ? { id: cuenta.clienteId } : undefined
    };
    const response = await api.put<BaseResponse<Cuenta>>(`/cuentas/${id}`, payload);
    return response.data.data;
};

/**
 * Elimina una cuenta por ID.
 * @param id - El ID de la cuenta a eliminar.
 * @returns Una promesa que resuelve cuando la eliminación se completa.
 */
export const deleteCuenta = async (id: number) => {
    return api.delete(`/cuentas/${id}`);
};
