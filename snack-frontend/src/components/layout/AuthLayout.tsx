import { Navigate, Outlet } from 'react-router-dom';
import Header from './Header';
import { useAuth } from '../../hooks/useAuth';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-background-400">
      <Header />
      <Outlet />
    </div>
  );
}
