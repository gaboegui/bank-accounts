import { useState, useEffect } from 'react';
import { getMovimientos, createMovimiento, updateMovimiento, deleteMovimiento } from '../services/movimientoService';
import type { Movimiento } from '../types';

/**
 * Hook personalizado para gestionar entidades Movimiento.
 * Maneja la obtención, ordenamiento, creación, actualización y eliminación de movimientos.
 * 
 * @returns Objeto que contiene la lista de movimientos, estado de carga, error y operaciones CRUD.
 */
export function useMovimientos() {
    const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Obtiene los movimientos de la API y los ordena por fecha (descendente).
     */
    const fetchMovimientos = async () => {
        setLoading(true);
        try {
            const response = await getMovimientos();
            // Ordenar por fecha desc
            const sorted = response.data.sort((a, b) => {
                const dateA = a.fecha ? new Date(a.fecha).getTime() : 0;
                const dateB = b.fecha ? new Date(b.fecha).getTime() : 0;
                return dateB - dateA;
            })
            setMovimientos(sorted);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error obteniendo movimientos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMovimientos();
    }, []);

    /**
     * Agrega un nuevo movimiento.
     * @param movimiento - Los datos del movimiento a agregar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const addMovimiento = async (movimiento: Movimiento) => {
        setError(null);
        try {
            await createMovimiento(movimiento);
            await fetchMovimientos();
            return true;
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || 'Error agregando movimiento';
            setError(message);
            return false;
        }
    };

    /**
     * Limpia el estado de error.
     */
    const clearError = () => setError(null);

    /**
     * Actualiza un movimiento existente.
     * @param id - El ID del movimiento a actualizar.
     * @param movimiento - Los datos actualizados del movimiento.
     * @returns True si es exitoso, false de lo contrario.
     */
    const editMovimiento = async (id: number, movimiento: Movimiento) => {
        try {
            await updateMovimiento(id, movimiento);
            await fetchMovimientos();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error actualizando movimiento');
            return false;
        }
    };

    /**
     * Elimina un movimiento por ID.
     * @param id - El ID del movimiento a eliminar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const removeMovimiento = async (id: number) => {
        try {
            await deleteMovimiento(id);
            await fetchMovimientos();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error eliminando movimiento');
            return false;
        }
    };

    return {
        movimientos,
        loading,
        error,
        clearError,
        refreshMovimientos: fetchMovimientos,
        addMovimiento,
        editMovimiento,
        removeMovimiento
    };
}
