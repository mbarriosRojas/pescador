import { format, parseISO } from 'date-fns';

// Formatear fecha
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return '-';
  try {
    const dateObj = date instanceof Date ? date : parseISO(date);
    return format(dateObj, formatStr);
  } catch (error) {
    return '-';
  }
};

// Formatear fecha y hora
export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

// Formatear moneda
export const formatCurrency = (amount) => {
  if (amount === null || amount === undefined) return '$0';
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Formatear número
export const formatNumber = (number) => {
  if (number === null || number === undefined) return '0';
  return new Intl.NumberFormat('es-CO').format(number);
};

// Formatear distancia (km)
export const formatDistance = (distance) => {
  if (distance === null || distance === undefined) return '0 km';
  return `${formatNumber(distance)} km`;
};

// Formatear nombre completo
export const formatFullName = (nombre, apellido) => {
  if (!nombre && !apellido) return '-';
  return `${nombre || ''} ${apellido || ''}`.trim();
};

// Formatear estado (capitalizar primera letra)
export const formatEstado = (estado) => {
  if (!estado) return '-';
  return estado.charAt(0).toUpperCase() + estado.slice(1).replace('-', ' ');
};

// Formatear tipo de vehículo
export const formatTipoVehiculo = (tipo) => {
  const tipos = {
    sedan: 'Sedán',
    suv: 'SUV',
    hatchback: 'Hatchback',
    van: 'Van',
  };
  return tipos[tipo] || tipo;
};

// Formatear duración (en minutos)
export const formatDuration = (minutes) => {
  if (!minutes) return '-';
  if (minutes < 60) return `${Math.round(minutes)} min`;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);
  return `${hours}h ${mins}min`;
};

// Formatear teléfono
export const formatPhone = (phone) => {
  if (!phone) return '-';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};
