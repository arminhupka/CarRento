import React from 'react';
import Image from 'next/image';

// Components
import LinkButton from '../LinkButton/LinkButton';

const Hero = () => (
  <section className="relative -mt-8 bg-red-50">
    <div className="container pt-24 pb-36 flex flex-col gap-8 lg:flex-row lg:items-center overflow-hidden">
      <div className="flex flex-col items-start">
        <h2 className="mb-4 text-4xl font-bold">Find Your Next Car at carRento</h2>
        <p className="text-base text-gray-700 md:text-lg">
          Allow us to guide you through the innovative stress free approach in finding your dream car.
        </p>
        <LinkButton href="/samochody" className="mt-4">
          Zobacz nasze samochody
        </LinkButton>
      </div>
      <div
        className="relative"
        style={{
          height: '400px',
          width: '100%',
        }}
      >
        <Image src="/img/hero.png" layout="fill" objectFit="contain" quality={100} priority />
      </div>
    </div>
  </section>
);

export default Hero;
