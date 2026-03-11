import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Error from '../../components/common/Error';
import { RUTAS, ROLES } from '../../utils/constants';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const { register: registerUser, isAuthenticated } = useAuth();
  const { execute, loading, error } = useApi();
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Si ya está autenticado, redirigir
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(RUTAS.ADMIN_DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const password = watch('password');

  const onSubmit = async (data) => {
    setFormError('');
    
    // Validar que las contraseñas coincidan
    if (data.password !== data.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }

    const userData = {
      email: data.email,
      password: data.password,
      role: data.role || ROLES.CONDUCTOR,
    };

    const result = await execute(() => registerUser(userData));
    
    if (result.success) {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user?.role === 'admin') {
        navigate(RUTAS.ADMIN_DASHBOARD);
      } else {
        navigate(RUTAS.CONDUCTOR_DASHBOARD);
      }
    } else {
      setFormError(result.error || 'Error al registrar usuario');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Registro</h1>
        <p className="auth-subtitle">Crea una cuenta nueva</p>

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

          <Select
            label="Rol"
            name="role"
            register={register('role', {
              required: 'El rol es requerido',
            })}
            error={errors.role?.message}
            options={[
              { value: ROLES.ADMIN, label: 'Administrador' },
              { value: ROLES.CONDUCTOR, label: 'Conductor' },
            ]}
            placeholder="Selecciona un rol"
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

          <Input
            label="Confirmar Contraseña"
            name="confirmPassword"
            type="password"
            register={register('confirmPassword', {
              required: 'Confirma tu contraseña',
              validate: (value) =>
                value === password || 'Las contraseñas no coinciden',
            })}
            error={errors.confirmPassword?.message}
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
            Registrarse
          </Button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta?{' '}
          <Link to={RUTAS.LOGIN} className="auth-link">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
