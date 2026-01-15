package com.banco.api.mapper;

import com.banco.api.dto.CuentaDTO;
import com.banco.api.entity.Cuenta;
import com.banco.api.entity.Cliente;
import org.springframework.stereotype.Component;

/**
 * Mapeador para convertir entre entidad Cuenta y CuentaDTO.
 */
@Component
public class CuentaMapper {

    public CuentaDTO toDto(Cuenta entity) {
        if (entity == null)
            return null;
        CuentaDTO dto = new CuentaDTO();
        dto.setId(entity.getId());
        dto.setNumeroCuenta(entity.getNumeroCuenta());
        dto.setTipoCuenta(entity.getTipoCuenta());
        dto.setSaldoInicial(entity.getSaldoInicial());
        dto.setEstado(entity.getEstado());
        if (entity.getCliente() != null) {
            dto.setClienteId(entity.getCliente().getId());
        }
        return dto;
    }

    public Cuenta toEntity(CuentaDTO dto) {
        if (dto == null)
            return null;
        Cuenta entity = new Cuenta();
        entity.setId(dto.getId());
        entity.setNumeroCuenta(dto.getNumeroCuenta());
        entity.setTipoCuenta(dto.getTipoCuenta());
        if (dto.getSaldoInicial() != null) {
            entity.setSaldoInicial(dto.getSaldoInicial());
        }
        entity.setEstado(dto.getEstado());
        if (dto.getClienteId() != null) {
            Cliente c = new Cliente();
            c.setId(dto.getClienteId());
            entity.setCliente(c);
        }
        return entity;
    }
}
