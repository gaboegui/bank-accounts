package com.banco.api.controller;

import com.banco.api.dto.CuentaDTO;
import com.banco.api.entity.Cuenta;
import com.banco.api.mapper.CuentaMapper;
import com.banco.api.service.CuentaService;
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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CuentaController.class)
@AutoConfigureMockMvc(addFilters = false)
public class CuentaControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CuentaService cuentaService;

    @MockitoBean
    private CuentaMapper mapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getCuentas_ReturnsList() throws Exception {
        when(cuentaService.getAllCuentas()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/cuentas"))
                .andExpect(status().isOk());
    }

    @Test
    public void createCuenta_ReturnsCreated() throws Exception {
        CuentaDTO dto = new CuentaDTO();
        dto.setNumeroCuenta("123");

        Cuenta entity = new Cuenta();

        when(mapper.toEntity(any(CuentaDTO.class))).thenReturn(entity);
        when(cuentaService.createCuenta(any(Cuenta.class))).thenReturn(entity);
        when(mapper.toDto(any(Cuenta.class))).thenReturn(dto);

        mockMvc.perform(post("/cuentas")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }
}
