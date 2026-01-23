import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useCuentas } from '../useCuentas';
import { getCuentas, createCuenta, deleteCuenta } from '../../services/cuentaService';

vi.mock('../../services/cuentaService', () => ({
    getCuentas: vi.fn(),
    createCuenta: vi.fn(),
    updateCuenta: vi.fn(),
    deleteCuenta: vi.fn(),
}));

describe('useCuentas', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should fetch accounts on mount', async () => {
        const mockData = [{ id: 1, numeroCuenta: '22222', saldoInicial: 100 }];
        (getCuentas as any).mockResolvedValue(mockData);

        const { result } = renderHook(() => useCuentas());

        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.cuentas).toEqual(mockData);
    });

    it('should add an account', async () => {
        (getCuentas as any).mockResolvedValue([]);
        (createCuenta as any).mockResolvedValue({});

        const { result } = renderHook(() => useCuentas());
        await waitFor(() => expect(result.current.loading).toBe(false));

        const newCuenta: any = { numeroCuenta: '33333', saldoInicial: 200 };
        await act(async () => {
            await result.current.addCuenta(newCuenta);
        });

        expect(createCuenta).toHaveBeenCalledWith(newCuenta);
        expect(getCuentas).toHaveBeenCalledTimes(2);
    });

    it('should delete an account', async () => {
        (getCuentas as any).mockResolvedValue({ data: [] });
        (deleteCuenta as any).mockResolvedValue({});

        const { result } = renderHook(() => useCuentas());
        await waitFor(() => expect(result.current.loading).toBe(false));

        await act(async () => {
            await result.current.removeCuenta(1);
        });

        expect(deleteCuenta).toHaveBeenCalledWith(1);
        expect(getCuentas).toHaveBeenCalledTimes(2);
    });
});
