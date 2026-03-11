import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { RUTAS } from '../../utils/constants';
import './Header.css';

const Header = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(RUTAS.LOGIN);
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-logo" onClick={() => navigate(isAdmin() ? RUTAS.ADMIN_DASHBOARD : RUTAS.CONDUCTOR_DASHBOARD)}>
            🚕 Administrador de Taxis
          </h1>
        </div>
        <div className="header-right">
          {user && (
            <>
              <div className="header-user">
                <span className="header-user-name">{user.email}</span>
                <span className="header-user-role">
                  {isAdmin() ? 'Administrador' : 'Conductor'}
                </span>
              </div>
              <button className="header-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
