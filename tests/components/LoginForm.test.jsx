import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import LoginForm from '../../src/components/LoginForm';
import { useLogin } from '../../src/hooks/useLogin';

vi.mock('../../src/hooks/useLogin', () => ({
	useLogin: vi.fn(() => ({
		login: vi.fn(),
		error: null,
		loading: false,
	})),
}));

// npm run test tests/components/LoginForm.test.jsx
describe('LoginForm Component', () => {
	// npm run test tests/components/LoginForm.test.jsx -- --testNamePattern="se renderiza correctamente"
	it('se renderiza correctamente', () => {
		// TODO 02
		// Step 1: Utiliza la función render de testing-library para renderizar el componente LoginForm
		render(<LoginForm />);

		// Step 2: Utiliza las funciones de screen (getByPlaceholderText o getByText)  para buscar los elementos del formulario
		// y comprobar que estan en el documento .toBeInTheDocument();
		expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
	});

	// npm run test tests/components/LoginForm.test.jsx -- --testNamePattern="muestra un error si el login falla"
	it('muestra un error si el login falla', async () => {
		// TODO 03

		// Step 1: Hacemos un mock de la función login del hook useLogin
		const mockLogin = vi.fn();
		useLogin.mockReturnValue({ login: mockLogin, error: 'Error en el inicio de sesión', loading: false });

		// Step 2: Renderizamos el componente LoginForm
		render(<LoginForm />);

		// Step 3: Simular llenar el formulario con fireEvent.change
		fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'X4E0j@example.com' } });
		fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password' } });

		// Step 4: Simular enviar el formulario con fireEvent.click
		fireEvent.click(screen.getByRole('button'));

		await waitFor(() => {
			// Step 5: Comprobar que se muestra el mensaje de error
			expect(screen.getByText('Error en el inicio de sesión')).toBeInTheDocument();
			// Step 6: Comprobar que se llama a la función login
			expect(mockLogin).toHaveBeenCalled();
		});
	});
});
