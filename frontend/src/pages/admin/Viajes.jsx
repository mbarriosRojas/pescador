import React, { useEffect, useState } from 'react';
import { viajeService } from '../../services/viajeService';
import { conductorService } from '../../services/conductorService';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { ESTADOS_VIAJE } from '../../utils/constants';
import {
  formatDateTime,
  formatCurrency,
  formatDistance,
  formatFullName,
  formatEstado,
} from '../../utils/formatters';
import './Viajes.css';

const Viajes = () => {
  const { execute, loading, error } = useApi();
  const [viajes, setViajes] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [filters, setFilters] = useState({
    conductorId: '',
    estado: '',
    fechaInicio: '',
    fechaFin: '',
  });

  useEffect(() => {
    loadConductores();
    loadViajes();
  }, []);

  useEffect(() => {
    loadViajes();
  }, [filters]);

  const loadConductores = async () => {
    const result = await execute(() => conductorService.list());
    if (result.success) {
      setConductores(result.data.data || []);
    }
  };

  const loadViajes = async () => {
    const params = {};
    if (filters.conductorId) params.conductorId = filters.conductorId;
    if (filters.estado) params.estado = filters.estado;
    if (filters.fechaInicio) params.fechaInicio = filters.fechaInicio;
    if (filters.fechaFin) params.fechaFin = filters.fechaFin;

    const result = await execute(() => viajeService.list(params));
    if (result.success) {
      setViajes(result.data.data || []);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({
      conductorId: '',
      estado: '',
      fechaInicio: '',
      fechaFin: '',
    });
  };

  if (loading && viajes.length === 0) return <Loading />;
  if (error && viajes.length === 0) return <Error message={error} onRetry={loadViajes} />;

  return (
    <div className="viajes">
      <div className="viajes-header">
        <h1 className="viajes-title">Historial de Viajes</h1>
      </div>

      <div className="viajes-filters">
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

        <Select
          label="Estado"
          name="estado"
          value={filters.estado}
          onChange={(e) => handleFilterChange('estado', e.target.value)}
          options={[
            { value: '', label: 'Todos los estados' },
            ...Object.values(ESTADOS_VIAJE).map((estado) => ({
              value: estado,
              label: formatEstado(estado),
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

        <button className="viajes-clear-filters" onClick={clearFilters}>
          Limpiar Filtros
        </button>
      </div>

      <div className="viajes-table-container">
        <table className="viajes-table">
          <thead>
            <tr>
              <th>Conductor</th>
              <th>Vehículo</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Distancia</th>
              <th>Ganancia</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {viajes.length === 0 ? (
              <tr>
                <td colSpan="9" className="viajes-empty">
                  No hay viajes registrados
                </td>
              </tr>
            ) : (
              viajes.map((viaje) => (
                <tr key={viaje._id}>
                  <td>
                    {viaje.conductor
                      ? formatFullName(viaje.conductor.nombre, viaje.conductor.apellido)
                      : '-'}
                  </td>
                  <td>{viaje.vehiculo ? viaje.vehiculo.placa : '-'}</td>
                  <td>{viaje.origen?.direccion || '-'}</td>
                  <td>{viaje.destino?.direccion || '-'}</td>
                  <td>{formatDateTime(viaje.fechaInicio)}</td>
                  <td>{viaje.fechaFin ? formatDateTime(viaje.fechaFin) : '-'}</td>
                  <td>{formatDistance(viaje.distancia)}</td>
                  <td>{formatCurrency(viaje.ganancia)}</td>
                  <td>
                    <span className={`estado-badge estado-${viaje.estado}`}>
                      {formatEstado(viaje.estado)}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viajes;
