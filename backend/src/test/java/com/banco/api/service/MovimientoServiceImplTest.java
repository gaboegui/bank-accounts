package com.banco.api.service;

import com.banco.api.entity.Cuenta;
import com.banco.api.entity.Movimiento;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.CuentaRepository;
import com.banco.api.repository.MovimientoRepository;
import com.banco.api.service.impl.MovimientoServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class MovimientoServiceImplTest {

    @Mock
    private MovimientoRepository movimientoRepository;
    @Mock
    private CuentaRepository cuentaRepository;

    @InjectMocks
    private MovimientoServiceImpl movimientoService;

    @Test
    public void createMovimiento_Credito_Success() {
        Cuenta cuenta = new Cuenta();
        cuenta.setId(1);
        cuenta.setSaldoInicial(BigDecimal.ZERO);

        Movimiento mov = new Movimiento();
        mov.setValor(BigDecimal.valueOf(100));
        mov.setCuenta(cuenta);

        when(cuentaRepository.findById(1)).thenReturn(Optional.of(cuenta));
        when(movimientoRepository.save(any(Movimiento.class))).thenAnswer(i -> i.getArguments()[0]);

        Movimiento created = movimientoService.createMovimiento(mov);

        assertEquals(BigDecimal.valueOf(100), created.getSaldo());
        assertEquals(BigDecimal.valueOf(100), cuenta.getSaldoInicial());
        verify(cuentaRepository).save(cuenta);
    }

    @Test
    public void createMovimiento_Debito_InsufficientFunds() {
        Cuenta cuenta = new Cuenta();
        cuenta.setId(1);
        cuenta.setSaldoInicial(BigDecimal.valueOf(50));

        Movimiento mov = new Movimiento();
        mov.setValor(BigDecimal.valueOf(-100));
        mov.setCuenta(cuenta);

        when(cuentaRepository.findById(1)).thenReturn(Optional.of(cuenta));

        BusinessException ex = assertThrows(BusinessException.class, () -> movimientoService.createMovimiento(mov));
        assertEquals("Saldo no disponible", ex.getMessage());

        verify(cuentaRepository, never()).save(any());
    }
}
