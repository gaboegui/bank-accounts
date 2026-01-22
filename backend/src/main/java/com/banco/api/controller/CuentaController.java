package com.banco.api.controller;

import com.banco.api.dto.CuentaDTO;
import com.banco.api.dto.CuentaListResponse;
import com.banco.api.dto.CuentaResponse;
import com.banco.api.dto.VoidResponse;
import com.banco.api.mapper.CuentaMapper;
import com.banco.api.service.CuentaService;
import com.banco.api.util.ResponseBuilder;
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
    public ResponseEntity<CuentaListResponse> cuentasGet() {
        List<CuentaDTO> cuentas = cuentaService.getAllCuentas().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());

        CuentaListResponse response = new CuentaListResponse();
        response.setData(cuentas);

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Cuentas listadas exitosamente"));
    }

    @Override
    public ResponseEntity<CuentaResponse> cuentasPost(CuentaDTO cuenta) {
        com.banco.api.entity.Cuenta created = cuentaService.createCuenta(mapper.toEntity(cuenta));

        CuentaResponse response = new CuentaResponse();
        response.setData(mapper.toDto(created));

        return new ResponseEntity<>(ResponseBuilder.buildSuccess(response, "Cuenta creada exitosamente"),
                HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<CuentaResponse> cuentasIdPut(Integer id, CuentaDTO cuenta) {
        com.banco.api.entity.Cuenta updated = cuentaService.updateCuenta(id, mapper.toEntity(cuenta));

        CuentaResponse response = new CuentaResponse();
        response.setData(mapper.toDto(updated));

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Cuenta actualizada exitosamente"));
    }

    @Override
    public ResponseEntity<VoidResponse> cuentasIdDelete(Integer id) {
        cuentaService.deleteCuenta(id);

        VoidResponse response = new VoidResponse();

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Cuenta eliminada exitosamente"));
    }
}
