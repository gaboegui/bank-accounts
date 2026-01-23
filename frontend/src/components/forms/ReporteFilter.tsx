import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { getClientes } from '../../services/clienteService';
import type { Cliente } from '../../types';
import styles from '../../pages/Page.module.css';

interface ReporteFilterProps {
    onFilter: (fechaInicio: string, fechaFin: string, clienteId: string) => void;
    loading: boolean;
}

/**
 * Componente de filtro para el reporte de estados de cuenta.
 * 
 * @param onFilter - Función a ejecutar al aplicar el filtro.
 * @param loading - Estado de carga.
 */
export function ReporteFilter({ onFilter, loading }: ReporteFilterProps) {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [clienteId, setClienteId] = useState('');
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchClientes();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (fechaInicio && fechaFin && clienteId) {
            onFilter(fechaInicio, fechaFin, clienteId);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchContainer} style={{ alignItems: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
            <Input
                label="Fecha Inicio"
                type="date"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
            />
            <Input
                label="Fecha Fin"
                type="date"
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                required
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cliente</label>
                <select
                    style={{ padding: '0.625rem', border: '1px solid var(--color-border)', borderRadius: '4px', minWidth: '200px' }}
                    value={clienteId}
                    onChange={e => setClienteId(e.target.value)}
                    required
                >
                    <option value="" disabled>Seleccione un cliente</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre} ({c.identificacion})</option>
                    ))}
                </select>
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Buscando...' : 'Buscar'}
            </Button>
        </form>
    );
}
