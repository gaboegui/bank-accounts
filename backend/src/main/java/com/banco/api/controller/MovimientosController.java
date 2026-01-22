package com.banco.api.controller;

import com.banco.api.dto.MovimientoDTO;
import com.banco.api.dto.MovimientoListResponse;
import com.banco.api.dto.MovimientoResponse;
import com.banco.api.dto.VoidResponse;
import com.banco.api.entity.Movimiento;
import com.banco.api.mapper.MovimientoMapper;
import com.banco.api.service.MovimientoService;
import com.banco.api.util.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para la gestión de Movimientos (Transacciones).
 * Expone endpoints para registrar, recuperar, actualizar (si está permitido) y
 * eliminar transacciones.
 * Implementa la interfaz de API generada por OpenAPI.
 */
@RestController
@RequiredArgsConstructor
public class MovimientosController implements MovimientosControllerApi {

    private final MovimientoService movimientoService;
    private final MovimientoMapper mapper;

    @Override
    public ResponseEntity<MovimientoListResponse> movimientosGet() {
        List<MovimientoDTO> movimientos = movimientoService.getAllMovimientos().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());

        MovimientoListResponse response = new MovimientoListResponse();
        response.setData(movimientos);

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Movimientos listados exitosamente"));
    }

    @Override
    public ResponseEntity<MovimientoResponse> movimientosPost(MovimientoDTO movimiento) {
        Movimiento created = movimientoService.createMovimiento(mapper.toEntity(movimiento));

        MovimientoResponse response = new MovimientoResponse();
        response.setData(mapper.toDto(created));

        return new ResponseEntity<>(ResponseBuilder.buildSuccess(response, "Movimiento registrado exitosamente"),
                HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<MovimientoResponse> movimientosIdPut(Integer id, MovimientoDTO movimiento) {
        movimiento.setId(id);
        Movimiento updated = movimientoService.updateMovimiento(movimiento);

        MovimientoResponse response = new MovimientoResponse();
        response.setData(mapper.toDto(updated));

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Movimiento actualizado exitosamente"));
    }

    @Override
    public ResponseEntity<VoidResponse> movimientosIdDelete(Integer id) {
        com.banco.api.dto.DeleteDTO deleteDTO = new com.banco.api.dto.DeleteDTO(id);
        movimientoService.deleteMovimiento(deleteDTO);

        VoidResponse response = new VoidResponse();

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Movimiento eliminado exitosamente"));
    }
}
