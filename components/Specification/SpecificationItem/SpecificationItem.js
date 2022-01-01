import React from 'react';

const SpecificationItem = ({icon, title, value}) => (
  <article className="p-4 flex flex-col justify-center items-center border rounded-md">
    <div className="mb-1 text-3xl text-red-500">{icon}</div>
    <h4 className="font-semibold">{title}</h4>
    <span>{value}</span>
  </article>
);

export default SpecificationItem;
