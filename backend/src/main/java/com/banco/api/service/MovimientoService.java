package com.banco.api.service;

import com.banco.api.entity.Movimiento;
import java.util.List;

/**
 * Interfaz de servicio para gestionar Movimientos Financieros (Transacciones).
 * Define operaciones para depósitos, retiros e historial de transacciones.
 */
public interface MovimientoService {

    /**
     * Registra un nuevo movimiento (transacción).
     * Impacta el saldo de la cuenta.
     * 
     * @param movimiento - Los detalles del movimiento (cuenta, monto, tipo).
     * @return El movimiento creado con saldo actualizado.
     */
    Movimiento createMovimiento(Movimiento movimiento);

    /**
     * Actualiza un movimiento.
     * NOTA: Esta operación está restringida por razones de seguridad.
     * 
     * @param movimientoDTO - Los datos del movimiento.
     * @return El movimiento actualizado.
     */
    Movimiento updateMovimiento(com.banco.api.dto.MovimientoDTO movimientoDTO);

    /**
     * Elimina un movimiento y revierte su impacto en el saldo de la cuenta.
     * 
     * @param deleteDTO - El DTO con el ID del movimiento a eliminar.
     */
    void deleteMovimiento(com.banco.api.dto.DeleteDTO deleteDTO);

    /**
     * Recupera todos los movimientos.
     * 
     * @return Lista de todos los movimientos.
     */
    List<Movimiento> getAllMovimientos();
}
