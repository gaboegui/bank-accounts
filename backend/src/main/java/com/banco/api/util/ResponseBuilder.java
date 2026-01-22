package com.banco.api.util;

import com.banco.api.dto.BaseResponse;
import java.time.OffsetDateTime;
import java.util.UUID;

public class ResponseBuilder {

    private static void setCommonFields(Object response, String message, String codigoMensaje) {
        try {
            response.getClass().getMethod("setId", UUID.class).invoke(response, UUID.randomUUID());
            response.getClass().getMethod("setCodigoMensaje", String.class).invoke(response, codigoMensaje);
            response.getClass().getMethod("setMensaje", String.class).invoke(response, message);
            response.getClass().getMethod("setFecha", OffsetDateTime.class).invoke(response, OffsetDateTime.now());
        } catch (Exception e) {
            throw new RuntimeException("Error building response", e);
        }
    }

    public static <T> T buildSuccess(T response, String message) {
        setCommonFields(response, message, "00");
        return response;
    }
}
