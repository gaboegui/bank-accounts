package com.banco.api.repository;

import com.banco.api.entity.Movimiento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Interfaz de repositorio para operaciones de Movimiento (Transacción).
 */
@Repository
public interface MovimientoRepository extends JpaRepository<Movimiento, Integer> {

    /**
     * Busca todos los movimientos asociados con una cuenta específica.
     * 
     * @param cuentaId - El ID de base de datos de la cuenta.
     * @return Lista de movimientos para la cuenta.
     */
    List<Movimiento> findByCuentaId(Integer cuentaId);

    /**
     * Busca movimientos para un cliente dentro de un rango de fechas específico.
     * Usado para generar estados de cuenta.
     * 
     * @param clienteId - El ID de base de datos del cliente.
     * @param start     - Fecha de inicio del rango.
     * @param end       - Fecha de fin del rango.
     * @return Lista de movimientos ordenados por fecha descendente.
     */
    @Query("SELECT m FROM Movimiento m WHERE m.cuenta.cliente.id = :clienteId AND m.fecha BETWEEN :start AND :end ORDER BY m.fecha DESC")
    List<Movimiento> findByClienteAndFecha(Integer clienteId, LocalDateTime start, LocalDateTime end);
}
