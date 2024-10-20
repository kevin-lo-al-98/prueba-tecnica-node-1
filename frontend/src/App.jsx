import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';

const Dashboard = lazy(() => import('./components/Dashboard'));
const CrudComponent = lazy(() => import('./components/CrudComponent'));
function App() {
  return (
    <AuthProvider>
      <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/crud" element={<CrudComponent />} />
        </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
