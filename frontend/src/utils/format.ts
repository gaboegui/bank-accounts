/**
 * Convierte una fecha a formato ISO (YYYY-MM-DD) para enviar al backend.
 * @param dateString - La cadena de fecha a formatear.
 * @returns Una cadena en formato YYYY-MM-DD.
 */
export const toISODateString = (dateString: string): string => {
    if (!dateString) return '';
    // Si ya está en formato YYYY-MM-DD, devolverlo tal cual
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }
    // Si está en otro formato, convertir a Date y luego a ISO
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * Formatea un número como una cadena de moneda (USD/Ecuador).
 * @param value - El valor numérico a formatear.
 * @returns Una cadena formateada (ej. "$1,234.56").
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-EC', {
        style: 'currency',
        currency: 'USD',
    }).format(value);
};

/**
 * Formatea una cadena de fecha ISO a una cadena de fecha localizada (Ecuador).
 * @param dateString - La cadena de fecha ISO a formatear.
 * @returns Una cadena de fecha formateada (ej. "31/12/2023").
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        console.warn('Invalid date string passed to formatDate:', dateString);
        return dateString; // Devolver la cadena original si no se puede parsear
    }
    return new Intl.DateTimeFormat('es-EC').format(date);
};
