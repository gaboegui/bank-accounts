import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useClientes } from '../useClientes';
import { getClientes, createCliente } from '../../services/clienteService';

// Mock the service
vi.mock('../../services/clienteService', () => ({
    getClientes: vi.fn(),
    createCliente: vi.fn(),
    updateCliente: vi.fn(),
    deleteCliente: vi.fn(),
}));

describe('useClientes', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch clients on mount', async () => {
        const mockData = [{ id: 1, nombre: 'Juan' }];
        (getClientes as any).mockResolvedValue({ data: mockData });

        const { result } = renderHook(() => useClientes());

        expect(result.current.loading).toBe(true);
        expect(result.current.clientes).toEqual([]);

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.clientes).toEqual(mockData);
    });

    it('should filter clients', async () => {
        const mockData = [{ id: 1, nombre: 'Juan' }, { id: 2, nombre: 'Pedro' }];
        (getClientes as any).mockResolvedValue({ data: mockData });

        const { result } = renderHook(() => useClientes('ua')); // "ua" matches Juan

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.clientes).toEqual([{ id: 1, nombre: 'Juan' }]);
    });

    it('should add a client', async () => {
        (getClientes as any).mockResolvedValue({ data: [] });
        (createCliente as any).mockResolvedValue({});

        const { result } = renderHook(() => useClientes());
        await waitFor(() => expect(result.current.loading).toBe(false));

        const newCliente: any = { nombre: 'New Client' };
        await act(async () => {
            await result.current.addCliente(newCliente);
        });

        expect(createCliente).toHaveBeenCalledWith(newCliente);
        expect(getClientes).toHaveBeenCalledTimes(2); // Initial + after add
    });
});
