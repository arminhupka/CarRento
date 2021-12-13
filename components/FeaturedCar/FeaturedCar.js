import React from 'react';
import Image from 'next/image';

// Component
import LinkButton from '../LinkButton/LinkButton';

const FeaturedCar = () => (
  <section>
    <div className="container">
      <div className="relative flex flex-col md:flex-row rounded-md shadow-xl overflow-hidden">
        <div className="absolute top-10 -left-16 w-64 py-4 text-white text-center bg-red-500 transform -rotate-45 z-10">
          <span className="font-bold">SUPER OFERTA</span>
        </div>
        <div className="relative h-auto lg:h-96 md:w-1/2">
          <Image src="/img/nissan.jpeg" layout="fill" objectFit="cover" />
        </div>
        <div className="md:w-1/2 p-8 text-white bg-gray-900">
          <h1 className="mb-2 text-4xl font-bold text-white">Nissan Prime Sport 3.5</h1>
          <p className="mb-4 text-5xl font-semibold text-red-500">41.500 PLN</p>
          <p className="my-8 text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusantium aspernatur eaque facere molestiae
            optio ratione, repudiandae sit ullam voluptatum.
          </p>
          <LinkButton href="/">Order Car</LinkButton>
        </div>
      </div>
    </div>
  </section>
);

export default FeaturedCar;
