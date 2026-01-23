import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { useCuentas } from '../hooks/useCuentas';
import { CuentaForm } from '../components/forms/CuentaForm';
import { getClientes } from '../services/clienteService';
import type { Cuenta, Cliente } from '../types';
import { formatCurrency } from '../utils/format';
import styles from './Page.module.css';

/**
 * Página principal para la gestión de Cuentas.
 * Permite listar, crear, editar y eliminar cuentas bancarias.
 */
export function Cuentas() {
    const { cuentas, error, addCuenta, editCuenta, removeCuenta } = useCuentas();
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCuenta, setEditingCuenta] = useState<Cuenta | undefined>(undefined);

    useEffect(() => {
        // Se necesitan clientes para renderizar los nombres en la tabla
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

    // Auxiliar para encontrar el nombre del cliente
    const getClienteName = (id?: number) => {
        if (!id) return 'N/A';
        return clientes.find(c => c.id === id)?.nombre || 'Desconocido';
    };

    const handleOpenModal = (cuenta?: Cuenta) => {
        setEditingCuenta(cuenta);
        setIsModalOpen(true);
    };

    const handleSubmit = async (data: Cuenta) => {
        let success = false;
        if (editingCuenta && editingCuenta.id) {
            success = await editCuenta(editingCuenta.id, data);
        } else {
            success = await addCuenta(data);
        }

        if (success) {
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar esta cuenta?')) {
            await removeCuenta(id);
        }
    }

    const columns = [
        { header: 'Número Cuenta', accessor: (c: Cuenta) => c.numeroCuenta },
        { header: 'Tipo', accessor: (c: Cuenta) => c.tipoCuenta },
        { header: 'Saldo Inicial', accessor: (c: Cuenta) => formatCurrency(c.saldoInicial) },
        { header: 'Estado', accessor: (c: Cuenta) => c.estado ? 'True' : 'False' },
        { header: 'Cliente', accessor: (c: Cuenta) => getClienteName(c.clienteId) },
        {
            header: 'Acciones',
            accessor: (c: Cuenta) => (
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
                <h2 className={styles.title}>Cuentas</h2>
                <Button onClick={() => handleOpenModal()}>
                    <Plus size={20} style={{ marginRight: '8px' }} /> Nueva Cuenta
                </Button>
            </div>

            {error && (
                <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee2e2', color: '#991b1b', borderRadius: '0.375rem', border: '1px solid #fecaca' }}>
                    {error}
                </div>
            )}

            <Table<Cuenta>
                data={cuentas}
                columns={columns}
                keyExtractor={(c) => c.id || c.numeroCuenta}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingCuenta ? 'Editar Cuenta' : 'Nueva Cuenta'}
            >
                <CuentaForm
                    initialData={editingCuenta}
                    onSubmit={handleSubmit}
                    onCancel={() => setIsModalOpen(false)}
                />
            </Modal>
        </div >
    );
}
