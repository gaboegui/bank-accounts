package com.banco.api.repository;

import com.banco.api.entity.Cliente;
import com.banco.api.entity.Cuenta;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class CuentaRepositoryTest {

    @Autowired
    private CuentaRepository cuentaRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    public void findByClienteId_and_ExistsByNumero() {
        Cliente cliente = new Cliente();
        cliente.setNombre("Test");
        cliente.setIdentificacion("987654321");
        cliente.setClienteId("C-999");
        cliente.setContrasena("123");
        cliente.setEstado(true);
        cliente = clienteRepository.save(cliente);

        Cuenta cuenta = new Cuenta();
        cuenta.setNumeroCuenta("445566");
        cuenta.setTipoCuenta("Ahorros");
        cuenta.setSaldoInicial(BigDecimal.valueOf(100));
        cuenta.setEstado(true);
        cuenta.setCliente(cliente);

        cuentaRepository.save(cuenta);

        assertTrue(cuentaRepository.existsByNumeroCuenta("445566"));

        List<Cuenta> cuentas = cuentaRepository.findByClienteId(cliente.getId());
        assertEquals(1, cuentas.size());
        assertEquals("445566", cuentas.get(0).getNumeroCuenta());
    }
}
