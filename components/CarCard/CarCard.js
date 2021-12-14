import React from 'react';
import Image from 'next/image';
import {FaGasPump, FaUsers, FaCog} from 'react-icons/fa';

// Hooks
import useModalState from '../../hooks/useModalState';

// Components
import LinkButton from '../LinkButton/LinkButton';
import Button from '../Button/Button';
import ReservationModal from '../Modal/ReservationModal/ReservationModal';

const CarCard = ({id, model, brand, type, transmission, fuel, seats, slug, image, price}) => {
  const {isVisible, onOpen, onClose} = useModalState();

  const handleCarReservation = () => {
    localStorage.setItem(
      'selectedCar',
      JSON.stringify({
        id,
        model,
        brand,
        type,
        transmission,
        fuel,
        seats,
        slug,
        image,
        price,
      }),
    );
    onOpen();
  };

  const handleModalClose = () => {
    onClose();
    localStorage.removeItem('selectedCar');
  };

  return (
    <>
      {isVisible && <ReservationModal onClose={handleModalClose} />}
      <article className="p-4 bg-white rounded-md shadow-lg">
        <header className="relative h-60 rounded-md overflow-hidden">
          <Image
            src={image}
            layout="fill"
            objectFit="cover"
            className="transform hover:scale-110 transition-transform duration-700"
          />
        </header>
        <div className="pt-4 pb-4 mb-4 flex justify-between items-end border-b">
          <div className="truncate">
            <h2 className="text-2xl font-semibold">
              {brand} {model}
            </h2>
            <span className="font-bold text-gray-300">{type}</span>
          </div>
          <div>
            <span>
              <span className="text-3xl font-semibold text-red-500">{price} zł</span>{' '}
              <span className="text-gray-500">/ doba</span>
            </span>
          </div>
        </div>
        <div className="mb-4">
          <ul className="flex flex-col space-y-2">
            <li className="flex-1 flex items-center space-x-2">
              <FaCog className="text-xl text-red-500" />
              <span className="font-semibold text-gray-500">{transmission}</span>
            </li>
            <li className="flex-1 flex items-center space-x-2">
              <FaUsers className="text-xl text-red-500" />
              <span className="font-semibold text-gray-500">{seats} osoby</span>
            </li>
            <li className="flex-1 flex items-center space-x-2">
              <FaGasPump className="text-xl text-red-500" />
              <span className="font-semibold text-gray-500">{fuel}</span>
            </li>
          </ul>
        </div>
        <div className="flex flex-col space-y-2">
          <LinkButton bordered href={`/samochody/${slug}`}>
            Szczegóły
          </LinkButton>
          <Button onClick={handleCarReservation}>Rezerwacja</Button>
        </div>
      </article>
    </>
  );
};

export default CarCard;
