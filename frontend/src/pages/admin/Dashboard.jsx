import React, { useEffect, useState } from 'react';
import { reporteService } from '../../services/reporteService';
import { useApi } from '../../hooks/useApi';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { formatCurrency, formatNumber } from '../../utils/formatters';
import './Dashboard.css';

const Dashboard = () => {
  const { execute, loading, error } = useApi();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const result = await execute(() => reporteService.getEstadisticas());
    if (result.success) {
      setStats(result.data.data);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStats} />;
  if (!stats) return null;

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard Administrador</h1>

      <div className="dashboard-stats">
        <div className="stat-card stat-card-primary">
          <div className="stat-icon">👤</div>
          <div className="stat-content">
            <h3 className="stat-label">Conductores Activos</h3>
            <p className="stat-value">{formatNumber(stats.conductoresActivos || 0)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-success">
          <div className="stat-icon">🚗</div>
          <div className="stat-content">
            <h3 className="stat-label">Vehículos Disponibles</h3>
            <p className="stat-value">{formatNumber(stats.vehiculosDisponibles || 0)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-info">
          <div className="stat-icon">📍</div>
          <div className="stat-content">
            <h3 className="stat-label">Total Viajes</h3>
            <p className="stat-value">{formatNumber(stats.totalViajes || 0)}</p>
          </div>
        </div>

        <div className="stat-card stat-card-warning">
          <div className="stat-icon">💰</div>
          <div className="stat-content">
            <h3 className="stat-label">Ganancias Totales</h3>
            <p className="stat-value">{formatCurrency(stats.gananciasTotales || 0)}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card">
          <h2 className="summary-title">Resumen General</h2>
          <div className="summary-content">
            <div className="summary-item">
              <span className="summary-label">Conductores Totales:</span>
              <span className="summary-value">{formatNumber(stats.totalConductores || 0)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Vehículos Totales:</span>
              <span className="summary-value">{formatNumber(stats.totalVehiculos || 0)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Viajes Completados:</span>
              <span className="summary-value">{formatNumber(stats.viajesCompletados || 0)}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Viajes en Curso:</span>
              <span className="summary-value">{formatNumber(stats.viajesEnCurso || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
