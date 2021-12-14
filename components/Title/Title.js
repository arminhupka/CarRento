import React from 'react';

const Title = ({children, small, withPrice, price}) => (
  <div className="p-4 pl-8 flex flex-col md:flex-row items-center justify-between bg-white border-l-4 border-red-500">
    <h2 className={`${!small ? 'text-4xl' : 'text-2xl'} font-bold`}>{children}</h2>
    {withPrice && <span className="text-2xl font-semibold text-red-500">{price} zł / doba</span>}
  </div>
);

export default Title;
