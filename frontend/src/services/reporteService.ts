import { api } from './api';
import type { Reporte, BaseResponse } from '../types';
import { toISODateString } from '../utils/format';

/**
 * Obtiene el reporte de estado de cuenta para un cliente dentro de un rango de fechas.
 * @param fechaInicio - Fecha de inicio del reporte (cadena ISO o YYYY-MM-DD).
 * @param fechaFin - Fecha de fin del reporte (cadena ISO o YYYY-MM-DD).
 * @param clienteId - El ID del cliente para generar el reporte.
 * @returns Una promesa que resuelve a un array de objetos Reporte.
 */
export const getReporte = async (fechaInicio: string, fechaFin: string, clienteId: number) => {
    // Asegurar que las fechas estén en formato YYYY-MM-DD
    const formattedFechaInicio = toISODateString(fechaInicio);
    const formattedFechaFin = toISODateString(fechaFin);

    console.log('Sending to API:', {
        fechaInicio: formattedFechaInicio,
        fechaFin: formattedFechaFin,
        clienteId
    });

    const response = await api.get<BaseResponse<Reporte[]>>('/reportes', {
        params: {
            fechaInicio: formattedFechaInicio,
            fechaFin: formattedFechaFin,
            clienteId
        }
    });
    return response.data.data;
};
