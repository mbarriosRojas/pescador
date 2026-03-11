import React from 'react';
import './Select.css';

const Select = ({
  label,
  name,
  register,
  error,
  options = [],
  placeholder,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const selectClasses = [
    'select',
    error && 'select-error',
    disabled && 'select-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const registerProps = register ? register(name) : {};

  return (
    <div className="select-group">
      {label && (
        <label htmlFor={name} className="select-label">
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        required={required}
        disabled={disabled}
        className={selectClasses}
        {...registerProps}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
};

export default Select;
