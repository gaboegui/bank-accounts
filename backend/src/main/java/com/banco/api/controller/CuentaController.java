package com.banco.api.controller;

import com.banco.api.dto.CuentaDTO;
import com.banco.api.mapper.CuentaMapper;
import com.banco.api.service.CuentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para la gestión de Cuentas.
 * Expone endpoints para gestionar cuentas bancarias.
 * Implementa la interfaz de API generada por OpenAPI.
 */
@RestController
@RequiredArgsConstructor
public class CuentaController implements CuentaControllerApi {

    private final CuentaService cuentaService;
    private final CuentaMapper mapper;

    @Override
    public ResponseEntity<List<CuentaDTO>> cuentasGet() {
        return ResponseEntity.ok(cuentaService.getAllCuentas().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<CuentaDTO> cuentasPost(CuentaDTO cuenta) {
        com.banco.api.entity.Cuenta created = cuentaService.createCuenta(mapper.toEntity(cuenta));
        return new ResponseEntity<>(mapper.toDto(created), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<CuentaDTO> cuentasIdPut(Integer id, CuentaDTO cuenta) {
        com.banco.api.entity.Cuenta updated = cuentaService.updateCuenta(id, mapper.toEntity(cuenta));
        return ResponseEntity.ok(mapper.toDto(updated));
    }

    @Override
    public ResponseEntity<Void> cuentasIdDelete(Integer id) {
        cuentaService.deleteCuenta(id);
        return ResponseEntity.noContent().build();
    }
}
