import { useState } from 'react';
import { getReporte } from '../services/reporteService';
import type { Reporte } from '../types';

/**
 * Hook personalizado para gestionar entidades Reporte.
 * Maneja la obtención de reportes.
 * 
 * @returns Objeto que contiene la lista de reportes, estado de carga, error y operación de obtención.
 */
export function useReportes() {
    const [reportes, setReportes] = useState<Reporte[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Obtiene un reporte para un cliente específico dentro de un rango de fechas.
     * @param fechaInicio - Fecha de inicio.
     * @param fechaFin - Fecha de fin.
     * @param clienteId - ID del cliente.
     */
    const fetchReporte = async (fechaInicio: string, fechaFin: string, clienteId: string) => {
        console.log('fetchReporte called with:', { fechaInicio, fechaFin, clienteId });
        setLoading(true);
        try {
            const response = await getReporte(fechaInicio, fechaFin, parseInt(clienteId));
            console.log('API Response:', response);
            console.log('Response data:', response.data);
            console.log('Response data length:', response.data?.length);
            setReportes(response.data);
            setError(null);
        } catch (err: any) {
            console.error('Error in fetchReporte:', err);
            console.error('Error response:', err.response);
            console.error('Error message:', err.message);
            setError('Error obteniendo reportes');
            setReportes([]); // Clear reportes on error
        } finally {
            setLoading(false);
        }
    };

    return {
        reportes,
        loading,
        error,
        fetchReporte
    };
}
