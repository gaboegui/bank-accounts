import { useState, useEffect } from 'react';

/**
 * Hook personalizado para debouncing de un valor.
 * Útil para retrasar la ejecución de un efecto secundario (como una búsqueda en API) hasta que el usuario deja de escribir.
 * 
 * @template T - El tipo del valor a debouncar.
 * @param value - El valor a debouncar.
 * @param delay - El retraso en milisegundos antes de actualizar el valor debouncado.
 * @returns El valor debouncado.
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
