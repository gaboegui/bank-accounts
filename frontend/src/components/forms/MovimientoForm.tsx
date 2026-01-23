import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { getCuentas } from '../../services/cuentaService';
import type { Movimiento, Cuenta } from '../../types';
import { formatCurrency } from '../../utils/format';
import styles from '../../pages/Page.module.css';

interface MovimientoFormProps {
    initialData?: Partial<Movimiento>;
    onSubmit: (data: Movimiento) => Promise<void>;
    onCancel: () => void;
    error?: string | null;
}

/**
 * Componente de formulario para registrar movimientos (depósitos/retiros).
 * 
 * @param initialData - Datos iniciales para edición.
 * @param onSubmit - Función a ejecutar al enviar el formulario.
 * @param onCancel - Función a ejecutar al cancelar.
 * @param error - Mensaje de error a mostrar (opcional).
 */
export function MovimientoForm({ initialData, onSubmit, onCancel, error }: MovimientoFormProps) {
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
    const [cuentaId, setCuentaId] = useState<number>(initialData?.cuentaId || 0);
    const [tipoMovimiento, setTipoMovimiento] = useState<'Deposito' | 'Retiro'>((initialData?.tipoMovimiento as 'Deposito' | 'Retiro') || 'Deposito');
    const [valor, setValor] = useState<number>(Math.abs(initialData?.valor || 0));

    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const data = await getCuentas();
                setCuentas(data);
                if (!cuentaId && !initialData?.cuentaId && data.length > 0) {
                    setCuentaId(data[0].id || 0);
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchCuentas();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const finalValor = tipoMovimiento === 'Retiro' ? -Math.abs(valor) : Math.abs(valor);

        const movimiento: Movimiento = {
            ...initialData,
            cuentaId,
            tipoMovimiento,
            valor: finalValor,
            fecha: initialData?.fecha || new Date().toISOString()
        };
        await onSubmit(movimiento);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
                <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '0.75rem', borderRadius: '4px', border: '1px solid #fecaca', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    {error}
                </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cuenta</label>
                <select
                    style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                    value={cuentaId}
                    onChange={e => setCuentaId(parseInt(e.target.value))}
                    required
                >
                    <option value={0} disabled>Seleccione una cuenta</option>
                    {cuentas.map(c => (
                        <option key={c.id} value={c.id}>{c.numeroCuenta} - {formatCurrency(c.saldoInicial)}</option>
                    ))}
                </select>
            </div>

            <div className={styles.formRow}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tipo</label>
                    <select
                        style={{ padding: '0.625rem', border: '1px solid var(--color-border)', borderRadius: '4px', width: '100%' }}
                        value={tipoMovimiento}
                        onChange={e => setTipoMovimiento(e.target.value as any)}
                    >
                        <option value="Deposito">Depósito</option>
                        <option value="Retiro">Retiro</option>
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <Input label="Valor" type="number" step="0.01" min="0.01" required value={valor} onChange={e => setValor(parseFloat(e.target.value))} />
                </div>
            </div>

            <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
}
