package com.banco.api.repository;

import com.banco.api.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Interfaz de repositorio para operaciones de la entidad Cliente.
 * Extiende JpaRepository para capacidades CRUD estándar.
 */
@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    /**
     * Verifica si existe un cliente con el ID de Cliente único dado.
     * 
     * @param clienteId - El identificador de negocio único del cliente.
     * @return true si existe, false en caso contrario.
     */
    boolean existsByClienteId(String clienteId);
}
