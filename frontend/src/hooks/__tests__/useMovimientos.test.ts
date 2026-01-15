import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMovimientos } from '../useMovimientos';
import { getMovimientos, createMovimiento } from '../../services/movimientoService';

vi.mock('../../services/movimientoService', () => ({
    getMovimientos: vi.fn(),
    createMovimiento: vi.fn(),
    updateMovimiento: vi.fn(),
    deleteMovimiento: vi.fn(),
}));

describe('useMovimientos', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch movements on mount and sort/filter', async () => {
        const mockData = [
            { id: 1, fecha: '2023-01-01', valor: 100 },
            { id: 2, fecha: '2023-01-02', valor: 200 }
        ];
        (getMovimientos as any).mockResolvedValue({ data: mockData });

        const { result } = renderHook(() => useMovimientos());

        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
        // Expect sorting desc by date (logic in hook)
        expect(result.current.movimientos[0].id).toBe(2);
        expect(result.current.movimientos[1].id).toBe(1);
    });

    it('should add a movement', async () => {
        (getMovimientos as any).mockResolvedValue({ data: [] });
        (createMovimiento as any).mockResolvedValue({});

        const { result } = renderHook(() => useMovimientos());
        await waitFor(() => expect(result.current.loading).toBe(false));

        const newMov: any = { valor: 50 };
        await act(async () => {
            await result.current.addMovimiento(newMov);
        });

        expect(createMovimiento).toHaveBeenCalledWith(newMov);
    });
});
