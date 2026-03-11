import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { conductorService } from '../../services/conductorService';
import { viajeService } from '../../services/viajeService';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { RUTAS } from '../../utils/constants';
import { formatCurrency, formatFullName, formatDate } from '../../utils/formatters';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { execute, loading, error } = useApi();
  const [conductor, setConductor] = useState(null);
  const [viajeActivo, setViajeActivo] = useState(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (user?.conductorId) {
      loadConductor();
      loadViajeActivo();
      loadStats();
    }
  }, [user]);

  const loadConductor = async () => {
    const result = await execute(() => conductorService.getById(user.conductorId));
    if (result.success) {
      setConductor(result.data.data);
    }
  };

  const loadViajeActivo = async () => {
    const result = await execute(() =>
      viajeService.list({ estado: 'iniciado', limit: 1 })
    );
    if (result.success && result.data.data?.length > 0) {
      setViajeActivo(result.data.data[0]);
    }
  };

  const loadStats = async () => {
    const result = await execute(() =>
      viajeService.list({ estado: 'completado', limit: 10 })
    );
    if (result.success) {
      const viajes = result.data.data || [];
      const totalGanancias = viajes.reduce((sum, v) => sum + (v.ganancia || 0), 0);
      setStats({
        totalViajes: viajes.length,
        gananciasTotales: totalGanancias,
      });
    }
  };

  if (loading && !conductor) return <Loading />;
  if (error && !conductor) return <Error message={error} onRetry={loadConductor} />;
  if (!conductor) return null;

  return (
    <div className="conductor-dashboard">
      <h1 className="conductor-dashboard-title">Dashboard Conductor</h1>

      <div className="conductor-info-card">
        <h2 className="conductor-info-title">Mi Información</h2>
        <div className="conductor-info-content">
          <div className="conductor-info-item">
            <span className="conductor-info-label">Nombre:</span>
            <span className="conductor-info-value">
              {formatFullName(conductor.nombre, conductor.apellido)}
            </span>
          </div>
          <div className="conductor-info-item">
            <span className="conductor-info-label">Documento:</span>
            <span className="conductor-info-value">{conductor.documento}</span>
          </div>
          <div className="conductor-info-item">
            <span className="conductor-info-label">Email:</span>
            <span className="conductor-info-value">{conductor.email}</span>
          </div>
          <div className="conductor-info-item">
            <span className="conductor-info-label">Teléfono:</span>
            <span className="conductor-info-value">{conductor.telefono}</span>
          </div>
          {conductor.vehiculoAsignado && (
            <div className="conductor-info-item">
              <span className="conductor-info-label">Vehículo Asignado:</span>
              <span className="conductor-info-value">
                {conductor.vehiculoAsignado.placa} - {conductor.vehiculoAsignado.marca}{' '}
                {conductor.vehiculoAsignado.modelo}
              </span>
            </div>
          )}
        </div>
      </div>

      {viajeActivo ? (
        <div className="conductor-viaje-activo">
          <h2 className="conductor-viaje-activo-title">Viaje en Curso</h2>
          <div className="conductor-viaje-activo-content">
            <p>
              <strong>Origen:</strong> {viajeActivo.origen?.direccion || '-'}
            </p>
            <p>
              <strong>Fecha Inicio:</strong> {formatDate(viajeActivo.fechaInicio)}
            </p>
            <Button
              variant="primary"
              onClick={() => navigate(`${RUTAS.CONDUCTOR_VIAJES}?finalizar=${viajeActivo._id}`)}
            >
              Finalizar Viaje
            </Button>
          </div>
        </div>
      ) : (
        <div className="conductor-actions">
          <Button
            variant="primary"
            size="large"
            onClick={() => navigate(`${RUTAS.CONDUCTOR_VIAJES}?iniciar=true`)}
            disabled={!conductor.vehiculoAsignado}
          >
            {conductor.vehiculoAsignado
              ? 'Iniciar Nuevo Viaje'
              : 'No tienes vehículo asignado'}
          </Button>
        </div>
      )}

      {stats && (
        <div className="conductor-stats">
          <div className="conductor-stat-card">
            <h3 className="conductor-stat-label">Total Viajes</h3>
            <p className="conductor-stat-value">{stats.totalViajes}</p>
          </div>
          <div className="conductor-stat-card">
            <h3 className="conductor-stat-label">Ganancias Totales</h3>
            <p className="conductor-stat-value">{formatCurrency(stats.gananciasTotales)}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
