import { useAuth } from '@/components/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <AuthenticatedLayout>
        <Outlet />
      </AuthenticatedLayout>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
