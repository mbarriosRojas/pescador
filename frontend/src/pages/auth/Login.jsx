import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Error from '../../components/common/Error';
import { RUTAS } from '../../utils/constants';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { execute, loading, error } = useApi();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Si ya está autenticado, redirigir
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(RUTAS.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data) => {
    setFormError('');
    const result = await execute(() => login(data.email, data.password));
    
    if (result.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'admin') {
        navigate(RUTAS.ADMIN_DASHBOARD);
      } else {
        navigate(RUTAS.CONDUCTOR_DASHBOARD);
      }
    } else {
      setFormError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Iniciar Sesión</h1>
        <p className="auth-subtitle">Ingresa tus credenciales para acceder</p>

        {(formError || error) && (
          <Error message={formError || error} className="auth-error" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <Input
            label="Email"
            name="email"
            type="email"
            register={register('email', {
              required: 'El email es requerido',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email inválido',
              },
            })}
            error={errors.email?.message}
            placeholder="tu@email.com"
            required
          />

          <Input
            label="Contraseña"
            name="password"
            type="password"
            register={register('password', {
              required: 'La contraseña es requerida',
              minLength: {
                value: 6,
                message: 'La contraseña debe tener al menos 6 caracteres',
              },
            })}
            error={errors.password?.message}
            placeholder="••••••••"
            required
          />

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            className="auth-submit"
          >
            Iniciar Sesión
          </Button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta?{' '}
          <Link to={RUTAS.REGISTER} className="auth-link">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
