package com.banco.api.service;

import com.banco.api.entity.Movimiento;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Interfaz de servicio para la generación de reportes financieros.
 * Utilizada para recuperar datos para estados de cuenta.
 */
public interface ReporteService {

    /**
     * Recupera movimientos para un cliente específico dentro de un rango de fechas.
     * 
     * @param clienteId - El ID del cliente.
     * @param start     - Fecha de inicio del reporte.
     * @param end       - Fecha de fin del reporte.
     * @return Lista de movimientos ordenados por fecha.
     */
    List<Movimiento> getMovimientosReporte(Integer clienteId, LocalDateTime start, LocalDateTime end);
}
