import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, Navigate, Outlet } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
