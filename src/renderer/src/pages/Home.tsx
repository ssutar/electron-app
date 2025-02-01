import React from 'react';
import { useAuth } from '../components/AuthContext';
import { Navigate } from 'react-router-dom';

export const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/updates" /> : <Navigate to="/login" />;
};
