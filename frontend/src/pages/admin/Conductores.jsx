import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { conductorService } from '../../services/conductorService';
import { useApi } from '../../hooks/useApi';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { ESTADOS_CONDUCTOR } from '../../utils/constants';
import { formatDate, formatFullName, formatEstado, formatPhone } from '../../utils/formatters';
import './Conductores.css';

const Conductores = () => {
  const { execute, loading, error } = useApi();
  const [conductores, setConductores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingConductor, setEditingConductor] = useState(null);
  const [formError, setFormError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    loadConductores();
  }, []);

  const loadConductores = async () => {
    const result = await execute(() => conductorService.list());
    if (result.success) {
      setConductores(result.data.data || []);
    }
  };

  const openModal = (conductor = null) => {
    setEditingConductor(conductor);
    setFormError('');
    if (conductor) {
      reset({
        nombre: conductor.nombre,
        apellido: conductor.apellido,
        documento: conductor.documento,
        telefono: conductor.telefono,
        email: conductor.email,
        direccion: conductor.direccion || '',
        fechaNacimiento: conductor.fechaNacimiento
          ? new Date(conductor.fechaNacimiento).toISOString().split('T')[0]
          : '',
        estado: conductor.estado,
        'licencia.numero': conductor.licencia?.numero || '',
        'licencia.fechaExpedicion': conductor.licencia?.fechaExpedicion
          ? new Date(conductor.licencia.fechaExpedicion).toISOString().split('T')[0]
          : '',
        'licencia.fechaVencimiento': conductor.licencia?.fechaVencimiento
          ? new Date(conductor.licencia.fechaVencimiento).toISOString().split('T')[0]
          : '',
        'licencia.categoria': conductor.licencia?.categoria || '',
      });
    } else {
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingConductor(null);
    setFormError('');
    reset();
  };

  const onSubmit = async (data) => {
    setFormError('');
    const conductorData = {
      nombre: data.nombre,
      apellido: data.apellido,
      documento: data.documento,
      telefono: data.telefono,
      email: data.email,
      direccion: data.direccion,
      fechaNacimiento: data.fechaNacimiento,
      estado: data.estado,
      licencia: {
        numero: data['licencia.numero'],
        fechaExpedicion: data['licencia.fechaExpedicion'],
        fechaVencimiento: data['licencia.fechaVencimiento'],
        categoria: data['licencia.categoria'],
      },
    };

    let result;
    if (editingConductor) {
      result = await execute(() =>
        conductorService.update(editingConductor._id, conductorData)
      );
    } else {
      result = await execute(() => conductorService.create(conductorData));
    }

    if (result.success) {
      closeModal();
      loadConductores();
    } else {
      setFormError(result.error || 'Error al guardar conductor');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este conductor?')) {
      const result = await execute(() => conductorService.delete(id));
      if (result.success) {
        loadConductores();
      }
    }
  };

  if (loading && conductores.length === 0) return <Loading />;
  if (error && conductores.length === 0) return <Error message={error} onRetry={loadConductores} />;

  return (
    <div className="conductores">
      <div className="conductores-header">
        <h1 className="conductores-title">Gestión de Conductores</h1>
        <Button onClick={() => openModal()} variant="primary">
          + Nuevo Conductor
        </Button>
      </div>

      {formError && <Error message={formError} className="conductores-error" />}

      <div className="conductores-table-container">
        <table className="conductores-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Licencia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {conductores.length === 0 ? (
              <tr>
                <td colSpan="7" className="conductores-empty">
                  No hay conductores registrados
                </td>
              </tr>
            ) : (
              conductores.map((conductor) => (
                <tr key={conductor._id}>
                  <td>{formatFullName(conductor.nombre, conductor.apellido)}</td>
                  <td>{conductor.documento}</td>
                  <td>{formatPhone(conductor.telefono)}</td>
                  <td>{conductor.email}</td>
                  <td>{conductor.licencia?.numero || '-'}</td>
                  <td>
                    <span className={`estado-badge estado-${conductor.estado}`}>
                      {formatEstado(conductor.estado)}
                    </span>
                  </td>
                  <td>
                    <div className="conductores-actions">
                      <Button
                        size="small"
                        variant="outline"
                        onClick={() => openModal(conductor)}
                      >
                        Editar
                      </Button>
                      <Button
                        size="small"
                        variant="danger"
                        onClick={() => handleDelete(conductor._id)}
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
        title={editingConductor ? 'Editar Conductor' : 'Nuevo Conductor'}
        size="large"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="conductores-form">
          <div className="form-row">
            <Input
              label="Nombre"
              name="nombre"
              register={register('nombre', { required: 'El nombre es requerido' })}
              error={errors.nombre?.message}
              required
            />
            <Input
              label="Apellido"
              name="apellido"
              register={register('apellido', { required: 'El apellido es requerido' })}
              error={errors.apellido?.message}
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Documento"
              name="documento"
              register={register('documento', { required: 'El documento es requerido' })}
              error={errors.documento?.message}
              required
            />
            <Input
              label="Teléfono"
              name="telefono"
              register={register('telefono', { required: 'El teléfono es requerido' })}
              error={errors.telefono?.message}
              required
            />
          </div>

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
            required
          />

          <Input
            label="Dirección"
            name="direccion"
            register={register('direccion')}
            error={errors.direccion?.message}
          />

          <Input
            label="Fecha de Nacimiento"
            name="fechaNacimiento"
            type="date"
            register={register('fechaNacimiento')}
            error={errors.fechaNacimiento?.message}
          />

          <h3 className="form-section-title">Licencia</h3>

          <div className="form-row">
            <Input
              label="Número de Licencia"
              name="licencia.numero"
              register={register('licencia.numero', {
                required: 'El número de licencia es requerido',
              })}
              error={errors['licencia.numero']?.message}
              required
            />
            <Input
              label="Categoría"
              name="licencia.categoria"
              register={register('licencia.categoria', {
                required: 'La categoría es requerida',
              })}
              error={errors['licencia.categoria']?.message}
              required
            />
          </div>

          <div className="form-row">
            <Input
              label="Fecha de Expedición"
              name="licencia.fechaExpedicion"
              type="date"
              register={register('licencia.fechaExpedicion', {
                required: 'La fecha de expedición es requerida',
              })}
              error={errors['licencia.fechaExpedicion']?.message}
              required
            />
            <Input
              label="Fecha de Vencimiento"
              name="licencia.fechaVencimiento"
              type="date"
              register={register('licencia.fechaVencimiento', {
                required: 'La fecha de vencimiento es requerida',
              })}
              error={errors['licencia.fechaVencimiento']?.message}
              required
            />
          </div>

          <Select
            label="Estado"
            name="estado"
            register={register('estado', { required: 'El estado es requerido' })}
            error={errors.estado?.message}
            options={Object.values(ESTADOS_CONDUCTOR).map((estado) => ({
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
              {editingConductor ? 'Actualizar' : 'Crear'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Conductores;
