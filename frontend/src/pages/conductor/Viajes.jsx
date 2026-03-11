import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { viajeService } from '../../services/viajeService';
import { useApi } from '../../hooks/useApi';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Loading from '../../components/common/Loading';
import Error from '../../components/common/Error';
import { RUTAS } from '../../utils/constants';
import {
  formatDateTime,
  formatCurrency,
  formatDistance,
  formatEstado,
} from '../../utils/formatters';
import './Viajes.css';

const Viajes = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const { execute, loading, error } = useApi();
  const [viajes, setViajes] = useState([]);
  const [isIniciarModalOpen, setIsIniciarModalOpen] = useState(false);
  const [isFinalizarModalOpen, setIsFinalizarModalOpen] = useState(false);
  const [viajeAFinalizar, setViajeAFinalizar] = useState(null);
  const [formError, setFormError] = useState('');

  const iniciarForm = useForm();
  const finalizarForm = useForm();

  useEffect(() => {
    loadViajes();

    // Verificar si se debe abrir modal de iniciar
    if (searchParams.get('iniciar') === 'true') {
      setIsIniciarModalOpen(true);
    }

    // Verificar si se debe abrir modal de finalizar
    const viajeId = searchParams.get('finalizar');
    if (viajeId) {
      loadViajeParaFinalizar(viajeId);
    }
  }, []);

  const loadViajes = async () => {
    const result = await execute(() => viajeService.list());
    if (result.success) {
      setViajes(result.data.data || []);
    }
  };

  const loadViajeParaFinalizar = async (viajeId) => {
    const result = await execute(() => viajeService.getById(viajeId));
    if (result.success) {
      setViajeAFinalizar(result.data.data);
      finalizarForm.reset({
        distancia: result.data.data.distancia || 0,
      });
      setIsFinalizarModalOpen(true);
    }
  };

  const onSubmitIniciar = async (data) => {
    setFormError('');
    const viajeData = {
      origen: {
        direccion: data.origen,
      },
    };

    const result = await execute(() => viajeService.iniciar(viajeData));
    if (result.success) {
      setIsIniciarModalOpen(false);
      iniciarForm.reset();
      navigate(RUTAS.CONDUCTOR_VIAJES);
      loadViajes();
    } else {
      setFormError(result.error || 'Error al iniciar viaje');
    }
  };

  const onSubmitFinalizar = async (data) => {
    setFormError('');
    const viajeData = {
      destino: {
        direccion: data.destino,
      },
      distancia: parseFloat(data.distancia) || 0,
    };

    const result = await execute(() =>
      viajeService.finalizar(viajeAFinalizar._id, viajeData)
    );
    if (result.success) {
      setIsFinalizarModalOpen(false);
      setViajeAFinalizar(null);
      finalizarForm.reset();
      navigate(RUTAS.CONDUCTOR_VIAJES);
      loadViajes();
    } else {
      setFormError(result.error || 'Error al finalizar viaje');
    }
  };

  const handleCancelarViaje = async (viajeId) => {
    if (window.confirm('¿Estás seguro de cancelar este viaje?')) {
      const result = await execute(() => viajeService.cancelar(viajeId));
      if (result.success) {
        loadViajes();
      }
    }
  };

  if (loading && viajes.length === 0) return <Loading />;
  if (error && viajes.length === 0) return <Error message={error} onRetry={loadViajes} />;

  return (
    <div className="conductor-viajes">
      <div className="conductor-viajes-header">
        <h1 className="conductor-viajes-title">Mis Viajes</h1>
        <Button onClick={() => setIsIniciarModalOpen(true)} variant="primary">
          + Iniciar Viaje
        </Button>
      </div>

      {formError && <Error message={formError} className="conductor-viajes-error" />}

      <div className="conductor-viajes-table-container">
        <table className="conductor-viajes-table">
          <thead>
            <tr>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Distancia</th>
              <th>Ganancia</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {viajes.length === 0 ? (
              <tr>
                <td colSpan="8" className="conductor-viajes-empty">
                  No hay viajes registrados
                </td>
              </tr>
            ) : (
              viajes.map((viaje) => (
                <tr key={viaje._id}>
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
                  <td>
                    {viaje.estado === 'iniciado' && (
                      <div className="conductor-viajes-actions">
                        <Button
                          size="small"
                          variant="primary"
                          onClick={() => {
                            setViajeAFinalizar(viaje);
                            finalizarForm.reset({ distancia: viaje.distancia || 0 });
                            setIsFinalizarModalOpen(true);
                          }}
                        >
                          Finalizar
                        </Button>
                        <Button
                          size="small"
                          variant="danger"
                          onClick={() => handleCancelarViaje(viaje._id)}
                        >
                          Cancelar
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isIniciarModalOpen}
        onClose={() => {
          setIsIniciarModalOpen(false);
          iniciarForm.reset();
          setFormError('');
        }}
        title="Iniciar Viaje"
        size="medium"
      >
        <form onSubmit={iniciarForm.handleSubmit(onSubmitIniciar)} className="conductor-viajes-form">
          <Input
            label="Origen"
            name="origen"
            register={iniciarForm.register('origen', {
              required: 'El origen es requerido',
            })}
            error={iniciarForm.formState.errors.origen?.message}
            placeholder="Dirección de origen"
            required
          />

          {formError && <Error message={formError} className="conductor-viajes-error" />}

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsIniciarModalOpen(false);
                iniciarForm.reset();
                setFormError('');
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Iniciar Viaje
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={isFinalizarModalOpen}
        onClose={() => {
          setIsFinalizarModalOpen(false);
          setViajeAFinalizar(null);
          finalizarForm.reset();
          setFormError('');
        }}
        title="Finalizar Viaje"
        size="medium"
      >
        <form
          onSubmit={finalizarForm.handleSubmit(onSubmitFinalizar)}
          className="conductor-viajes-form"
        >
          {viajeAFinalizar && (
            <div className="conductor-viaje-info">
              <p>
                <strong>Origen:</strong> {viajeAFinalizar.origen?.direccion || '-'}
              </p>
            </div>
          )}

          <Input
            label="Destino"
            name="destino"
            register={finalizarForm.register('destino', {
              required: 'El destino es requerido',
            })}
            error={finalizarForm.formState.errors.destino?.message}
            placeholder="Dirección de destino"
            required
          />

          <Input
            label="Distancia (km)"
            name="distancia"
            type="number"
            step="0.1"
            register={finalizarForm.register('distancia', {
              required: 'La distancia es requerida',
              min: { value: 0, message: 'La distancia debe ser positiva' },
            })}
            error={finalizarForm.formState.errors.distancia?.message}
            placeholder="0.0"
            required
          />

          {formError && <Error message={formError} className="conductor-viajes-error" />}

          <div className="form-actions">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsFinalizarModalOpen(false);
                setViajeAFinalizar(null);
                finalizarForm.reset();
                setFormError('');
              }}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              Finalizar Viaje
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Viajes;
