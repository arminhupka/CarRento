import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {useFormik} from 'formik';
import axios from 'axios';

// Components
import Modal from '../Modal';
import Button from '../../Button/Button';
import Loader from '../../Loader/Loader';

const NewBrandModal = ({onClose}) => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      brand: '',
    },
    onSubmit: async (values) => {
      setLoading(true);
      await axios({
        method: 'POST',
        url: '/api/brands',
        data: {
          name: values.brand,
        },
      });
      setLoading(false);
      onClose();
      await router.replace(router.asPath);
    },
  });

  const handleAddBrand = (e) => {
    e.preventDefault();
    formik.submitForm(e);
  };

  return (
    <Modal title="Dodaj nową markę" onClose={onClose}>
      {loading && <Loader />}
      {!loading && (
        <form onSubmit={handleAddBrand} className="flex flex-col space-y-2">
          <label htmlFor="brand" className="text-black font-semibold">
            Nazwa marki
          </label>
          <input
            id="brand"
            name="brand"
            type="text"
            className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            onChange={formik.handleChange}
          />
          <Button type="submit">Dodaj nową markę</Button>
        </form>
      )}
    </Modal>
  );
};

export default NewBrandModal;
