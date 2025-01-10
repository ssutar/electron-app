import React from 'react';
import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};
