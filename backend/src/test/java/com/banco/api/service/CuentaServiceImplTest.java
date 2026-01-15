package com.banco.api.service;

import com.banco.api.entity.Cliente;
import com.banco.api.entity.Cuenta;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.ClienteRepository;
import com.banco.api.repository.CuentaRepository;
import com.banco.api.service.impl.CuentaServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class CuentaServiceImplTest {

    @Mock
    private CuentaRepository cuentaRepository;
    @Mock
    private ClienteRepository clienteRepository;

    @InjectMocks
    private CuentaServiceImpl cuentaService;

    @Test
    public void createCuenta_Success() {
        Cuenta c = new Cuenta();
        c.setNumeroCuenta("222");
        Cliente cliente = new Cliente();
        cliente.setId(10);
        c.setCliente(cliente);

        when(cuentaRepository.existsByNumeroCuenta("222")).thenReturn(false);
        when(clienteRepository.existsById(10)).thenReturn(true);
        when(cuentaRepository.save(any(Cuenta.class))).thenReturn(c);

        Cuenta created = cuentaService.createCuenta(c);
        assertNotNull(created);
    }

    @Test
    public void createCuenta_ClienteNotFound_ThrowsException() {
        Cuenta c = new Cuenta();
        c.setNumeroCuenta("222");
        Cliente cliente = new Cliente();
        cliente.setId(99);
        c.setCliente(cliente);

        when(cuentaRepository.existsByNumeroCuenta("222")).thenReturn(false);
        when(clienteRepository.existsById(99)).thenReturn(false);

        assertThrows(BusinessException.class, () -> cuentaService.createCuenta(c));
    }

    @Test
    public void createCuenta_DuplicateNumber_ThrowsException() {
        Cuenta c = new Cuenta();
        c.setNumeroCuenta("222");

        when(cuentaRepository.existsByNumeroCuenta("222")).thenReturn(true);

        assertThrows(BusinessException.class, () -> cuentaService.createCuenta(c));
    }
}
