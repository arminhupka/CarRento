import React from 'react';

const Input = ({type, ...rest}) => (
  <input
    className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
    type={type || 'text'}
    {...rest}
  />
);

export default Input;
