package com.banco.api.controller;

import com.banco.api.dto.ClienteDTO;
import com.banco.api.mapper.ClienteMapper;
import com.banco.api.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para la gestión de Clientes.
 * Expone endpoints para crear, recuperar, actualizar y eliminar clientes.
 * Implementa la interfaz de API generada por OpenAPI.
 */
@RestController
@RequiredArgsConstructor
public class ClienteController implements ClienteControllerApi {

    private final ClienteService clienteService;
    private final ClienteMapper mapper;

    @Override
    public ResponseEntity<List<ClienteDTO>> clientesGet() {
        return ResponseEntity.ok(clienteService.getAllClientes().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<ClienteDTO> clientesPost(ClienteDTO cliente) {
        com.banco.api.entity.Cliente created = clienteService.createCliente(mapper.toEntity(cliente));
        return new ResponseEntity<>(mapper.toDto(created), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ClienteDTO> clientesIdPut(Integer id, ClienteDTO cliente) {
        com.banco.api.entity.Cliente updated = clienteService.updateCliente(id, mapper.toEntity(cliente));
        return ResponseEntity.ok(mapper.toDto(updated));
    }

    @Override
    public ResponseEntity<Void> clientesIdDelete(Integer id) {
        clienteService.deleteCliente(id);
        return ResponseEntity.noContent().build();
    }
}
