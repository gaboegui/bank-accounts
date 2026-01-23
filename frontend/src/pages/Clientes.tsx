import { useState } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { useDebounce } from '../hooks/useDebounce';
import { useClientes } from '../hooks/useClientes';
import { ClienteForm } from '../components/forms/ClienteForm';
import type { Cliente } from '../types';
import styles from './Page.module.css';

/**
 * Página principal para la gestión de Clientes.
 * Permite listar, buscar, crear, editar y eliminar clientes.
 */
export function Clientes() {
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const { clientes, error, addCliente, editCliente, removeCliente } = useClientes(debouncedSearch);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCliente, setEditingCliente] = useState<Cliente | undefined>(undefined);

    const handleOpenModal = (cliente?: Cliente) => {
        setEditingCliente(cliente);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Cliente) => {
        let success = false;
        if (editingCliente && editingCliente.id) {
            success = await editCliente(editingCliente.id, data);
        } else {
            success = await addCliente(data);
        }

        if (success) {
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este cliente?')) {
            await removeCliente(id);
        }
    }

    const columns = [
        { header: 'Nombres', accessor: (c: Cliente) => c.nombre },
        { header: 'Identificación', accessor: (c: Cliente) => c.identificacion },
        { header: 'Dirección', accessor: (c: Cliente) => c.direccion },
        { header: 'Teléfono', accessor: (c: Cliente) => c.telefono },
        { header: 'Estado', accessor: (c: Cliente) => c.estado ? 'True' : 'False' },
        {
            header: 'Acciones',
            accessor: (c: Cliente) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button size="sm" variant="outline" onClick={() => handleOpenModal(c)}><Pencil size={16} /></Button>
                    <Button size="sm" variant="danger" onClick={() => c.id && handleDelete(c.id)}><Trash2 size={16} /></Button>
                </div>
            )
        },
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Clientes</h2>
                <div className={styles.actions}>
                    <div className={styles.searchContainer}>
                        <Input
                            placeholder="Buscar..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <Button onClick={() => handleOpenModal()}>
                        <Plus size={20} style={{ marginRight: '8px' }} /> Nuevo
                    </Button>
                </div>
            </div>

            {error && (
                <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.375rem', border: '1px solid #fecaca' }}>
                    {error}
                </div>
            )}

            <Table<Cliente>
                data={clientes}
                columns={columns}
                keyExtractor={(c) => c.id || c.identificacion}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
            >
                <ClienteForm
                    initialData={editingCliente}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div>
    );
}
