package com.banco.api.service.impl;

import com.banco.api.entity.Cliente;
import com.banco.api.exception.BusinessException;
import com.banco.api.repository.ClienteRepository;
import com.banco.api.service.ClienteService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementación de la interfaz {@link ClienteService}.
 * Maneja la lógica de negocio para la gestión de clientes, incluyendo
 * validaciones y
 * persistencia de datos.
 */
@Service
@RequiredArgsConstructor
public class ClienteServiceImpl implements ClienteService {

    private final ClienteRepository clienteRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Cliente createCliente(Cliente cliente) {
        if (clienteRepository.existsByClienteId(cliente.getClienteId())) {
            throw new BusinessException("Cliente ID ya existe");
        }
        if (clienteRepository.findAll().stream()
                .anyMatch(c -> c.getIdentificacion().equals(cliente.getIdentificacion()))) {
            throw new BusinessException("Identificación ya existe");
        }
        // Hash password
        cliente.setContrasena(passwordEncoder.encode(cliente.getContrasena()));
        return clienteRepository.save(cliente);
    }

    @Override
    public Cliente updateCliente(Integer id, Cliente cliente) {
        Cliente existing = clienteRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Cliente no encontrado"));
        existing.setNombre(cliente.getNombre());
        existing.setGenero(cliente.getGenero());
        existing.setEdad(cliente.getEdad());
        existing.setIdentificacion(cliente.getIdentificacion());
        existing.setDireccion(cliente.getDireccion());
        existing.setTelefono(cliente.getTelefono());
        // Hash password antes de actualizar si fue cambiado
        if (cliente.getContrasena() != null && !cliente.getContrasena().isEmpty()) {
            existing.setContrasena(passwordEncoder.encode(cliente.getContrasena()));
        }
        existing.setEstado(cliente.getEstado());
        return clienteRepository.save(existing);
    }

    @Override
    public void deleteCliente(Integer id) {
        if (!clienteRepository.existsById(id)) {
            throw new BusinessException("Cliente no encontrado");
        }
        clienteRepository.deleteById(id);
    }

    @Override
    public List<Cliente> getAllClientes() {
        return clienteRepository.findAll();
    }
}
