import React, { useEffect, useState } from 'react';
import { reporteService } from '../../services/reporteService';
import { conductorService } from '../../services/conductorService';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { formatCurrency, formatNumber, formatDate, formatFullName } from '../../utils/formatters';
import './Reportes.css';

const Reportes = () => {
  const { execute, loading, error } = useApi();
  const [conductores, setConductores] = useState([]);
  const [filters, setFilters] = useState({
    conductorId: '',
    fechaInicio: '',
    fechaFin: '',
  });
  const [ganancias, setGanancias] = useState(null);
  const [reporteConductor, setReporteConductor] = useState(null);

  useEffect(() => {
    loadConductores();
  }, []);

  const loadConductores = async () => {
    const result = await execute(() => conductorService.list());
    if (result.success) {
      setConductores(result.data.data || []);
    }
  };

  const loadGanancias = async () => {
    const params = {};
    if (filters.conductorId) params.conductorId = filters.conductorId;
    if (filters.fechaInicio) params.fechaInicio = filters.fechaInicio;
    if (filters.fechaFin) params.fechaFin = filters.fechaFin;

    const result = await execute(() => reporteService.getGanancias(params));
    if (result.success) {
      setGanancias(result.data.data);
    }
  };

  const loadReporteConductor = async () => {
    if (!filters.conductorId) {
      setReporteConductor(null);
      return;
    }

    const params = {};
    if (filters.fechaInicio) params.fechaInicio = filters.fechaInicio;
    if (filters.fechaFin) params.fechaFin = filters.fechaFin;

    const result = await execute(() =>
      reporteService.getReportePorConductor(filters.conductorId, params)
    );
    if (result.success) {
      setReporteConductor(result.data.data);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerarReporte = () => {
    loadGanancias();
    loadReporteConductor();
  };

  if (loading && !ganancias && !reporteConductor) return <Loading />;

  return (
    <div className="reportes">
      <div className="reportes-header">
        <h1 className="reportes-title">Reportes</h1>
      </div>

      <div className="reportes-filters">
        <Select
          label="Conductor"
          name="conductorId"
          value={filters.conductorId}
          onChange={(e) => handleFilterChange('conductorId', e.target.value)}
          options={[
            { value: '', label: 'Todos los conductores' },
            ...conductores.map((c) => ({
              value: c._id,
              label: `${c.nombre} ${c.apellido}`,
            })),
          ]}
        />

        <Input
          label="Fecha Inicio"
          name="fechaInicio"
          type="date"
          value={filters.fechaInicio}
          onChange={(e) => handleFilterChange('fechaInicio', e.target.value)}
        />

        <Input
          label="Fecha Fin"
          name="fechaFin"
          type="date"
          value={filters.fechaFin}
          onChange={(e) => handleFilterChange('fechaFin', e.target.value)}
        />

        <Button onClick={handleGenerarReporte} variant="primary" loading={loading}>
          Generar Reporte
        </Button>
      </div>

      {ganancias && (
        <div className="reportes-section">
          <h2 className="reportes-section-title">Ganancias</h2>
          <div className="reportes-card">
            <div className="reportes-stat">
              <span className="reportes-stat-label">Ganancias Totales:</span>
              <span className="reportes-stat-value">
                {formatCurrency(ganancias.gananciasTotales || 0)}
              </span>
            </div>
            <div className="reportes-stat">
              <span className="reportes-stat-label">Total Viajes:</span>
              <span className="reportes-stat-value">
                {formatNumber(ganancias.totalViajes || 0)}
              </span>
            </div>
            {ganancias.promedioGanancia && (
              <div className="reportes-stat">
                <span className="reportes-stat-label">Ganancia Promedio:</span>
                <span className="reportes-stat-value">
                  {formatCurrency(ganancias.promedioGanancia)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {reporteConductor && (
        <div className="reportes-section">
          <h2 className="reportes-section-title">
            Reporte de {formatFullName(reporteConductor.conductor?.nombre, reporteConductor.conductor?.apellido)}
          </h2>
          <div className="reportes-card">
            <div className="reportes-stat">
              <span className="reportes-stat-label">Ganancias:</span>
              <span className="reportes-stat-value">
                {formatCurrency(reporteConductor.gananciasTotales || 0)}
              </span>
            </div>
            <div className="reportes-stat">
              <span className="reportes-stat-label">Total Viajes:</span>
              <span className="reportes-stat-value">
                {formatNumber(reporteConductor.totalViajes || 0)}
              </span>
            </div>
            <div className="reportes-stat">
              <span className="reportes-stat-label">Viajes Completados:</span>
              <span className="reportes-stat-value">
                {formatNumber(reporteConductor.viajesCompletados || 0)}
              </span>
            </div>
            {reporteConductor.promedioGanancia && (
              <div className="reportes-stat">
                <span className="reportes-stat-label">Ganancia Promedio:</span>
                <span className="reportes-stat-value">
                  {formatCurrency(reporteConductor.promedioGanancia)}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {error && <Error message={error} />}
    </div>
  );
};

export default Reportes;
