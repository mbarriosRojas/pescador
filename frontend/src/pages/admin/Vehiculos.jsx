import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { vehiculoService } from '../../services/vehiculoService';
import { conductorService } from '../../services/conductorService';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { ESTADOS_VEHICULO, TIPOS_VEHICULO } from '../../utils/constants';
import { formatDate, formatEstado, formatTipoVehiculo } from '../../utils/formatters';
import './Vehiculos.css';

const Vehiculos = () => {
  const { execute, loading, error } = useApi();
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAsignarModalOpen, setIsAsignarModalOpen] = useState(false);
  const [selectedVehiculo, setSelectedVehiculo] = useState(null);
  const [editingVehiculo, setEditingVehiculo] = useState(null);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const asignarForm = useForm();

  useEffect(() => {
    loadVehiculos();
    loadConductores();
  }, []);

  const loadVehiculos = async () => {
    const result = await execute(() => vehiculoService.list());
    if (result.success) {
      setVehiculos(result.data.data || []);
    }
  };

  const loadConductores = async () => {
    const result = await execute(() => conductorService.list());
    if (result.success) {
      setConductores(result.data.data || []);
    }
  };

  const openModal = (vehiculo = null) => {
    setEditingVehiculo(vehiculo);
    setFormError('');
    if (vehiculo) {
      reset({
        placa: vehiculo.placa,
        marca: vehiculo.marca,
        modelo: vehiculo.modelo,
        año: vehiculo.año,
        color: vehiculo.color || '',
        tipo: vehiculo.tipo,
        estado: vehiculo.estado,
        kilometraje: vehiculo.kilometraje || 0,
        fechaAdquisicion: vehiculo.fechaAdquisicion
          ? new Date(vehiculo.fechaAdquisicion).toISOString().split('T')[0]
          : '',
      });
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingVehiculo(null);
    setFormError('');
    reset();
  };

  const openAsignarModal = (vehiculo) => {
    setSelectedVehiculo(vehiculo);
    asignarForm.reset({ conductorId: vehiculo.conductorAsignado?._id || '' });
    setIsAsignarModalOpen(true);
  };

  const closeAsignarModal = () => {
    setIsAsignarModalOpen(false);
    setSelectedVehiculo(null);
    asignarForm.reset();
  };

  const onSubmit = async (data) => {
    setFormError('');
    const vehiculoData = {
      placa: data.placa.toUpperCase(),
      marca: data.marca,
      modelo: data.modelo,
      año: parseInt(data.año),
      color: data.color,
      tipo: data.tipo,
      estado: data.estado,
      kilometraje: parseFloat(data.kilometraje) || 0,
      fechaAdquisicion: data.fechaAdquisicion || undefined,
    };

    let result;
    if (editingVehiculo) {
      result = await execute(() =>
        vehiculoService.update(editingVehiculo._id, vehiculoData)
      );
    } else {
      result = await execute(() => vehiculoService.create(vehiculoData));
    }

    if (result.success) {
      closeModal();
      loadVehiculos();
    } else {
      setFormError(result.error || 'Error al guardar vehículo');
    }
  };

  const onSubmitAsignar = async (data) => {
    setFormError('');
    let result;
    if (data.conductorId) {
      result = await execute(() =>
        vehiculoService.asignar(selectedVehiculo._id, data.conductorId)
      );
    } else {
      result = await execute(() => vehiculoService.desasignar(selectedVehiculo._id));
    }

    if (result.success) {
      closeAsignarModal();
      loadVehiculos();
    } else {
      setFormError(result.error || 'Error al asignar vehículo');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este vehículo?')) {
      const result = await execute(() => vehiculoService.delete(id));
      if (result.success) {
        loadVehiculos();
      }
    }
  };

  if (loading && vehiculos.length === 0) return <Loading />;
  if (error && vehiculos.length === 0) return <Error message={error} onRetry={loadVehiculos} />;

  return (
    <div className="vehiculos">
      <div className="vehiculos-header">
        <h1 className="vehiculos-title">Gestión de Vehículos</h1>
        <Button onClick={() => openModal()} variant="primary">
          + Nuevo Vehículo
        </Button>
      </div>

      {formError && <Error message={formError} className="vehiculos-error" />}

      <div className="vehiculos-table-container">
        <table className="vehiculos-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca/Modelo</th>
              <th>Año</th>
              <th>Tipo</th>
              <th>Conductor</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.length === 0 ? (
              <tr>
                <td colSpan="7" className="vehiculos-empty">
                  No hay vehículos registrados
                </td>
              </tr>
            ) : (
              vehiculos.map((vehiculo) => (
                <tr key={vehiculo._id}>
                  <td>{vehiculo.placa}</td>
                  <td>{`${vehiculo.marca} ${vehiculo.modelo}`}</td>
                  <td>{vehiculo.año}</td>
                  <td>{formatTipoVehiculo(vehiculo.tipo)}</td>
                  <td>
                    {vehiculo.conductorAsignado
                      ? `${vehiculo.conductorAsignado.nombre} ${vehiculo.conductorAsignado.apellido}`
                      : '-'}
                  </td>
                  <td>
                    <span className={`estado-badge estado-${vehiculo.estado}`}>
                      {formatEstado(vehiculo.estado)}
                    </span>
                  </td>
                  <td>
                    <div className="vehiculos-actions">
                      <Button
                        size="small"
                        variant="outline"
                        onClick={() => openModal(vehiculo)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        variant="secondary"
                        onClick={() => openAsignarModal(vehiculo)}
                      >
                        Asignar
                      </Button>
                      <Button
                        size="small"
                        variant="danger"
                        onClick={() => handleDelete(vehiculo._id)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingVehiculo ? 'Editar Vehículo' : 'Nuevo Vehículo'}
        size="large"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="vehiculos-form">
          <div className="form-row">
            <Input
              label="Placa"
              name="placa"
              register={register('placa', { required: 'La placa es requerida' })}
              error={errors.placa?.message}
              required
            />
            <Input
              label="Marca"
              name="marca"
              register={register('marca', { required: 'La marca es requerida' })}
              error={errors.marca?.message}
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Modelo"
              name="modelo"
              register={register('modelo', { required: 'El modelo es requerido' })}
              error={errors.modelo?.message}
              required
            />
            <Input
              label="Año"
              name="año"
              type="number"
              register={register('año', {
                required: 'El año es requerido',
                min: { value: 1900, message: 'Año inválido' },
                max: { value: new Date().getFullYear() + 1, message: 'Año inválido' },
              })}
              error={errors.año?.message}
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Color"
              name="color"
              register={register('color')}
              error={errors.color?.message}
            />
            <Select
              label="Tipo"
              name="tipo"
              register={register('tipo', { required: 'El tipo es requerido' })}
              error={errors.tipo?.message}
              options={Object.values(TIPOS_VEHICULO).map((tipo) => ({
                value: tipo,
                label: formatTipoVehiculo(tipo),
              }))}
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Kilometraje"
              name="kilometraje"
              type="number"
              register={register('kilometraje', {
                min: { value: 0, message: 'El kilometraje debe ser positivo' },
              })}
              error={errors.kilometraje?.message}
            />
            <Input
              label="Fecha de Adquisición"
              name="fechaAdquisicion"
              type="date"
              register={register('fechaAdquisicion')}
              error={errors.fechaAdquisicion?.message}
            />
          </div>

          <Select
            label="Estado"
            name="estado"
            register={register('estado', { required: 'El estado es requerido' })}
            error={errors.estado?.message}
            options={Object.values(ESTADOS_VEHICULO).map((estado) => ({
              value: estado,
              label: formatEstado(estado),
            }))}
            required
          />

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {editingVehiculo ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isAsignarModalOpen}
        onClose={closeAsignarModal}
        title="Asignar Vehículo"
        size="medium"
      >
        <form
          onSubmit={asignarForm.handleSubmit(onSubmitAsignar)}
          className="vehiculos-form"
        >
          <Select
            label="Conductor"
            name="conductorId"
            register={asignarForm.register('conductorId')}
            error={asignarForm.formState.errors.conductorId?.message}
            options={[
              { value: '', label: 'Sin asignar' },
              ...conductores
                .filter((c) => c.estado === 'activo')
                .map((c) => ({
                  value: c._id,
                  label: `${c.nombre} ${c.apellido}`,
                })),
            ]}
            placeholder="Selecciona un conductor"
          />

          {formError && <Error message={formError} className="vehiculos-error" />}

          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={closeAsignarModal}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Asignar
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Vehiculos;
