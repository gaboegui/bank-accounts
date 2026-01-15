package com.banco.api.entity;

import jakarta.persistence.*;
import lombok.Data;

/**
 * Entidad que representa una persona genérica.
 * Uso: Clase base para tipos específicos de personas como Cliente.
 * Estrategia: InheritanceType.JOINED asegura un esquema de base de datos
 * normalizado.
 */
@Entity
@Table(name = "persona")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
public class Persona {

    /**
     * Identificador único para la persona.
     * Generado automáticamente.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    /**
     * Nombre completo de la persona.
     */
    private String nombre;

    /**
     * Género de la persona.
     */
    private String genero;

    /**
     * Edad de la persona.
     */
    private Integer edad;

    /**
     * Número de identificación único (ej. DNI, pasaporte).
     */
    @Column(unique = true)
    private String identificacion;

    /**
     * Dirección física.
     */
    private String direccion;

    /**
     * Número de teléfono de contacto.
     */
    private String telefono;
}
