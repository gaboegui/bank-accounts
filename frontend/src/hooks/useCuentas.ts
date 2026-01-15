import { useState, useEffect } from 'react';
import { getCuentas, createCuenta, updateCuenta, deleteCuenta } from '../services/cuentaService';
import type { Cuenta } from '../types';

/**
 * Hook personalizado para gestionar entidades Cuenta.
 * Maneja la obtención, creación, actualización y eliminación de cuentas.
 * 
 * @returns Objeto que contiene la lista de cuentas, estado de carga, error y operaciones CRUD.
 */
export function useCuentas() {
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Obtiene las cuentas de la API.
     */
    const fetchCuentas = async () => {
        setLoading(true);
        try {
            const response = await getCuentas();
            setCuentas(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error obteniendo cuentas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCuentas();
    }, []);

    /**
     * Agrega una nueva cuenta.
     * @param cuenta - Los datos de la cuenta a agregar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const addCuenta = async (cuenta: Cuenta) => {
        try {
            await createCuenta(cuenta);
            await fetchCuentas();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error agregando cuenta');
            return false;
        }
    };

    /**
     * Actualiza una cuenta existente.
     * @param id - El ID de la cuenta a actualizar.
     * @param cuenta - Los datos actualizados de la cuenta.
     * @returns True si es exitoso, false de lo contrario.
     */
    const editCuenta = async (id: number, cuenta: Cuenta) => {
        try {
            await updateCuenta(id, cuenta);
            await fetchCuentas();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error actualizando cuenta');
            return false;
        }
    };

    /**
     * Elimina una cuenta por ID.
     * @param id - El ID de la cuenta a eliminar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const removeCuenta = async (id: number) => {
        try {
            await deleteCuenta(id);
            await fetchCuentas();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error eliminando cuenta');
            return false;
        }
    };

    return {
        cuentas,
        loading,
        error,
        refreshCuentas: fetchCuentas,
        addCuenta,
        editCuenta,
        removeCuenta
    };
}
