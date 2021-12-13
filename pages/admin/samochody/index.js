import React from 'react';
import {getSession} from 'next-auth/react';
import axios from 'axios';
import {useRouter} from 'next/router';

// Utils
import api from '../../../utils/api';

// Hooks
import useModalState from '../../../hooks/useModalState';

// Layout
import MainLayout from '../../../layouts/MainLayout';

// Components
import Button from '../../../components/Button/Button';
import NewCarModal from '../../../components/Modal/NewCarModal/NewCarModal';
import PageHeader from '../../../components/PageHeader/PageHeader';

const CarsPage = ({brands, cars}) => {
  const router = useRouter();
  const {isVisible, onOpen, onClose} = useModalState();

  const handleRemoveCar = async (id) => {
    try {
      const {data} = await axios({
        method: 'DELETE',
        url: `/api/cars/${id}`,
      });
      router.replace(router.asPath);
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <MainLayout>
      <PageHeader title="Administracja" />
      {isVisible && <NewCarModal brands={brands} onClose={onClose} />}
      <div className="container">
        <div className="pb-4 mb-4 flex items-center justify-between border-b">
          <h1 className="text-3xl font-bold">Samochody</h1>
          <Button onClick={onOpen}>Dodaj +</Button>
        </div>
        <table className="table-auto w-full bg-white border rounded-md overflow-hidden shadow-lg">
          <thead className="block border-b py-2 text-white bg-red-500">
            <tr className="flex">
              <th className="flex-1">Model</th>
              <th className="flex-1">Marka</th>
              <th className="flex-1">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car) => (
              <tr key={car._id} className="py-4 flex border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="flex-1 flex items-center justify-center">{car.brand.name}</td>
                <td className="flex-1 flex items-center justify-center">{car.model}</td>
                <td className="flex-1 flex justify-center">
                  <Button bordered onClick={() => handleRemoveCar(car._id)}>
                    Usuń
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({req: ctx.req});

  if (!session) {
    return {
      redirect: {
        destination: '/panel',
        permanent: false,
      },
    };
  }

  const {data: brands} = await api('/api/brands');
  const {data: cars} = await api('/api/cars');

  return {
    props: {
      session,
      brands,
      cars,
    },
  };
};

CarsPage.auth = {
  role: 'admin',
};

export default CarsPage;
