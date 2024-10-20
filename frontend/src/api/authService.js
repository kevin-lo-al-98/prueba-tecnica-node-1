import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // La forma correcta para Vite
});

// Función para obtener el token almacenado en localStorage
export const getToken = () => localStorage.getItem('token');

// Función para almacenar el token JWT
export const setToken = (token) => localStorage.setItem('token', token);

// Función para eliminar el token JWT
export const removeToken = () => localStorage.removeItem('token');

// Función para login
export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

// Función para registro
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};
