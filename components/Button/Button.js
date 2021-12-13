import React from 'react';

const Button = ({children, className, bordered, type, onClick}) => {
  const normalStyle = `flex items-center justify-center px-3 py-2 font-semibold text-white bg-red-500 border-2 border-red-500 rounded-md transition-colors hover:bg-red-600 hover:border-red-600 ${className}`;
  const borderStyle = `flex items-center justify-center px-3 py-2 font-semibold text-red-500 bg-white border-2 border-red-500 rounded-md transition-colors hover:bg-red-500 hover:text-white ${className}`;

  const style = bordered ? borderStyle : normalStyle;

  return (
    <button type={type} className={`${style} cursor-pointer`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
