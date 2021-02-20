import React from 'react';
import { useHistory } from 'react-router-dom';

const Button = ({ className = '', link, onClick, text, btnRef, children }) => {
  const history = useHistory();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (link) history.push(link);
  };

  return (
    <button ref={btnRef} className={`btn ${className}`} onClick={handleClick}>
      <p className="">{text || children}</p>
    </button>
  );
};

export default Button;
