import React from 'react';
import './Input.css';

const Input = ({
  label,
  name,
  type = 'text',
  register,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'input',
    error && 'input-error',
    disabled && 'input-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const registerProps = register ? register(name) : {};

  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...registerProps}
        {...props}
      />
      {error && <span className="input-error-message">{error}</span>}
    </div>
  );
};

export default Input;
