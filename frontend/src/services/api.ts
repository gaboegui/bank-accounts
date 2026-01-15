import axios from 'axios';

/**
 * Instancia de Axios configurada para interacciones con la API.
 * Establece la URL base a partir de variables de entorno o por defecto a '/api'.
 */
export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de solicitud para registrar las peticiones salientes.
 */
api.interceptors.request.use(
    (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url, config.params);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuesta para manejar errores globales de la API.
 * Registra errores en la consola y rechaza la promesa.
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('Error de API:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);
