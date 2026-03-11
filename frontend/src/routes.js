import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { RUTAS, ROLES } from './utils/constants';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import Conductores from './pages/admin/Conductores';
import Vehiculos from './pages/admin/Vehiculos';
import Viajes from './pages/admin/Viajes';
import Reportes from './pages/admin/Reportes';

// Conductor pages
import ConductorDashboard from './pages/conductor/Dashboard';
import ConductorViajes from './pages/conductor/Viajes';

// Layout
import Layout from './components/layout/Layout';

// Private Route Component
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={RUTAS.LOGIN} replace />;
  }

  return children;
};

// Role-based Route Component
const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to={user?.role === ROLES.ADMIN ? RUTAS.ADMIN_DASHBOARD : RUTAS.CONDUCTOR_DASHBOARD} replace />;
  }

  return children;
};

const AppRoutes = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route
        path={RUTAS.LOGIN}
        element={
          isAuthenticated ? (
            <Navigate
              to={user?.role === ROLES.ADMIN ? RUTAS.ADMIN_DASHBOARD : RUTAS.CONDUCTOR_DASHBOARD}
              replace
            />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path={RUTAS.REGISTER}
        element={
          isAuthenticated ? (
            <Navigate
              to={user?.role === ROLES.ADMIN ? RUTAS.ADMIN_DASHBOARD : RUTAS.CONDUCTOR_DASHBOARD}
              replace
            />
          ) : (
            <Register />
          )
        }
      />

      {/* Admin routes */}
      <Route
        path="/admin/*"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={[ROLES.ADMIN]}>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="conductores" element={<Conductores />} />
                  <Route path="vehiculos" element={<Vehiculos />} />
                  <Route path="viajes" element={<Viajes />} />
                  <Route path="reportes" element={<Reportes />} />
                  <Route path="*" element={<Navigate to={RUTAS.ADMIN_DASHBOARD} replace />} />
                </Routes>
              </Layout>
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Conductor routes */}
      <Route
        path="/conductor/*"
        element={
          <PrivateRoute>
            <RoleRoute allowedRoles={[ROLES.CONDUCTOR]}>
              <Layout>
                <Routes>
                  <Route path="dashboard" element={<ConductorDashboard />} />
                  <Route path="viajes" element={<ConductorViajes />} />
                  <Route path="*" element={<Navigate to={RUTAS.CONDUCTOR_DASHBOARD} replace />} />
                </Routes>
              </Layout>
            </RoleRoute>
          </PrivateRoute>
        }
      />

      {/* Default redirect */}
      <Route
        path="/"
        element={
          <Navigate
            to={
              isAuthenticated
                ? user?.role === ROLES.ADMIN
                  ? RUTAS.ADMIN_DASHBOARD
                  : RUTAS.CONDUCTOR_DASHBOARD
                : RUTAS.LOGIN
            }
            replace
          />
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Navigate
            to={
              isAuthenticated
                ? user?.role === ROLES.ADMIN
                  ? RUTAS.ADMIN_DASHBOARD
                  : RUTAS.CONDUCTOR_DASHBOARD
                : RUTAS.LOGIN
            }
            replace
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
