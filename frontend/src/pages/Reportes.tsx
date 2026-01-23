import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '../components/Button';
import { Table } from '../components/Table';
import { useReportes } from '../hooks/useReportes';
import { ReporteFilter } from '../components/forms/ReporteFilter';
import { getClientes } from '../services/clienteService';
import type { Reporte, Cliente } from '../types';
import { formatCurrency, formatDate } from '../utils/format';
import styles from './Page.module.css';

/**
 * Página para la generación y visualización de Reportes.
 * Permite filtrar movimientos por fecha y cliente, y exportar a PDF.
 */
export function Reportes() {
    const { reportes, loading, fetchReporte } = useReportes();
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [currentFilters, setCurrentFilters] = useState<{ start: string, end: string, clientId: string } | null>(null);

    useEffect(() => {
        // Necesario para el nombre en el exporte PDF
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

    useEffect(() => {
        console.log('Reportes state updated:', reportes);
        console.log('Reportes count:', reportes.length);
    }, [reportes]);

    const handleFilter = (start: string, end: string, clientId: string) => {
        console.log('handleFilter called with:', { start, end, clientId });
        setCurrentFilters({ start, end, clientId });
        fetchReporte(start, end, clientId);
    }

    const exportPDF = () => {
        if (!currentFilters) return;

        const doc = new jsPDF();
        const clienteName = clientes.find(c => c.id?.toString() === currentFilters.clientId)?.nombre || 'Cliente';

        doc.text("Reporte de Estado de Cuenta", 14, 15);
        doc.setFontSize(10);
        doc.text(`Cliente: ${clienteName}`, 14, 22);
        doc.text(`Periodo: ${formatDate(currentFilters.start)} - ${formatDate(currentFilters.end)}`, 14, 28);

        autoTable(doc, {
            startY: 35,
            head: [['Fecha', 'Cuenta', 'Tipo', 'Saldo Inicial', 'Estado', 'Movimiento', 'Saldo Disp.']],
            body: reportes.map(r => [
                formatDate(r.fecha),
                r.numeroCuenta,
                r.tipo,
                formatCurrency(r.saldoInicial),
                r.estado ? 'True' : 'False',
                formatCurrency(r.transaccion),
                formatCurrency(r.saldoDisponible)
            ]),
        });

        doc.save(`reporte_${clienteName}_${currentFilters.start}.pdf`);
    };

    const columns = [
        { header: 'Fecha', accessor: (r: Reporte) => formatDate(r.fecha) },
        { header: 'Cuenta', accessor: (r: Reporte) => r.numeroCuenta },
        { header: 'Tipo', accessor: (r: Reporte) => r.tipo },
        { header: 'Saldo Inicial', accessor: (r: Reporte) => formatCurrency(r.saldoInicial) },
        { header: 'Estado', accessor: (r: Reporte) => r.estado ? 'True' : 'False' },
        { header: 'Movimiento', accessor: (r: Reporte) => <span style={{ color: r.transaccion < 0 ? 'red' : 'green' }}>{formatCurrency(r.transaccion)}</span> },
        { header: 'Saldo Disp.', accessor: (r: Reporte) => formatCurrency(r.saldoDisponible) },
    ];

    return (
        <div className={styles.pageContainer}>
            <div className={styles.header}>
                <h2 className={styles.title}>Reportes</h2>
                <Button onClick={exportPDF} disabled={reportes.length === 0} variant="outline">
                    <Download size={20} style={{ marginRight: '8px' }} /> Exportar PDF
                </Button>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                <ReporteFilter onFilter={handleFilter} loading={loading} />
            </div>

            <Table<Reporte>
                data={reportes}
                columns={columns}
                keyExtractor={() => Math.random()}
                emptyMessage="Seleccione filtros para ver el reporte"
            />
        </div>
    );
}
