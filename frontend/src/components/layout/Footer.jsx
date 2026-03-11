import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-text">
          © {new Date().getFullYear()} Sistema de Administración de Flota de Taxis
        </p>
      </div>
    </footer>
  );
};

export default Footer;
