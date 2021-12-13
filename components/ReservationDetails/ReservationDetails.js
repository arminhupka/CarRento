import React from 'react';
import moment from 'moment';
import Image from 'next/image';

// Utils
import {daysDiff} from '../../utils/rentCalc';

const ReservationDetails = ({reservation, car}) => (
  <section className="mb-4 flex flex-col lg:flex-row gap-4">
    <div className="flex-1">
      <h3 className="text-2xl font-semibold">Informacje</h3>
      <ul className="mt-1">
        <li className="py-2 border-b flex justify-between">
          <span>Data odbioru</span>
          <span className="font-semibold text-gray-900">{moment(reservation.pickupDate).calendar()}</span>
        </li>
        <li className="py-2 border-b flex justify-between">
          <span>Miejsce odbioru</span>
          <span className="font-semibold text-gray-900">{reservation.pickupPlace}</span>
        </li>
        <li className="py-2 border-b flex justify-between">
          <span>Data zwrotu</span>
          <span className="font-semibold text-gray-900">{moment(reservation.returnDate).calendar()}</span>
        </li>
        <li className="py-2 border-b flex justify-between">
          <span>Miejsce zwrotu</span>
          <span className="font-semibold text-gray-900">{reservation.returnPlace}</span>
        </li>
        <li className="py-2 border-b flex justify-between">
          <span>Długość trwania wynajmu</span>
          <span className="font-semibold text-gray-900">
            {daysDiff(reservation.pickupDate, reservation.returnDate)} dni
          </span>
        </li>
        <li className="py-2 flex justify-end justify-between">
          <span>Koszt wynajmu</span>
          <span className="font-bold text-red-500">
            {daysDiff(reservation.pickupDate, reservation.returnDate) * car.price} PLN
          </span>
        </li>
      </ul>
    </div>
    <div className="flex-1">
      <div className="relative h-full rounded-md overflow-hidden">
        <div className="absolute w-full h-full p-4 flex items-end bg-gradient-to-t from-black/50 to-transparent z-10">
          <span className="text-3xl text-white font-semibold">
            {car.brand} {car.model}
          </span>
        </div>
        <Image src={car.image} layout="fill" objectFit="cover" objectPosition="center" />
      </div>
    </div>
  </section>
);

export default ReservationDetails;
