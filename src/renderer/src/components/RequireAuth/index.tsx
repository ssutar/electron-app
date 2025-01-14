import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, Navigate, Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <nav className="container">
        <ul>
          <li>
            <Link to="/dashboard">Home</Link>
          </li>
          <li>
            <Link to="/dashboard/updates">Updates</Link>
          </li>
          {/* <li>
            <Link to="/dashboard/daily-updates">Daily updates</Link>
          </li> */}
          <li>
            <Link to="/dashboard/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/logout">Logout</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
