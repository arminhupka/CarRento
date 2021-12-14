import React from 'react';
import {FaGasPump, FaTachometerAlt, FaCarBattery, FaCogs, FaCalendar, FaUsers} from 'react-icons/fa';

// Components
import SpecificationItem from './SpecificationItem/SpecificationItem';
import Title from '../Title/Title';

const Specification = ({specification}) => (
  <section className="border rounded-md overflow-hidden">
    <Title small>Specyfikacja</Title>
    <div className="p-4 grid gap-4 grid-cols-2 md:grid-cols-3 bg-white shadow-lg">
      <SpecificationItem icon={<FaGasPump />} title="Paliwo" value={specification.fuel} />
      <SpecificationItem icon={<FaCarBattery />} title="Moc" value={`${specification.hp} KM`} />
      <SpecificationItem icon={<FaTachometerAlt />} title="Silnik" value={`${specification.engine} L`} />
      <SpecificationItem icon={<FaCogs />} title="Skrzynia biegów" value={specification.transmission} />
      <SpecificationItem icon={<FaCalendar />} title="Rok produkcji" value={specification.productionYear} />
      <SpecificationItem icon={<FaUsers />} title="Miejsca" value={specification.seats} />
    </div>
  </section>
);

export default Specification;
