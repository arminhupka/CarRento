import React from 'react';
import {FaCheck, FaTimes} from 'react-icons/fa';

// Components
import Button from '../Button/Button';

// Icons
const Check = () => <FaCheck className="text-green-500" />;
const Wrong = () => <FaTimes className="text-red-800" />;

const InsuranceCard = ({details, selected, setInsurance}) => {
  return (
    <article
      className={`p-4 bg-white border-2 rounded-md ${details.id === selected && 'border-red-500 shadow-xl'} transition`}
    >
      <div className="mb-4 text-center">
        <h2 className="text-3xl font-semibold">{details.name}</h2>
      </div>
      <div className="py-4 flex flex-col items-center text-center">
        <span className="text-4xl font-bold text-red-500">{details.price} PLN</span>
        <span className="text-sm">za dobę</span>
      </div>
      <div>
        <ul className="my-2">
          <li className="py-2 flex items-center justify-between border-b">
            <span>Szkoda z OC</span>
            <span>{details.oc ? <Check /> : <Wrong />}</span>
          </li>
          <li className="py-2 flex items-center justify-between border-b">
            <span>Udział w szkodzie</span>
            <span className="font-semibold text-gray-900">{details.participationInTheDamage} zł</span>
          </li>
          <li className="py-2 flex items-center justify-between border-b">
            <span>Uszkodzenia szyb</span>
            <span>{details.windowsDamage ? <Check /> : <Wrong />}</span>
          </li>
          <li className="py-2 flex items-center justify-between border-b">
            <span>Uszkodzenia kół</span>
            <span>{details.wheelsDamage ? <Check /> : <Wrong />}</span>
          </li>
          <li className="py-2 flex items-center justify-between border-b">
            <span>Szkoda całkowita</span>
            <span className="font-semibold text-gray-900">{details.totalDamage} zł</span>
          </li>
          <li className="py-2 flex items-center justify-between border-b">
            <span>Kradzież</span>
            <span className="font-semibold text-gray-900">{details.steal} zł</span>
          </li>
          <li className="py-2 flex items-center justify-between">
            <span>Auto zastępcze</span>
            <span>{details.replacementCar ? <Check /> : <Wrong />}</span>
          </li>
        </ul>
        <div className="flex flex-col">
          <Button bordered={selected !== details.id} type="button" onClick={() => setInsurance(details.id)}>
            {selected === details.id ? 'Wybrano' : 'Wybieram'}
          </Button>
        </div>
      </div>
    </article>
  );
};

export default InsuranceCard;
