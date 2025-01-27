import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import RegisterForm from '../../src/components/RegisterForm';
import { useRegister } from '../../src/hooks/useRegister';

vi.mock('../../src/hooks/useRegister', () => ({
	useRegister: vi.fn(() => ({
		register: vi.fn(),
		error: null,
		loading: false,
	})),
}));

// npm run test tests/components/RegisterForm.test.jsx
describe('RegisterForm Component', () => {
	// npm run test tests/components/RegisterForm.test.jsx -- --testNamePattern="se renderiza correctamente"
	it('se renderiza correctamente', () => {
		// TODO 01
		// Step 1: Utiliza la función render de testing-library para renderizar el componente RegisterForm
		render(<RegisterForm />);

		// Step 2: Utiliza las funciones de screen (getByPlaceholderText o getByText)  para buscar los elementos del formulario
		// y comprobar que estan en el documento .toBeInTheDocument();
		expect(screen.getByPlaceholderText('Nombre')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Apellido')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
	});

	// npm run test tests/components/RegisterForm.test.jsx -- --testNamePattern="muestra un error si el registro falla"
	it('muestra un error si el registro falla', async () => {
		// TODO 04

		// Step 1: Hacemos un mock del hook useRegister
		const mockRegister = vi.fn();
		useRegister.mockReturnValue({ register: mockRegister, error: 'Error en el registro', loading: false });

		// Step 2: Renderizamos el componente RegisterForm
		render(<RegisterForm />);

		// Step 3: Simular llenar el formulario
		fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'John' } });
		fireEvent.change(screen.getByPlaceholderText('Apellido'), { target: { value: 'Doe' } });
		fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'X4E0j@example.com' } });
		fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password' } });

		// Step 4: Simulamos que mandamos el formulario
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			// Step 5: Comprobar que se muestra el mensaje de error
			expect(screen.getByText('Error en el registro')).toBeInTheDocument();
			// Step 6: Comprobar que se llama a la función register retornada por el Hook useRegister
			expect(mockRegister).toHaveBeenCalled();
		});
	});
});
