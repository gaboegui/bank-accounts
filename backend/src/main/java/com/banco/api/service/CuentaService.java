package com.banco.api.service;

import com.banco.api.entity.Cuenta;
import java.util.List;

/**
 * Interfaz de servicio para gestionar entidades Cuenta.
 * Define las operaciones de negocio relacionadas con cuentas bancarias.
 */
public interface CuentaService {

    /**
     * Crea una nueva cuenta bancaria.
     * 
     * @param cuenta - Los detalles de la cuenta a crear.
     * @return La cuenta creada con ID generado.
     */
    Cuenta createCuenta(Cuenta cuenta);

    /**
     * Actualiza los detalles de una cuenta existente (ej. estado, límites).
     * 
     * @param cuentaDTO - Los datos de la cuenta con actualizaciones.
     * @return La entidad cuenta actualizada.
     */
    Cuenta updateCuenta(com.banco.api.dto.CuentaDTO cuentaDTO);

    /**
     * Elimina una cuenta del sistema.
     * 
     * @param deleteDTO - El DTO con el ID de la cuenta a eliminar.
     */
    void deleteCuenta(com.banco.api.dto.DeleteDTO deleteDTO);

    /**
     * Recupera todas las cuentas registradas en el sistema.
     * 
     * @return Lista de todas las cuentas.
     */
    List<Cuenta> getAllCuentas();
}
