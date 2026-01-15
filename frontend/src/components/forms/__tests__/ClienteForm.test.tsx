import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ClienteForm } from '../ClienteForm';

// Mock components that are not under test if they add complexity
// But for unit tests, better to render them or mock them if they are big.
// Here generic components are small enough.

describe('ClienteForm', () => {
    const mockOnSubmit = vi.fn();
    const mockOnCancel = vi.fn();

    it('should render form with empty initial values', () => {
        render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

        expect(screen.getByLabelText(/Nombres/i)).toHaveValue('');
        expect(screen.getByLabelText(/Identificación/i)).toHaveValue('');
    });

    it('should render form with initial values', () => {
        const initialData: any = {
            nombre: 'John Doe',
            identificacion: '12345',
            genero: 'Masculino',
            edad: 30,
            direccion: 'Test St',
            telefono: '555-5555',
            estado: true
        };
        render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} initialData={initialData} />);

        expect(screen.getByLabelText(/Nombres/i)).toHaveValue('John Doe');
        expect(screen.getByLabelText(/Identificación/i)).toHaveValue('12345');
    });

    it('should call onSubmit with form data', async () => {
        render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

        fireEvent.change(screen.getByLabelText(/Nombres/i), { target: { value: 'Jane Doe' } });
        fireEvent.change(screen.getByLabelText(/Identificación/i), { target: { value: '98765' } });
        // Fill other required fields to avoid HTML5 validation blocking submit
        fireEvent.change(screen.getByLabelText(/Edad/i), { target: { value: '25' } });
        fireEvent.change(screen.getByLabelText(/Género/i), { target: { value: 'Femenino' } });
        fireEvent.change(screen.getByLabelText(/Dirección/i), { target: { value: 'Another St' } });
        fireEvent.change(screen.getByLabelText(/Teléfono/i), { target: { value: '111-2222' } });
        fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'secret' } });

        const submitButton = screen.getByRole('button', { name: /Guardar/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalled();
            expect(mockOnSubmit).toHaveBeenCalledWith(expect.objectContaining({
                nombre: 'Jane Doe',
                identificacion: '98765'
            }));
        });
    });

    it('should call onCancel when cancel button is clicked', () => {
        render(<ClienteForm onSubmit={mockOnSubmit} onCancel={mockOnCancel} />);

        const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
        fireEvent.click(cancelButton);

        expect(mockOnCancel).toHaveBeenCalled();
    });
});
