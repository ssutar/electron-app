import React from 'react';
import { useAuth } from '../AuthContext';
import { Link, Navigate, Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    <>
      <header className="main-nav-header">
        <nav className="container">
          <ul>
            <li>
              <Link to="/dashboard">
                <strong>Home</strong>
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link to="/dashboard/updates">Updates</Link>
            </li>
            {/* <li>
            <Link to="/dashboard/daily-updates">Daily updates</Link>
          </li> */}
            <li>
              <details className="dropdown">
                <summary>Account</summary>
                <ul dir="rtl">
                  <li>
                    <Link to="/dashboard/profile">My profile</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/logout">Logout</Link>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  ) : (
    <Navigate to="/login" replace />
  );
};
