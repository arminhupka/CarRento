import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useRouter} from 'next/router';

// Hooks
import useReservation from '../../hooks/useReservation';

// Components
import Title from '../Title/Title';
import Select from '../Select/Select';
import DateSelect from '../DateSelect/DateSelect';
import Button from '../Button/Button';

const ReservationSidebar = () => {
  const {
    pickupPlace,
    setPickupPlace,
    clearPickupPlace,
    pickupDate,
    setPickupDate,
    returnPlace,
    setReturnPlace,
    clearReturnPlace,
    returnDate,
    setReturnDate,
    error,
    submitReservation,
  } = useReservation();

  return (
    <div className="bg-white rounded-md border">
      <Title small>Rezerwacja</Title>
      <div className="p-4 flex flex-col space-y-4">
        <Select
          data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
          title="Miejsce odbioru"
          selected={pickupPlace}
          onSelect={setPickupPlace}
          onClear={clearPickupPlace}
        />
        <DateSelect title="Godzina odbioru" selected={pickupDate} onChange={setPickupDate} />
        <Select
          data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
          title="Miejsce zwrotu"
          selected={returnPlace}
          onSelect={setReturnPlace}
          onClear={clearReturnPlace}
        />
        <DateSelect title="Godzina zwrotu" selected={returnDate} onChange={setReturnDate} />
        <p className="text-red-500 font-bold">{error}</p>
        <Button onClick={submitReservation}>Rezerwuj</Button>
      </div>
    </div>
  );
};

export default ReservationSidebar;
