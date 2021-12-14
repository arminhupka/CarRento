import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';

// Components
import Input from '../../Input/Input';
import Modal from '../Modal';
import Label from '../../Label/Label';
import Button from '../../Button/Button';

const UserFormModal = ({onClose}) => {
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

  const handleSubmit = (form) => {
    const selectedCar = JSON.parse(localStorage.getItem('selectedCar'));
    const reservation = JSON.parse(localStorage.getItem('reservation'));
    const insurance = JSON.parse(localStorage.getItem('insurance'));

    console.log({
      user: form,
      car: selectedCar.id,
      insurance,
      reservation,
    });
  };

  return (
    <Modal title="Wprowadź swoje dane" onClose={onClose}>
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
    </Modal>
  );
};

export default UserFormModal;
