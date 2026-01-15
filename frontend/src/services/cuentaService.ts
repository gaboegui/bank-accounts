import { api } from './api';
import type { Cuenta } from '../types';

/**
 * Obtiene todas las cuentas de la API.
 * @returns Una promesa que resuelve a un array de objetos Cuenta.
 */
export const getCuentas = async () => {
    return api.get<Cuenta[]>('/cuentas');
};

/**
 * Crea una nueva cuenta.
 * @param cuenta - Los datos de la cuenta a crear.
 * @returns Una promesa que resuelve al objeto Cuenta creado.
 */
export const createCuenta = async (cuenta: Cuenta) => {
    return api.post<Cuenta>('/cuentas', cuenta);
};

/**
 * Actualiza una cuenta existente.
 * @param id - El ID de la cuenta a actualizar.
 * @param cuenta - Los datos actualizados de la cuenta.
 * @returns Una promesa que resuelve al objeto Cuenta actualizado.
 */
export const updateCuenta = async (id: number, cuenta: Cuenta) => {
    return api.put<Cuenta>(`/cuentas/${id}`, cuenta);
};

/**
 * Elimina una cuenta por ID.
 * @param id - El ID de la cuenta a eliminar.
 * @returns Una promesa que resuelve cuando la eliminación se completa.
 */
export const deleteCuenta = async (id: number) => {
    return api.delete(`/cuentas/${id}`);
};
