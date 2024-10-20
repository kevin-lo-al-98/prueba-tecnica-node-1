import { createContext, useState, useEffect } from 'react';
import { getToken, removeToken, setToken } from '../api/authService';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';  // Necesario para redirecciones

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();  // Usamos navigate para redirigir

  useEffect(() => {
    const token = getToken();
    if (token) {
      const decoded = jwtDecode(token);

      // Verificar si el token ha expirado
      const currentTime = Date.now() / 1000;  // Obtener el tiempo actual en formato Unix
      if (decoded.exp < currentTime) {
        // Si el token ha expirado, cerrar la sesión
        logout();
      } else {
        // Si el token es válido, autenticamos al usuario
        setUser(decoded);
        setIsAuthenticated(true);
        navigate('/dashboard');  // Redirigir al dashboard si está autenticado
      }
    } else {
      // Si no hay token, redirigir al login
      navigate('/login');
    }
  }, []);

  const login = (token) => {
    setToken(token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setIsAuthenticated(true);
    navigate('/dashboard');  // Redirigir al dashboard después del login
  };

  const logout = () => {
    removeToken();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/login');  // Redirigir al login después del logout
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
