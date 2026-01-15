package com.banco.api.mapper;

import com.banco.api.dto.ClienteDTO;
import com.banco.api.entity.Cliente;
import org.springframework.stereotype.Component;

/**
 * Mapeador para convertir entre entidad Cliente y ClienteDTO.
 */
@Component
public class ClienteMapper {

    public ClienteDTO toDto(Cliente entity) {
        if (entity == null)
            return null;
        ClienteDTO dto = new ClienteDTO();
        dto.setId(entity.getId());
        dto.setNombre(entity.getNombre());
        dto.setGenero(entity.getGenero());
        dto.setEdad(entity.getEdad());
        dto.setIdentificacion(entity.getIdentificacion());
        dto.setDireccion(entity.getDireccion());
        dto.setTelefono(entity.getTelefono());
        dto.setClienteId(entity.getClienteId());
        dto.setContrasena(entity.getContrasena());
        dto.setEstado(entity.getEstado());
        return dto;
    }

    public Cliente toEntity(ClienteDTO dto) {
        if (dto == null)
            return null;
        Cliente entity = new Cliente();
        entity.setId(dto.getId()); // Might be null for create
        entity.setNombre(dto.getNombre());
        entity.setGenero(dto.getGenero());
        entity.setEdad(dto.getEdad());
        entity.setIdentificacion(dto.getIdentificacion());
        entity.setDireccion(dto.getDireccion());
        entity.setTelefono(dto.getTelefono());
        entity.setClienteId(dto.getClienteId());
        entity.setContrasena(dto.getContrasena());
        entity.setEstado(dto.getEstado());
        return entity;
    }
}
