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
     * @param id     - El ID de la cuenta a actualizar.
     * @param cuenta - Los datos de la cuenta con actualizaciones.
     * @return La entidad cuenta actualizada.
     */
    Cuenta updateCuenta(Integer id, Cuenta cuenta);

    /**
     * Elimina una cuenta del sistema.
     * 
     * @param id - El ID de la cuenta a eliminar.
     */
    void deleteCuenta(Integer id);

    /**
     * Recupera todas las cuentas registradas en el sistema.
     * 
     * @return Lista de todas las cuentas.
     */
    List<Cuenta> getAllCuentas();
}
