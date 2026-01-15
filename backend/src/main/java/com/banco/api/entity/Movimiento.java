package com.banco.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad que representa un movimiento financiero (transacción).
 */
@Entity
@Table(name = "movimientos")
@Data
public class Movimiento {

    /**
     * Identificador único de base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Fecha y hora de la transacción.
     */
    private LocalDateTime fecha;

    /**
     * Tipo de movimiento (ej. Retiro, Depósito).
     */
    @Column(name = "tipo_movimiento")
    private String tipoMovimiento;

    /**
     * Valor de la transacción. Positivo para depósitos, negativo (conceptualmente)
     * pero
     * almacenado como se da para retiros.
     */
    private BigDecimal valor;

    /**
     * Saldo calculado después de aplicar la transacción.
     */
    private BigDecimal saldo;

    /**
     * La cuenta asociada con este movimiento.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cuenta_id")
    private Cuenta cuenta;
}
