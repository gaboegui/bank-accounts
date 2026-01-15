package com.banco.api.service;

import com.banco.api.entity.Cliente;
import java.util.List;

/**
 * Interfaz de servicio para gestionar entidades Cliente.
 * Define el contrato para la lógica de negocio relacionada con clientes.
 */
public interface ClienteService {

    /**
     * Crea un nuevo cliente.
     * 
     * @param cliente - La entidad cliente a crear.
     * @return El cliente creado con ID generado.
     */
    Cliente createCliente(Cliente cliente);

    /**
     * Actualiza la información de un cliente existente.
     * 
     * @param id      - El ID del cliente a actualizar.
     * @param cliente - Los datos del cliente con actualizaciones.
     * @return La entidad cliente actualizada.
     */
    Cliente updateCliente(Integer id, Cliente cliente);

    /**
     * Elimina un cliente por su ID.
     * 
     * @param id - El ID del cliente a eliminar.
     */
    void deleteCliente(Integer id);

    /**
     * Recupera todos los clientes en el sistema.
     * 
     * @return Lista de todos los clientes.
     */
    List<Cliente> getAllClientes();
}
