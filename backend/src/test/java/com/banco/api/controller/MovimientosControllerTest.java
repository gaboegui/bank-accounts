package com.banco.api.controller;

import com.banco.api.dto.MovimientoDTO;
import com.banco.api.entity.Movimiento;
import com.banco.api.mapper.MovimientoMapper;
import com.banco.api.service.MovimientoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MovimientosController.class)
@AutoConfigureMockMvc(addFilters = false)
public class MovimientosControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MovimientoService movimientoService;

    @MockitoBean
    private MovimientoMapper mapper;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void getMovimientos_ReturnsList() throws Exception {
        when(movimientoService.getAllMovimientos()).thenReturn(Collections.emptyList());
        mockMvc.perform(get("/movimientos"))
                .andExpect(status().isOk());
    }

    @Test
    public void createMovimiento_ReturnsCreated() throws Exception {
        MovimientoDTO dto = new MovimientoDTO();
        dto.setValor(BigDecimal.TEN);

        Movimiento entity = new Movimiento();

        when(mapper.toEntity(any(MovimientoDTO.class))).thenReturn(entity);
        when(movimientoService.createMovimiento(any(Movimiento.class))).thenReturn(entity);
        when(mapper.toDto(any(Movimiento.class))).thenReturn(dto);

        mockMvc.perform(post("/movimientos")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isCreated());
    }
}
