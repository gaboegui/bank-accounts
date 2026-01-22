package com.banco.api.service.impl;

import com.banco.api.entity.Cuenta;
import com.banco.api.entity.Movimiento;
import com.banco.api.dto.MovimientoDTO;
import com.banco.api.dto.DeleteDTO;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.CuentaRepository;
import com.banco.api.repository.MovimientoRepository;
import com.banco.api.service.MovimientoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

/**
 * Implementación de la interfaz {@link MovimientoService}.
 * Maneja el procesamiento de transacciones, actualizaciones de saldo y asegura
 * la consistencia de datos
 * con @Transactional.
 */
@Service
@RequiredArgsConstructor
public class MovimientoServiceImpl implements MovimientoService {

    private final MovimientoRepository movimientoRepository;
    private final CuentaRepository cuentaRepository;

    @Override
    @Transactional
    public Movimiento createMovimiento(Movimiento movimiento) {
        if (movimiento.getCuenta() == null || movimiento.getCuenta().getId() == null) {
            throw new BusinessException("Cuenta es requerida");
        }
        Cuenta cuenta = cuentaRepository.findById(movimiento.getCuenta().getId())
                .orElseThrow(() -> new BusinessException("Cuenta no encontrada"));

        BigDecimal saldoActual = cuenta.getSaldoInicial();

        BigDecimal valorMovimiento = movimiento.getValor();
        BigDecimal nuevoSaldo = saldoActual.add(valorMovimiento);

        if (nuevoSaldo.compareTo(BigDecimal.ZERO) < 0) {
            throw new BusinessException("Saldo no disponible");
        }

        cuenta.setSaldoInicial(nuevoSaldo);
        cuentaRepository.save(cuenta);

        movimiento.setSaldo(nuevoSaldo);
        movimiento.setFecha(LocalDateTime.now());
        movimiento.setCuenta(cuenta);

        return movimientoRepository.save(movimiento);
    }

    @Override
    public Movimiento updateMovimiento(MovimientoDTO movimientoDTO) {
        throw new BusinessException("Actualización de movimientos no permitida por seguridad");
    }

    @Override
    public void deleteMovimiento(DeleteDTO deleteDTO) {
        Integer id = deleteDTO.getId();
        Movimiento m = movimientoRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Movimiento no encontrado"));
        // Reverse balance
        Cuenta c = m.getCuenta();
        BigDecimal valor = m.getValor();
        c.setSaldoInicial(c.getSaldoInicial().subtract(valor));
        cuentaRepository.save(c);
        movimientoRepository.delete(m);
    }

    @Override
    public List<Movimiento> getAllMovimientos() {
        return movimientoRepository.findAll();
    }
}
