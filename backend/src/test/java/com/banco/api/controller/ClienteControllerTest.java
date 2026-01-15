package com.banco.api.controller;

import com.banco.api.dto.ClienteDTO;
import com.banco.api.entity.Cliente;
import com.banco.api.mapper.ClienteMapper;
import com.banco.api.service.ClienteService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClienteController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ClienteControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ClienteService clienteService;

    @MockitoBean
    private ClienteMapper mapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getClientes_ReturnsList() throws Exception {
        when(clienteService.getAllClientes()).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/clientes"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    public void createCliente_ReturnsCreated() throws Exception {
        ClienteDTO dto = new ClienteDTO();
        dto.setNombre("Test");

        Cliente entity = new Cliente();
        entity.setNombre("Test");

        when(mapper.toEntity(any(ClienteDTO.class))).thenReturn(entity);
        when(clienteService.createCliente(any(Cliente.class))).thenReturn(entity);
        when(mapper.toDto(any(Cliente.class))).thenReturn(dto);

        mockMvc.perform(post("/clientes")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }
}
