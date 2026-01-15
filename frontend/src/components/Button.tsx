import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Componente de Botón reutilizable con diferentes variantes y tamaños.
 * 
 * @param variant - Variante de estilo visual ('primary', 'secondary', 'danger', 'outline').
 * @param size - Tamaño del botón ('sm', 'md', 'lg').
 * @param className - Clase CSS opcional para estilo adicional.
 * @param children - Contenido del botón.
 * @param props - Atributos estándar de botón HTML.
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
