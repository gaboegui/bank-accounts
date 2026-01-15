package com.banco.api.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

/**
 * Entidad que representa una cuenta bancaria.
 */
@Entity
@Table(name = "cuenta")
@Data
public class Cuenta {

    /**
     * Identificador único de base de datos.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Número de cuenta único.
     */
    @Column(name = "numero_cuenta", unique = true)
    private String numeroCuenta;

    /**
     * Tipo de cuenta (ej. Ahorros, Corriente).
     */
    @Column(name = "tipo_cuenta")
    private String tipoCuenta;

    /**
     * Saldo inicial cuando se creó la cuenta.
     */
    @Column(name = "saldo_inicial")
    private BigDecimal saldoInicial;

    /**
     * Estado de la cuenta (true = activa, false = inactiva).
     */
    private Boolean estado;

    /**
     * El cliente propietario de esta cuenta.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    /**
     * Lista de movimientos asociados con esta cuenta.
     */
    @OneToMany(mappedBy = "cuenta", cascade = CascadeType.ALL)
    private List<Movimiento> movimientos;
}
