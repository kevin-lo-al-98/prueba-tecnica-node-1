import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes.jsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
