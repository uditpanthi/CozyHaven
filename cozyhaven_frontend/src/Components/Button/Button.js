import React from 'react';
import '../Button/Button.css';

const Button = ({ children, onClick }) => {
  return (
    <button className="bn3" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
