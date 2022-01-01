import React, {useEffect, useState} from 'react';
import Head from 'next/head';
import moment from 'moment';
import 'moment/locale/pl';
import axios from 'axios';

// Hooks
import useModalState from '../../hooks/useModalState';

// Layout
import MainLayout from '../../layouts/MainLayout';

// Components
import PageHeader from '../../components/PageHeader/PageHeader';

// Utils
import {daysDiff} from '../../utils/rentCalc';
import server from '../../utils/server';

// Components
import Button from '../../components/Button/Button';
import UserFormModal from '../../components/Modal/UserFormModal/UserFormModal';
import Insurances from '../../components/Insurances/Insurances';
import ReservationDetails from '../../components/ReservationDetails/ReservationDetails';

moment.locale('pl');

const overAllCost = (days, carPrice, insurances, insuranceId) => {
  const carReservationPrice = carPrice * days;
  const selectedInsurancePrice = insurances.filter((ins) => ins._id === insuranceId)[0]?.price || 0;

  return carReservationPrice + selectedInsurancePrice * days;
};

const SummaryPage = ({insurances}) => {
  const {isVisible, onOpen, onClose} = useModalState();

  const [reservation, setReservation] = useState(null);
  const [car, setCar] = useState(null);

  const [insuranceId, setInsuranceId] = useState(insurances[1]._id);

  useEffect(() => {
    setReservation(JSON.parse(localStorage.getItem('reservation')));
    setCar(JSON.parse(localStorage.getItem('selectedCar')));
  }, []);

  useEffect(() => {
    localStorage.setItem('insurance', insuranceId);
  }, [insuranceId]);

  if (!reservation || !car) {
    return (
      <>
        <Head>
          <title>Podsumowanie | CarRento</title>
          <meta name="robots" content="noindex" />
        </Head>
        <MainLayout>
          <div className="container">
            <h1>Nie wybrałeś jeszcze samochodu</h1>
          </div>
        </MainLayout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Podsumowanie rezerwacji | carRento</title>
        <meta name="robots" content="noindex" />
      </Head>
      {isVisible && <UserFormModal onClose={onClose} />}
      <MainLayout>
        <PageHeader title="Podsumowanie" />
        <div className="container">
          <ReservationDetails reservation={reservation} car={car} />
          <Insurances
            insurancesArr={insurances}
            selectedInsurance={insuranceId}
            setSelectedInsurance={setInsuranceId}
          />
          <section className="mt-8 space-y-4">
            <div className="pb-4 mb-4 flex items-center justify-between border-b">
              <h3 className="text-3xl font-bold">Podsumowanie kosztów</h3>
            </div>
            <div className="p-4 flex flex-col items-end bg-white border rounded-md shadow-md">
              <p className="text-xl font-semibold">Całkowity koszt wynajmu</p>
              <span className="text-3xl text-red-500 font-bold">
                {overAllCost(
                  daysDiff(reservation.pickupDate, reservation.returnDate),
                  car.price,
                  insurances,
                  insuranceId,
                )}{' '}
                PLN
              </span>
            </div>
            <div className="flex flex-col">
              <Button type="button" onClick={onOpen}>
                Przejdź dalej
              </Button>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  const {data: insurances} = await axios(`${server}/api/insurances`);

  return {
    props: {
      insurances,
    },
  };
};

export default SummaryPage;
