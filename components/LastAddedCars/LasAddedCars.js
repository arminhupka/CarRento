import React from 'react';
import CarCard from '../CarCard/CarCard';

const LastAdded = ({cars}) => (
  <section className="py-8">
    <div className="container">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard
            key={car._id}
            id={car._id}
            image={car.image}
            type={car.type}
            model={car.model}
            brand={car.brand.name}
            fuel={car.specification.fuel}
            seats={car.specification.seats}
            slug={car.slug}
            transmission={car.specification.transmission}
            price={car.price}
          />
        ))}
      </div>
    </div>
  </section>
);

export default LastAdded;
