package com.banco.api.service.impl;

import com.banco.api.entity.Movimiento;
import com.banco.api.repository.MovimientoRepository;
import com.banco.api.service.ReporteService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Implementación de la interfaz {@link ReporteService}.
 * Delega la recuperación de datos a los repositorios para generar datos de
 * reporte.
 */
@Service
@RequiredArgsConstructor
public class ReporteServiceImpl implements ReporteService {

    private final MovimientoRepository movimientoRepository;

    @Override
    public List<Movimiento> getMovimientosReporte(Integer clienteId, LocalDateTime start, LocalDateTime end) {
        return movimientoRepository.findByClienteAndFecha(clienteId, start, end);
    }
}
