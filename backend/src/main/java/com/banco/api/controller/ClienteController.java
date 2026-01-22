package com.banco.api.controller;

import com.banco.api.dto.ClienteDTO;
import com.banco.api.dto.ClienteListResponse;
import com.banco.api.dto.ClienteResponse;
import com.banco.api.dto.VoidResponse;
import com.banco.api.entity.Cliente;
import com.banco.api.mapper.ClienteMapper;
import com.banco.api.service.ClienteService;
import com.banco.api.util.ResponseBuilder;
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
    public ResponseEntity<ClienteListResponse> clientesGet() {
        List<ClienteDTO> clientes = clienteService.getAllClientes().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());

        ClienteListResponse response = new ClienteListResponse();
        response.setData(clientes);

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Clientes listados exitosamente"));
    }

    @Override
    public ResponseEntity<ClienteResponse> clientesPost(ClienteDTO cliente) {
        Cliente created = clienteService.createCliente(mapper.toEntity(cliente));

        ClienteResponse response = new ClienteResponse();
        response.setData(mapper.toDto(created));

        return new ResponseEntity<>(ResponseBuilder.buildSuccess(response, "Cliente creado exitosamente"),
                HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<ClienteResponse> clientesIdPut(Integer id, ClienteDTO cliente) {
        cliente.setId(id); // Ensure ID is set in DTO
        Cliente updated = clienteService.updateCliente(cliente);

        ClienteResponse response = new ClienteResponse();
        response.setData(mapper.toDto(updated));

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Cliente actualizado exitosamente"));
    }

    @Override
    public ResponseEntity<VoidResponse> clientesIdDelete(Integer id) {
        com.banco.api.dto.DeleteDTO deleteDTO = new com.banco.api.dto.DeleteDTO(id);
        clienteService.deleteCliente(deleteDTO);

        VoidResponse response = new VoidResponse();

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Cliente eliminado exitosamente"));
    }
}
