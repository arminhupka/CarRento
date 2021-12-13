import React from 'react';

const Title = ({children, small}) => (
  <div className="header bg-white">
    <h2 className={`p-4 pl-8 ${!small ? 'text-4xl' : 'text-2xl'} font-bold border-l-4 border-red-500`}>{children}</h2>
  </div>
);

export default Title;
