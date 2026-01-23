import type { ReactNode } from 'react';
import styles from './Table.module.css';

interface Column<T> {
    header: string;
    accessor: (item: T) => ReactNode;
    width?: string;
}

interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (item: T) => string | number;
    emptyMessage?: string;
}

/**
 * Componente de Tabla reutilizable para mostrar datos estructurados.
 * 
 * @template T - El tipo de elementos de datos que se muestran.
 * @param data - Array de elementos de datos para mostrar.
 * @param columns - Configuración para las columnas de la tabla.
 * @param keyExtractor - Función para derivar una clave única para cada fila.
 * @param emptyMessage - Mensaje para mostrar cuando los datos están vacíos.
 */
export function Table<T>({ data, columns, keyExtractor, emptyMessage = "No se encontraron registros" }: TableProps<T>) {
    if (!data || data.length === 0) {
        return <div className={styles.empty}>{emptyMessage}</div>;
    }

    return (
        <div className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} style={{ width: col.width }}>{col.header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={keyExtractor(item)}>
                            {columns.map((col, index) => (
                                <td key={index}>{col.accessor(item)}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
