import React, {useEffect, useState} from 'react';
import moment from 'moment';
import Image from 'next/image';
import {useRouter} from 'next/router';

// Components
import Modal from '../Modal';
import Select from '../../Select/Select';
import DateSelect from '../../DateSelect/DateSelect';
import Button from '../../Button/Button';

const ReservationModal = ({onClose}) => {
  const router = useRouter();

  const [car] = useState(JSON.parse(localStorage.getItem('selectedCar')));

  const [pickupPlace, setPickupPlace] = useState('');
  const [returnPlace, setReturnPlace] = useState('');

  const [pickupDate, setPickupDate] = useState(moment().add(1, 'day').set({hour: 9, minute: 0}).toDate());
  const [returnDate, setReturnDate] = useState(moment().add(3, 'days').set({hour: 9, minute: 0}).toDate());

  const [reservationDays, setReservationDays] = useState(0);

  const [error, setError] = useState('');

  const handleClearPickupPlace = () => setPickupPlace('');
  const handleClearReturnPlace = () => setReturnPlace('');

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

  const handleButton = () => {
    if (reservationDays < 1) {
      return setError('Wynajem musi trwać przynajmniej 24 godziny');
    }

    if (!pickupPlace || !returnPlace) {
      return setError('Musisz wybrać miejsce odbioru i zwrotu');
    }

    return router.push('/podsumowanie');
  };

  return (
    <Modal title="Rezerwacja" onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div className="lg:flex-1 flex flex-col gap-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Select
                data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
                title="Miejsce odbioru"
                selected={pickupPlace}
                onSelect={setPickupPlace}
                onClear={handleClearPickupPlace}
              />
            </div>
            <div className="flex-1">
              <Select
                data={['Katowice - Biuro', 'Zabrze - Dworzec PKP', 'Chorzów Batory - Dworzec PKP'].sort()}
                title="Miejsce zwrotu"
                selected={returnPlace}
                onSelect={setReturnPlace}
                onClear={handleClearReturnPlace}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <DateSelect title="Data odbioru" selected={pickupDate} onChange={setPickupDate} />
            </div>
            <div className="flex-1">
              <DateSelect title="Data zwrotu" selected={returnDate} onChange={setReturnDate} />
            </div>
          </div>
          <p className="text-red-500 font-bold">{error}</p>
        </div>
        <div className="lg:flex-1 mb-4">
          <div className="h-full flex items-stretch">
            <div className="relative h-full w-56 flex rounded-md overflow-hidden">
              <Image src={car.image} layout="fixed" width={250} height={150} quality={100} objectFit="cover" />
            </div>
            <div className="flex-1 ml-2">
              <div className="h-1/2 py-1 flex flex-col justify-center border-b">
                <h2 className="text-2xl font-semibold">
                  {car.brand} {car.model}
                </h2>
                <span>{car.type}</span>
              </div>
              <div className="h-1/2 py-1 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold">Koszt wynajmu</h2>
                <span className="text-2xl font-semibold text-red-500">{car.price * reservationDays} zł</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <Button type="button" onClick={handleButton}>
          Przedjź dalej
        </Button>
      </div>
    </Modal>
  );
};

export default ReservationModal;
