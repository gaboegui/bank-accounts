package com.banco.api.controller;

import com.banco.api.dto.ReporteDTO;
import com.banco.api.dto.ReporteListResponse;
import com.banco.api.entity.Movimiento;
import com.banco.api.mapper.MovimientoMapper;
import com.banco.api.service.ReporteService;
import com.banco.api.util.ResponseBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Controlador REST para Reportes.
 * Expone endpoints para generar estados de cuenta dentro de un rango de fechas.
 * Implementa la interfaz de API generada por OpenAPI.
 */
@RestController
@RequiredArgsConstructor
public class ReportesController implements ReportesControllerApi {

    private final ReporteService reporteService;
    private final MovimientoMapper mapper;

    @Override
    public ResponseEntity<ReporteListResponse> reportesGet(LocalDate fechaInicio, LocalDate fechaFin,
            Integer clienteId) {
        List<Movimiento> movimientos = reporteService.getMovimientosReporte(
                clienteId,
                fechaInicio.atStartOfDay(),
                fechaFin.atTime(23, 59, 59));

        List<ReporteDTO> reportes = movimientos.stream()
                .map(mapper::toReporteDto)
                .collect(Collectors.toList());

        ReporteListResponse response = new ReporteListResponse();
        response.setData(reportes);

        return ResponseEntity.ok(ResponseBuilder.buildSuccess(response, "Reporte generado exitosamente"));
    }
}
