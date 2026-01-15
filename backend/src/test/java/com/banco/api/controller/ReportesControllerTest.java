package com.banco.api.controller;

import com.banco.api.mapper.MovimientoMapper;
import com.banco.api.service.ReporteService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ReportesController.class)
@AutoConfigureMockMvc(addFilters = false)
public class ReportesControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ReporteService reporteService;

    @MockitoBean
    private MovimientoMapper mapper;

    @Test
    public void getReportes_ReturnsList() throws Exception {
        when(reporteService.getMovimientosReporte(any(), any(), any())).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/reportes")
                .param("fechaInicio", "2024-01-01")
                .param("fechaFin", "2024-01-31")
                .param("clienteId", "1"))
                .andExpect(status().isOk());
    }
}
