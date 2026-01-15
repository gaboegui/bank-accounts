package com.banco.api.service;

import com.banco.api.repository.MovimientoRepository;
import com.banco.api.service.impl.ReporteServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class ReporteServiceImplTest {

    @Mock
    private MovimientoRepository movimientoRepository;

    @InjectMocks
    private ReporteServiceImpl reporteService;

    @Test
    public void getMovimientosReporte_CallsRepository() {
        LocalDateTime now = LocalDateTime.now();
        reporteService.getMovimientosReporte(1, now, now);
        verify(movimientoRepository).findByClienteAndFecha(eq(1), any(), any());
    }
}
