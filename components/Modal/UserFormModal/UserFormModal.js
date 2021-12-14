import React, {useState} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {useRouter} from 'next/router';

// Components
import Input from '../../Input/Input';
import Modal from '../Modal';
import Label from '../../Label/Label';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';

const UserFormModal = ({onClose}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [reservationData, setReservationData] = useState(null);

  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    error: '',
  };

  const formSchema = Yup.object().shape({
    // firstName: Yup.string().required('Wymagane'),
    // lastName: Yup.string().required('Wymagane'),
    // email: Yup.string().email('Niepoprawny adres email').required('Wymagane'),
    // phone: Yup.string()
    //   .min(9, 'Niepoprawny format telefonu')
    //   .max(9, 'Niepoprawny format telefonu')
    //   .required('Wymagane'),
    // address: Yup.string().required('Wymagane'),
    // city: Yup.string().required('Wymagane'),
    // postalCode: Yup.string().match('/^[0-9]{2}-[0-9]{3}/s', 'Niepoprawny format').required('Wymagane'),
  });

  const handleSubmit = async (form) => {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    const insurance = localStorage.getItem('insurance');

    setLoading(true);

    const {data} = await axios({
      method: 'POST',
      url: '/api/reservations',
      data: {
        user: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },
        car: selectedCar.id,
        insurance,
        pickupPlace: reservation.pickupPlace,
        pickupDate: reservation.pickupDate,
        returnPlace: reservation.returnPlace,
        returnDate: reservation.returnDate,
      },
    });

    setReservationData(data.shortId);

    setLoading(false);
  };

  const handleCloseButton = () => {
    localStorage.removeItem('reservation');
    localStorage.removeItem('insurance');
    localStorage.removeItem('selectedCar');

    router.push('/');
  };

  return (
    <Modal title="Wprowadź swoje dane" onClose={onClose}>
      {!loading && reservationData && (
        <div className="flex flex-col items-center space-y-2">
          <h3 className="text-2xl font-semibold">Twoja rezerwacja została przesłana</h3>
          <p className="text-xl">
            Twoje rezerwacja to <span className="font-semibold text-red-500">{reservationData}</span>
          </p>
          <Button type="button" onClick={handleCloseButton}>
            Zamknij
          </Button>
        </div>
      )}
      {loading && <Loader />}
      {!loading && !reservationData && (
        <Formik initialValues={initialState} onSubmit={handleSubmit} validationSchema={formSchema}>
          {({values, handleSubmit, handleChange, errors}) => (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <Label>Imię</Label>
                <Input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
              </div>
              <div>
                <Label>Nazwisko</Label>
                <Input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
              </div>
              <div>
                <Label>Adres email</Label>
                <Input type="text" name="email" value={values.email} onChange={handleChange} />
                <span className="text-sm">{errors.email}</span>
              </div>
              <div>
                <Label>Numer telefonu</Label>
                <Input type="t ext" name="phone" value={values.phone} onChange={handleChange} />
                <span className="text-sm">{errors.phone}</span>
              </div>
              <div>
                <Label>Adres</Label>
                <Input type="text" name="address" value={values.address} onChange={handleChange} />
                <span className="text-sm">{errors.address}</span>
              </div>
              <div>
                <Label>Miasto</Label>
                <Input type="text" name="city" value={values.city} onChange={handleChange} />
                <span className="text-sm">{errors.city}</span>
              </div>
              <div>
                <Label>Kod pocztowy</Label>
                <Input type="text" name="postalCode" value={values.postalCode} onChange={handleChange} />
                <span className="text-sm">{errors.postalCode}</span>
              </div>
              <Button type="submit">Wyślij rezerwację</Button>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default UserFormModal;
