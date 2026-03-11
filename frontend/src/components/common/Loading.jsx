import React from 'react';
import './Loading.css';

const Loading = ({ message = 'Cargando...', fullScreen = false }) => {
  const content = (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return <div className="loading-fullscreen">{content}</div>;
  }

  return content;
};

export default Loading;
