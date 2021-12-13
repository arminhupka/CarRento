import React from 'react';

const Separator = ({className}) => (
  <div className="group my-4 flex flex-col items-center space-y-1">
    <span className={`inline-block w-10 h-0.5 transform translate-x-1/4 ${className}`} />
    <span className={`inline-block w-10 h-0.5  transform -translate-x-1/4 ${className}`} />
  </div>
);

export default Separator;
