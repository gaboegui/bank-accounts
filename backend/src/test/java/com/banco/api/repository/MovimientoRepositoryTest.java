package com.banco.api.repository;

import com.banco.api.entity.Cliente;
import com.banco.api.entity.Cuenta;
import com.banco.api.entity.Movimiento;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
public class MovimientoRepositoryTest {

    @Autowired
    private MovimientoRepository movimientoRepository;
    @Autowired
    private CuentaRepository cuentaRepository;
    @Autowired
    private ClienteRepository clienteRepository;

    @Test
    public void findByClienteAndFecha() {
        Cliente c = new Cliente();
        c.setIdentificacion("111");
        c.setClienteId("C1");
        c.setContrasena("p");
        c.setEstado(true);
        c = clienteRepository.save(c);

        Cuenta acc = new Cuenta();
        acc.setNumeroCuenta("001");
        acc.setTipoCuenta("A");
        acc.setSaldoInicial(BigDecimal.ZERO);
        acc.setEstado(true);
        acc.setCliente(c);
        acc = cuentaRepository.save(acc);

        Movimiento m1 = new Movimiento();
        m1.setFecha(LocalDateTime.now().minusDays(1));
        m1.setTipoMovimiento("Debito");
        m1.setValor(BigDecimal.TEN);
        m1.setSaldo(BigDecimal.TEN);
        m1.setCuenta(acc);
        movimientoRepository.save(m1);

        List<Movimiento> found = movimientoRepository.findByClienteAndFecha(
                c.getId(),
                LocalDateTime.now().minusDays(2),
                LocalDateTime.now());

        assertEquals(1, found.size());
    }
}
