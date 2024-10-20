import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';
import { AuthProvider } from '../context/AuthContext';

test('renders login form', () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );
  
  expect(screen.getByPlaceholderText(/Correo/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Contraseña/i)).toBeInTheDocument();
});

test('allows the user to login', async () => {
  render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  fireEvent.change(screen.getByPlaceholderText(/Correo/i), { target: { value: 'test@example.com' } });
  fireEvent.change(screen.getByPlaceholderText(/Contraseña/i), { target: { value: 'password' } });

  fireEvent.click(screen.getByText(/Ingresar/i));
  
  // Puedes agregar más pruebas aquí para verificar que se llama a la API correctamente
});
