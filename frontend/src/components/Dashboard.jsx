import { useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();  // Reemplazamos useHistory por useNavigate

  const handleLogout = () => {
    logout();
    navigate('/login');  // Redirigir al login después de cerrar sesión
  };
console.log('entro');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');  // Redirigir al login si no está autenticado
    }
  }, [isAuthenticated, navigate]);  // Dependencia en isAuthenticated

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
