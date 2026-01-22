package com.banco.api.service.impl;

import com.banco.api.entity.Cuenta;
import com.banco.api.dto.CuentaDTO;
import com.banco.api.dto.DeleteDTO;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.ClienteRepository;
import com.banco.api.repository.CuentaRepository;
import com.banco.api.service.CuentaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de la interfaz {@link CuentaService}.
 * Maneja la creación, actualización y eliminación de cuentas, incluyendo la
 * validación de
 * números de cuenta únicos y la existencia del cliente.
 */
@Service
@RequiredArgsConstructor
public class CuentaServiceImpl implements CuentaService {

    private final CuentaRepository cuentaRepository;
    private final ClienteRepository clienteRepository;

    @Override
    public Cuenta createCuenta(Cuenta cuenta) {
        if (cuentaRepository.existsByNumeroCuenta(cuenta.getNumeroCuenta())) {
            throw new BusinessException("Número de cuenta ya existe");
        }
        if (cuenta.getCliente() != null && cuenta.getCliente().getId() != null) {
            if (!clienteRepository.existsById(cuenta.getCliente().getId())) {
                throw new BusinessException("Cliente no encontrado: " + cuenta.getCliente().getId());
            }
        }
        return cuentaRepository.save(cuenta);
    }

    @Override
    public Cuenta updateCuenta(CuentaDTO cuentaDTO) {
        Integer id = cuentaDTO.getId();
        Cuenta existing = cuentaRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Cuenta no encontrada"));
        existing.setTipoCuenta(cuentaDTO.getTipoCuenta());
        existing.setSaldoInicial(cuentaDTO.getSaldoInicial());
        existing.setEstado(cuentaDTO.getEstado());
        return cuentaRepository.save(existing);
    }

    @Override
    public void deleteCuenta(DeleteDTO deleteDTO) {
        Integer id = deleteDTO.getId();
        if (!cuentaRepository.existsById(id)) {
            throw new BusinessException("Cuenta no encontrada");
        }
        cuentaRepository.deleteById(id);
    }

    @Override
    public List<Cuenta> getAllCuentas() {
        return cuentaRepository.findAll();
    }
}
