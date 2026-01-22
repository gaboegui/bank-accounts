package com.banco.api.service;

import com.banco.api.entity.Cliente;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.ClienteRepository;
import com.banco.api.service.impl.ClienteServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClienteServiceImplTest {

    @Mock
    private ClienteRepository clienteRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private ClienteServiceImpl clienteService;

    @Test
    public void createCliente_Success() {
        Cliente c = new Cliente();
        c.setClienteId("C1");
        c.setIdentificacion("123");
        c.setContrasena("password123");

        when(clienteRepository.existsByClienteId("C1")).thenReturn(false);
        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedPassword");
        when(clienteRepository.save(any(Cliente.class))).thenReturn(c);

        Cliente created = clienteService.createCliente(c);
        assertNotNull(created);
        verify(clienteRepository).save(c);
        verify(passwordEncoder).encode("password123");
    }

    @Test
    public void createCliente_DuplicateId_ThrowsException() {
        Cliente c = new Cliente();
        c.setClienteId("C1");

        when(clienteRepository.existsByClienteId("C1")).thenReturn(true);

        assertThrows(BusinessException.class, () -> clienteService.createCliente(c));
    }

    @Test
    public void updateCliente_Success() {
        Cliente existing = new Cliente();
        existing.setId(1);
        existing.setNombre("Old Name");

        com.banco.api.dto.ClienteDTO updateInfo = new com.banco.api.dto.ClienteDTO();
        updateInfo.setId(1);
        updateInfo.setNombre("New Name");
        updateInfo.setContrasena("newPassword");

        when(clienteRepository.findById(1)).thenReturn(Optional.of(existing));
        when(passwordEncoder.encode(any(String.class))).thenReturn("encodedNewPassword");
        when(clienteRepository.save(existing)).thenReturn(existing);

        Cliente updated = clienteService.updateCliente(updateInfo);
        assertEquals("New Name", updated.getNombre());
    }
}
