import React from 'react';

//
import InsuranceCard from '../InsuranceCard/InsuranceCard';
import SectionTitle from '../SectionTitle/SectionTitle';

const Insurances = ({insurancesArr, selectedInsurance, setSelectedInsurance}) => (
  <section className="mt-8">
    <SectionTitle title="Ubezpieczenia" />
    <div className="grid gap-4 md:grid-cols-3">
      {insurancesArr.map((option) => (
        <InsuranceCard
          key={option._id}
          details={option}
          selected={selectedInsurance}
          setInsurance={setSelectedInsurance}
        />
      ))}
    </div>
  </section>
);

export default Insurances;
