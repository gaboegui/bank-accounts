import { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { Modal } from '../components/Modal';
import { useMovimientos } from '../hooks/useMovimientos';
import { MovimientoForm } from '../components/forms/MovimientoForm';
import { getCuentas } from '../services/cuentaService';
import type { Movimiento, Cuenta } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import styles from './Page.module.css';

/**
 * Página principal para la gestión de Movimientos.
 * Permite listar y registrar nuevos movimientos (depósitos/retiros).
 */
export function Movimientos() {
    const { movimientos, addMovimiento, removeMovimiento, error, clearError } = useMovimientos();
    const [cuentas, setCuentas] = useState<Cuenta[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCuentas = async () => {
            try {
                const data = await getCuentas();
                setCuentas(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchCuentas();
    }, []);

    const getCuentaNumero = (id?: number) => {
        return cuentas.find(c => c.id === id)?.numeroCuenta || 'N/A';
    }

    const handleOpenModal = () => {
        clearError();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        clearError();
    }

    const handleSubmit = async (data: Movimiento) => {
        const success = await addMovimiento(data);
        if (success) {
            setIsModalOpen(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (window.confirm('¿Está seguro de eliminar este movimiento? Esto revertirá el saldo.')) {
            await removeMovimiento(id);
        }
    }

    const columns = [
        { header: 'Fecha', accessor: (m: Movimiento) => m.fecha ? formatDate(m.fecha) : '' },
        { header: 'Cuenta', accessor: (m: Movimiento) => getCuentaNumero(m.cuentaId) },
        { header: 'Tipo', accessor: (m: Movimiento) => m.tipoMovimiento },
        { header: 'Valor', accessor: (m: Movimiento) => <span style={{ color: m.valor < 0 ? 'red' : 'green' }}>{formatCurrency(m.valor)}</span> },
        { header: 'Saldo', accessor: (m: Movimiento) => formatCurrency(m.saldo || 0) },
        {
            header: 'Acciones',
            accessor: (m: Movimiento) => (
                <Button size="sm" variant="danger" onClick={() => m.id && handleDelete(m.id)}><Trash2 size={16} /></Button>
            )
        },
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Movimientos</h2>
                <Button onClick={handleOpenModal}>
                    <Plus size={20} style={{ marginRight: '8px' }} /> Nuevo Movimiento
                </Button>
            </div>

            <Table<Movimiento>
                data={movimientos}
                columns={columns}
                keyExtractor={(m) => m.id || Math.random()}
            />

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Nuevo Movimiento"
            >
                <MovimientoForm
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    error={error}
                />
            </Modal>
        </div>
    );
}
