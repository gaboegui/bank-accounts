import { useState, useId } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';
import type { Cliente } from '../../types';
import styles from '../../pages/Page.module.css';

interface ClienteFormProps {
    initialData?: Partial<Cliente>;
    onSubmit: (data: Cliente) => Promise<void>;
    onCancel: () => void;
}

/**
 * Componente de formulario para crear o editar clientes.
 * 
 * @param initialData - Datos iniciales para edición.
 * @param onSubmit - Función a ejecutar al enviar el formulario.
 * @param onCancel - Función a ejecutar al cancelar.
 */
export function ClienteForm({ initialData, onSubmit, onCancel }: ClienteFormProps) {
    const generoId = useId();
    const estadoId = useId();

    const [formData, setFormData] = useState<Partial<Cliente>>({
        nombre: '', genero: 'Masculino', edad: 0, identificacion: '', direccion: '', telefono: '', clienteId: '', contrasena: '', estado: true,
        ...initialData
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData as Cliente);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <Input label="Nombres" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
            <Input label="Identificación" required value={formData.identificacion} onChange={e => setFormData({ ...formData, identificacion: e.target.value })} />

            <div className={styles.formRow}>
                <Input label="Edad" type="number" required value={formData.edad} onChange={e => setFormData({ ...formData, edad: parseInt(e.target.value) })} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor={generoId} style={{ fontSize: '0.875rem', fontWeight: 500 }}>Género</label>
                    <select
                        id={generoId}
                        style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', height: '100%', minHeight: '38px' }}
                        value={formData.genero}
                        onChange={e => setFormData({ ...formData, genero: e.target.value })}
                        required
                    >
                        <option value="Masculino">Masculino</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Otro">Otro</option>
                    </select>
                </div>
            </div>

            <Input label="Dirección" required value={formData.direccion} onChange={e => setFormData({ ...formData, direccion: e.target.value })} />
            <Input label="Teléfono" required value={formData.telefono} onChange={e => setFormData({ ...formData, telefono: e.target.value })} />

            <div className={styles.formRow}>
                <div style={{ flex: 1 }}>
                    <Input label="Contraseña" type="password" required value={formData.contrasena} onChange={e => setFormData({ ...formData, contrasena: e.target.value })} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label htmlFor={estadoId} style={{ fontSize: '0.875rem', fontWeight: 500 }}>Estado</label>
                    <select
                        id={estadoId}
                        style={{ padding: '0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', height: '100%', minHeight: '38px' }}
                        value={formData.estado ? 'true' : 'false'}
                        onChange={e => setFormData({ ...formData, estado: e.target.value === 'true' })}
                    >
                        <option value="true">Activo</option>
                        <option value="false">Inactivo</option>
                    </select>
                </div>
            </div>

            <div className={styles.formActions}>
                <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
            </div>
        </form>
    );
}
