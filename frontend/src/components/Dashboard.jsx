import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Dashboard = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  if (!isAuthenticated) {
    history.push('/login');
  }

  return (
    <div>
      <h2>Bienvenido al Dashboard</h2>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
