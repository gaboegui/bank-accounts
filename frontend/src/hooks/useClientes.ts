import { useState, useEffect } from 'react';
import { getClientes, createCliente, updateCliente, deleteCliente } from '../services/clienteService';
import type { Cliente } from '../types';

/**
 * Hook personalizado para gestionar entidades Cliente.
 * Maneja la obtención, búsqueda, creación, actualización y eliminación de clientes.
 * 
 * @param debouncedSearch - Cadena de búsqueda opcional para filtrar clientes por nombre.
 * @returns Objeto que contiene la lista de clientes, estado de carga, error y operaciones CRUD.
 */
export function useClientes(debouncedSearch: string = '') {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Obtiene los clientes de la API y los filtra si se proporciona un término de búsqueda.
     */
    const fetchClientes = async () => {
        setLoading(true);
        try {
            const data = await getClientes();
            let filteredData = data;
            if (debouncedSearch) {
                filteredData = data.filter(c => c.nombre.toLowerCase().includes(debouncedSearch.toLowerCase()));
            }
            setClientes(filteredData);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Error obteniendo clientes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClientes();
    }, [debouncedSearch]);

    /**
     * Agrega un nuevo cliente.
     * @param cliente - Los datos del cliente a agregar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const addCliente = async (cliente: Cliente) => {
        try {
            await createCliente(cliente);
            await fetchClientes();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error agregando cliente');
            return false;
        }
    };

    /**
     * Actualiza un cliente existente.
     * @param id - El ID del cliente a actualizar.
     * @param cliente - Los datos actualizados del cliente.
     * @returns True si es exitoso, false de lo contrario.
     */
    const editCliente = async (id: number, cliente: Cliente) => {
        try {
            await updateCliente(id, cliente);
            await fetchClientes();
            return true;
        } catch (err) {
            console.error(err);
            setError('Error actualizando cliente');
            return false;
        }
    };

    /**
     * Elimina un cliente por ID.
     * @param id - El ID del cliente a eliminar.
     * @returns True si es exitoso, false de lo contrario.
     */
    const removeCliente = async (id: number) => {
        try {
            await deleteCliente(id);
            await fetchClientes();
            return true;
        } catch (err: any) {
            console.error(err);
            const message = err.response?.data?.message || 'Error eliminando cliente';
            setError(message);
            return false;
        }
    };

    return {
        clientes,
        loading,
        error,
        refreshClientes: fetchClientes,
        addCliente,
        editCliente,
        removeCliente
    };
}
