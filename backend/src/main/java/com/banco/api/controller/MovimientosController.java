package com.banco.api.controller;

import com.banco.api.dto.MovimientoDTO;
import com.banco.api.entity.Movimiento;
import com.banco.api.mapper.MovimientoMapper;
import com.banco.api.service.MovimientoService;
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
    public ResponseEntity<List<MovimientoDTO>> movimientosGet() {
        return ResponseEntity.ok(movimientoService.getAllMovimientos().stream()
                .map(mapper::toDto)
                .collect(Collectors.toList()));
    }

    @Override
    public ResponseEntity<MovimientoDTO> movimientosPost(MovimientoDTO movimiento) {
        Movimiento created = movimientoService.createMovimiento(mapper.toEntity(movimiento));
        return new ResponseEntity<>(mapper.toDto(created), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<MovimientoDTO> movimientosIdPut(Integer id, MovimientoDTO movimiento) {
        Movimiento updated = movimientoService.updateMovimiento(id, mapper.toEntity(movimiento));
        return ResponseEntity.ok(mapper.toDto(updated));
    }

    @Override
    public ResponseEntity<Void> movimientosIdDelete(Integer id) {
        movimientoService.deleteMovimiento(id);
        return ResponseEntity.noContent().build();
    }
}
