import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RUTAS } from '../../utils/constants';
import './Sidebar.css';

const Sidebar = () => {
  const { isAdmin } = useAuth();

  const adminLinks = [
    { to: RUTAS.ADMIN_DASHBOARD, label: 'Dashboard', icon: '📊' },
    { to: RUTAS.ADMIN_CONDUCTORES, label: 'Conductores', icon: '👤' },
    { to: RUTAS.ADMIN_VEHICULOS, label: 'Vehículos', icon: '🚗' },
    { to: RUTAS.ADMIN_VIAJES, label: 'Viajes', icon: '📍' },
    { to: RUTAS.ADMIN_REPORTES, label: 'Reportes', icon: '📈' },
  ];

  const conductorLinks = [
    { to: RUTAS.CONDUCTOR_DASHBOARD, label: 'Dashboard', icon: '📊' },
    { to: RUTAS.CONDUCTOR_VIAJES, label: 'Mis Viajes', icon: '📍' },
  ];

  const links = isAdmin() ? adminLinks : conductorLinks;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
            }
          >
            <span className="sidebar-link-icon">{link.icon}</span>
            <span className="sidebar-link-label">{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
