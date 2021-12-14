import React from 'react';
import Title from '../Title/Title';

const CarDescription = ({description}) => (
  <section className="bg-white border shadow-lg rounded-md overflow-hidden">
    <Title small>Opis</Title>
    <div className="p-4">
      <p>{description}</p>
    </div>
  </section>
);

export default CarDescription;
