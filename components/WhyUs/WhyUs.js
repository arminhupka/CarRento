import React from 'react';
import {MdMoneyOff} from 'react-icons/md';
import FeatureCard from '../FeatureCard/FeatureCard';

const WhyUs = () => (
  <section className="py-10">
    <div className="container grid md:grid-cols-3 gap-8">
      <FeatureCard
        title="Szybka i prosta rezerwacja"
        description="Semper aibers vestibulum fringil voluptate
velit esse cillum Lorem ipsum dolor sit conse
incididunt ut labore et dolore."
        icon={<MdMoneyOff />}
      />
      <FeatureCard
        title="Brak kaucji"
        description="Semper aibers vestibulum fringil voluptate
velit esse cillum Lorem ipsum dolor sit conse
incididunt ut labore et dolore."
        icon={<MdMoneyOff />}
      />
      <FeatureCard
        title="Nowoczesna flota"
        description="Semper aibers vestibulum fringil voluptate
velit esse cillum Lorem ipsum dolor sit conse
incididunt ut labore et dolore."
        icon={<MdMoneyOff />}
      />
    </div>
  </section>
);

export default WhyUs;
