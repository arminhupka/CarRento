import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useRouter} from 'next/router';

// Components
import Title from '../Title/Title';
import Select from '../Select/Select';
import DateSelect from '../DateSelect/DateSelect';
import Button from '../Button/Button';

const ReservationSidebar = ({car}) => {
  const router = useRouter();

  const [pickupPlace, setPickupPlace] = useState('');
  const [returnPlace, setReturnPlace] = useState('');

  const [pickupDate, setPickupDate] = useState(moment().add(1, 'day').set({hour: 9, minute: 0}).toDate());
  const [returnDate, setReturnDate] = useState(moment().add(3, 'days').set({hour: 9, minute: 0}).toDate());

  const [reservationDays, setReservationDays] = useState(0);

  const [error, setError] = useState('');

  const handleClearPickupPlace = () => setPickupPlace('');
  const handleClearReturnPlace = () => setReturnPlace('');

  const handleButton = () => {
    if (reservationDays < 1) {
      return setError('Wynajem musi trwać przynajmniej 24 godziny');
    }

    if (!pickupPlace || !returnPlace) {
      return setError('Musisz wybrać miejsce odbioru i zwrotu');
    }

    localStorage.setItem(
      'selectedCar',
      JSON.stringify({
        model: car.model,
        brand: car.brand.name,
        type: car.type,
        price: car.price,
        image: car.image,
      }),
    );

    return router.push('/podsumowanie');
  };

  useEffect(() => {
    const reservation = {
      pickupPlace,
      pickupDate,
      returnPlace,
      returnDate,
    };

    localStorage.setItem('reservations', JSON.stringify(reservation));

    const startDay = moment(pickupDate);
    const endDay = moment(returnDate);

    setReservationDays(endDay.diff(startDay, 'days'));
  }, [pickupPlace, returnPlace, pickupDate, returnDate]);

  return (
    <div className="bg-white rounded-md border">
      <Title small>Rezerwacja</Title>
      <div className="p-4 flex flex-col space-y-4">
        <Select
          data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
          title="Miejsce odbioru"
          selected={pickupPlace}
          onSelect={setPickupPlace}
          onClear={handleClearPickupPlace}
        />
        <DateSelect title="Godzina odbioru" selected={pickupDate} onChange={setPickupDate} />
        <Select
          data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
          title="Miejsce zwrotu"
          selected={returnPlace}
          onSelect={setReturnPlace}
          onClear={handleClearReturnPlace}
        />
        <DateSelect title="Godzina zwrotu" selected={returnDate} onChange={setReturnDate} />
        <p className="text-red-500 font-bold">{error}</p>
        <Button onClick={handleButton}>Rezerwuj</Button>
      </div>
    </div>
  );
};

export default ReservationSidebar;
