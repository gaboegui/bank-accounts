package com.banco.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * Entidad que representa un cliente del banco.
 * Extiende {@link Persona} para heredar detalles personales.
 */
@Entity
@Table(name = "cliente")
@Data
@EqualsAndHashCode(callSuper = true)
public class Cliente extends Persona {

    /**
     * ID único del cliente asignado por el banco (clave de negocio).
     */
    @Column(name = "cliente_id", unique = true)
    private String clienteId;

    /**
     * Contraseña para autenticación.
     */
    private String contrasena;

    /**
     * Estado del cliente (true = activo, false = inactivo).
     */
    private Boolean estado;
}
