import { useId } from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

/**
 * Componente de Input reutilizable con manejo de errores y características de accesibilidad.
 * Asocia automáticamente la etiqueta con el input usando un ID único.
 * 
 * @param label - Texto de etiqueta opcional para el input.
 * @param error - Mensaje de error opcional para mostrar debajo del input.
 * @param className - Clase CSS opcional para estilo adicional.
 * @param props - Atributos estándar de Input HTML.
 */
export function Input({ label, error, className = '', ...props }: InputProps) {
    const id = useId();
    const inputId = props.id || id;

    return (
        <div className={styles.container}>
            {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
            <input
                id={inputId}
                className={`${styles.input} ${error ? styles.hasError : ''} ${className}`}
                {...props}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
}
