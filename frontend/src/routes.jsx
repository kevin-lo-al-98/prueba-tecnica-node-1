import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy, useContext} from 'react';
import AuthContext from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';

const Dashboard = lazy(() => import('./components/Dashboard'));
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
        <Suspense fallback={<div>Cargando...</div>}> 
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={
                     <PrivateRoute>
                     <Dashboard />
                   </PrivateRoute>
                } />

                {/* Si no existe la ruta, redirigir al login */}
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Suspense>
    </Router>
  );
};

export default AppRoutes;
