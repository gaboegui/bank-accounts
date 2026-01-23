import { useState, useEffect } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import { getClientes } from '../../services/clienteService';
import type { Cuenta, Cliente } from '../../types';
import styles from '../../pages/Page.module.css';

interface CuentaFormProps {
    initialData?: Partial<Cuenta>;
    onSubmit: (data: Cuenta) => Promise<void>;
    onCancel: () => void;
}

/**
 * Componente de formulario para crear o editar cuentas.
 * 
 * @param initialData - Datos iniciales para edición.
 * @param onSubmit - Función a ejecutar al enviar el formulario.
 * @param onCancel - Función a ejecutar al cancelar.
 */
export function CuentaForm({ initialData, onSubmit, onCancel }: CuentaFormProps) {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [formData, setFormData] = useState<Partial<Cuenta>>({
        numeroCuenta: '', tipoCuenta: 'Ahorros', saldoInicial: 0, estado: true, clienteId: 0,
        ...initialData
    });

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const data = await getClientes();
                setClientes(data);
                // If no clienteId is set, default to first one
                if (!formData.clienteId && !initialData?.clienteId && data.length > 0) {
                    setFormData(prev => ({ ...prev, clienteId: data[0].id }));
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchClientes();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData as Cuenta);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Cliente</label>
                <select
                    style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                    value={formData.clienteId}
                    onChange={e => setFormData({ ...formData, clienteId: parseInt(e.target.value) })}
                    required
                >
                    <option value={0} disabled>Seleccione un cliente</option>
                    {clientes.map(c => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                    ))}
                </select>
            </div>

            <Input label="Número Cuenta" required value={formData.numeroCuenta} onChange={e => setFormData({ ...formData, numeroCuenta: e.target.value })} />

            <div className={styles.formRow}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Tipo Cuenta</label>
                    <select
                        style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', width: '100%' }}
                        value={formData.tipoCuenta}
                        onChange={e => setFormData({ ...formData, tipoCuenta: e.target.value })}
                    >
                        <option value="Ahorros">Ahorros</option>
                        <option value="Corriente">Corriente</option>
                    </select>
                </div>
                <Input label="Saldo Inicial" type="number" step="0.01" required value={formData.saldoInicial} onChange={e => setFormData({ ...formData, saldoInicial: parseFloat(e.target.value) })} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Estado</label>
                <select
                    style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px' }}
                    value={formData.estado ? 'true' : 'false'}
                    onChange={e => setFormData({ ...formData, estado: e.target.value === 'true' })}
                >
                    <option value="true">Activo</option>
                    <option value="false">Inactivo</option>
                </select>
            </div>

            <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
}
