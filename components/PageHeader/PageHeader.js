import React from 'react';

const PageHeader = ({title}) => (
  <header className="-mt-8 mb-8 bg-red-600">
    <div className="container py-10">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
    </div>
  </header>
);

export default PageHeader;
