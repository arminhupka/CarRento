import {useState, useEffect} from 'react';
import moment from 'moment';
import {useRouter} from 'next/router';

const useReservation = () => {
  const router = useRouter();

  const [car] = useState(JSON.parse(localStorage.getItem('selectedCar')));

  const [pickupPlace, setPickupPlace] = useState('');
  const [returnPlace, setReturnPlace] = useState('');

  const [pickupDate, setPickupDate] = useState(moment().add(1, 'day').set({hour: 9, minute: 0}).toDate());
  const [returnDate, setReturnDate] = useState(moment().add(3, 'days').set({hour: 9, minute: 0}).toDate());

  const [reservationDays, setReservationDays] = useState(0);

  const [error, setError] = useState('');

  const clearPickupPlace = () => setPickupPlace('');
  const clearReturnPlace = () => setReturnPlace('');

  const submitReservation = () => {
    if (reservationDays < 1) {
      return setError('Wynajem musi trwać przynajmniej 24 godziny');
    }

    if (!pickupPlace || !returnPlace) {
      return setError('Musisz wybrać miejsce odbioru i zwrotu');
    }

    return router.push('/podsumowanie');
  };

  useEffect(() => {
    const reservation = {
      pickupPlace,
      pickupDate,
      returnPlace,
      returnDate,
    };

    localStorage.setItem('reservation', JSON.stringify(reservation));

    const startDay = moment(pickupDate);
    const endDay = moment(returnDate);

    setReservationDays(endDay.diff(startDay, 'days'));
  }, [pickupPlace, returnPlace, pickupDate, returnDate]);

  return {
    car,
    pickupPlace,
    pickupDate,
    returnPlace,
    returnDate,
    reservationDays,
    setPickupPlace,
    setPickupDate,
    setReturnPlace,
    setReturnDate,
    clearPickupPlace,
    clearReturnPlace,
    submitReservation,
    error,
  };
};

export default useReservation;
