import React, {useRouter} from 'next/router';
import {getSession} from 'next-auth/react';
import {FaCheckSquare, FaClock, FaTimes} from 'react-icons/fa';
import axios from 'axios';

// Utils
import server from '../../../utils/server';

// Hooks
import useModalState from '../../../hooks/useModalState';

// Layout
import MainLayout from '../../../layouts/MainLayout';

// Components
import Button from '../../../components/Button/Button';
import NewBrandModal from '../../../components/Modal/NewBrandModal/NewBrandModal';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const BrandsPage = ({reservations}) => {
  const router = useRouter();
  const {isVisible, onClose} = useModalState();

  const handleStatusChange = async (id, status) => {
    await axios({
      method: 'PATCH',
      url: `/api/reservations/${id}`,
      data: {
        status,
      },
    });

    router.replace(router.asPath);
  };

  return (
    <MainLayout>
      {isVisible && <NewBrandModal onClose={onClose} />}
      <div className="container">
        <SectionTitle title="Rezerwacje" />
        <table className="table-auto w-full bg-white border rounded-md overflow-hidden shadow-lg">
          <thead className="block border-b py-2 text-white bg-red-500">
            <tr className="flex">
              <th className="w-20">Status</th>
              <th className="w-40">ID</th>
              <th className="flex-1">Imie i nazwisko</th>
              <th className="flex-1">Samochód</th>
              <th className="flex-1">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation._id}
                className="py-4 flex border-b last:border-b-0 hover:bg-gray-100 transition-colors"
              >
                <td className="w-20 flex items-center justify-center text-xl">
                  {reservation.status === 'new' && <FaClock className="text-yellow-500" />}
                  {reservation.status === 'accepted' && <FaCheckSquare className="text-green-500" />}
                  {reservation.status === 'rejected' && <FaTimes className="text-red-500" />}
                </td>
                <td className="w-40 flex items-center justify-center">{reservation.shortId}</td>
                <td className="flex-1 flex items-center justify-center">
                  {reservation.user.firstName} {reservation.user.lastName}
                </td>
                <td className="flex-1 flex items-center justify-center">
                  {reservation.car.brand.name} {reservation.car.model}
                </td>
                <td className="flex-1 flex justify-center space-x-2">
                  <Button bordered onClick={() => handleStatusChange(reservation._id, 'accepted')}>
                    Potwierdź
                  </Button>
                  <Button bordered onClick={() => handleStatusChange(reservation._id, 'rejected')}>
                    Odrzuć
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
        destination: '/logowanie',
        permanent: false,
      },
    };
  }

  const {data} = await axios(`${server}/api/reservations`, {
    headers: {
      cookie: ctx.req.headers.cookie,
    },
  });

  return {
    props: {
      session,
      reservations: data,
    },
  };
};

export default BrandsPage;
