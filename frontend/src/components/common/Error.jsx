import React from 'react';
import './Error.css';

const Error = ({ message, onRetry, className = '' }) => {
  return (
    <div className={`error-container ${className}`}>
      <div className="error-icon">⚠️</div>
      <p className="error-message">{message || 'Ha ocurrido un error'}</p>
      {onRetry && (
        <button className="error-retry" onClick={onRetry}>
          Reintentar
        </button>
      )}
    </div>
  );
};

export default Error;
