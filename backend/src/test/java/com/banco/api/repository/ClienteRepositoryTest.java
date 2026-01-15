package com.banco.api.repository;

import com.banco.api.entity.Cliente;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class ClienteRepositoryTest {

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    public void existsByClienteIdAndIdentificacion() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Test Client");
        cliente.setGenero("M");
        cliente.setEdad(30);
        cliente.setIdentificacion("123456789"); // Unique
        cliente.setDireccion("Test Address");
        cliente.setTelefono("12345");
        cliente.setClienteId("CLIENTE001");
        cliente.setContrasena("pass");
        cliente.setEstado(true);

        clienteRepository.save(cliente);

        assertTrue(clienteRepository.existsByClienteId("CLIENTE001"));
    }
}
