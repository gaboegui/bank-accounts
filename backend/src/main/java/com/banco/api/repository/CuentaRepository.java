package com.banco.api.repository;

import com.banco.api.entity.Cuenta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Interfaz de repositorio para operaciones de la entidad Cuenta.
 */
@Repository
public interface CuentaRepository extends JpaRepository<Cuenta, Integer> {

    /**
     * Verifica si existe una cuenta con el número de cuenta dado.
     * 
     * @param numeroCuenta - El número de cuenta único.
     * @return true si existe, false en caso contrario.
     */
    boolean existsByNumeroCuenta(String numeroCuenta);

    /**
     * Busca todas las cuentas pertenecientes a un cliente específico.
     * 
     * @param clienteId - El ID de base de datos del cliente.
     * @return Lista de cuentas asociadas con el cliente.
     */
    List<Cuenta> findByClienteId(Integer clienteId);
}
