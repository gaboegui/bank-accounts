package com.banco.api.mapper;

import com.banco.api.dto.MovimientoDTO;
import com.banco.api.dto.ReporteDTO;
import com.banco.api.entity.Movimiento;
import com.banco.api.entity.Cuenta;
import org.springframework.stereotype.Component;
import java.time.format.DateTimeFormatter;

/**
 * Mapeador para convertir entre entidad Movimiento y MovimientoDTO/ReporteDTO.
 * Maneja el formateo de fechas y el cálculo de saldos para reportes.
 */
@Component
public class MovimientoMapper {

    public MovimientoDTO toDto(Movimiento entity) {
        if (entity == null)
            return null;
        MovimientoDTO dto = new MovimientoDTO();
        dto.setId(entity.getId());
        if (entity.getFecha() != null) {
            dto.setFecha(entity.getFecha().atZone(java.time.ZoneId.systemDefault()).toOffsetDateTime());
        }
        dto.setTipoMovimiento(entity.getTipoMovimiento());
        if (entity.getValor() != null)
            dto.setValor(entity.getValor());
        if (entity.getSaldo() != null)
            dto.setSaldo(entity.getSaldo());
        if (entity.getCuenta() != null) {
            dto.setCuentaId(entity.getCuenta().getId());
        }
        return dto;
    }

    public Movimiento toEntity(MovimientoDTO dto) {
        if (dto == null)
            return null;
        Movimiento entity = new Movimiento();
        entity.setId(dto.getId());
        if (dto.getFecha() != null) {
            entity.setFecha(dto.getFecha().toLocalDateTime());
        }
        entity.setTipoMovimiento(dto.getTipoMovimiento());
        if (dto.getValor() != null)
            entity.setValor(dto.getValor());
        if (dto.getCuentaId() != null) {
            Cuenta c = new Cuenta();
            c.setId(dto.getCuentaId());
            entity.setCuenta(c);
        }
        return entity;
    }

    public ReporteDTO toReporteDto(Movimiento m) {
        ReporteDTO dto = new ReporteDTO();
        dto.setFecha(m.getFecha().format(DateTimeFormatter.ISO_LOCAL_DATE));
        if (m.getCuenta() != null) {
            if (m.getCuenta().getCliente() != null) {
                dto.setCliente(m.getCuenta().getCliente().getNombre());
            }
            dto.setNumeroCuenta(m.getCuenta().getNumeroCuenta());
            dto.setTipo(m.getCuenta().getTipoCuenta());
            dto.setEstado(m.getCuenta().getEstado());
        }
        dto.setTransaccion(m.getValor());
        dto.setSaldoDisponible(m.getSaldo());
        // Calc Initial Balance: Available - Tx
        dto.setSaldoInicial(m.getSaldo().subtract(m.getValor()));
        return dto;
    }
}
