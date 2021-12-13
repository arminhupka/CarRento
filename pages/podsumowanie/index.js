import React, {useEffect, useState} from 'react';
import moment from 'moment';
import 'moment/locale/pl';
import Image from 'next/image';
import Head from 'next/head';

// Hooks
import useModalState from '../../hooks/useModalState';

// Layout
import MainLayout from '../../layouts/MainLayout';

// Components
import PageHeader from '../../components/PageHeader/PageHeader';
import InsuranceCard from '../../components/InsuranceCard/InsuranceCard';

// Utils
import {daysDiff} from '../../utils/rentCalc';

// Data
import insurance from '../../data/insurance';
import Button from '../../components/Button/Button';
import UserFormModal from '../../components/Modal/UserFormModal/UserFormModal';

moment.locale('pl');

const overAllCost = (days, carPrice, insuranceId) => {
  const carReservationPrice = carPrice * days;
  const selectedInsurance = insurance.filter((ins) => ins.id === insuranceId);

  return carReservationPrice + selectedInsurance[0].price * days;
};

const SummaryPage = () => {
  const {isVisible, onOpen, onClose} = useModalState();

  const [reservation, setReservation] = useState(null);
  const [car, setCar] = useState(null);

  const [insuranceId, setInsuranceId] = useState(2);

  useEffect(() => {
    setReservation(JSON.parse(localStorage.getItem('reservations')));
    setCar(JSON.parse(localStorage.getItem('selectedCar')));
  }, []);

  if (!reservation || !car) {
    return (
      <>
        <Head>
          <title>Podsumowanie rezerwacji | carRento</title>
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
      </Head>
      {isVisible && <UserFormModal onClose={onClose} />}
      <MainLayout>
        <PageHeader title="Podsumowanie" />
        <div className="container">
          <section className="mb-4 flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">Informacje</h3>
              <ul className="mt-1">
                <li className="py-2 border-b flex justify-between">
                  <span>Data odbioru</span>
                  <span className="font-semibold text-gray-900">{moment(reservation.pickupDate).calendar()}</span>
                </li>
                <li className="py-2 border-b flex justify-between">
                  <span>Miejsce odbioru</span>
                  <span className="font-semibold text-gray-900">{reservation.pickupPlace}</span>
                </li>
                <li className="py-2 border-b flex justify-between">
                  <span>Data zwrotu</span>
                  <span className="font-semibold text-gray-900">{moment(reservation.returnDate).calendar()}</span>
                </li>
                <li className="py-2 border-b flex justify-between">
                  <span>Miejsce zwrotu</span>
                  <span className="font-semibold text-gray-900">{reservation.returnPlace}</span>
                </li>
                <li className="py-2 border-b flex justify-between">
                  <span>Długość trwania wynajmu</span>
                  <span className="font-semibold text-gray-900">
                    {daysDiff(reservation.pickupDate, reservation.returnDate)} dni
                  </span>
                </li>
                <li className="py-2 flex justify-end justify-between">
                  <span>Koszt wynajmu</span>
                  <span className="font-bold text-red-500">
                    {daysDiff(reservation.pickupDate, reservation.returnDate) * car.price} PLN
                  </span>
                </li>
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative h-full rounded-md overflow-hidden">
                <div className="absolute w-full h-full p-4 flex items-end bg-gradient-to-t from-black/50 to-transparent z-10">
                  <span className="text-3xl text-white font-semibold">
                    {car.brand} {car.model}
                  </span>
                </div>
                <Image src={car.image} layout="fill" objectFit="cover" objectPosition="center" />
              </div>
            </div>
          </section>
          <section className="mt-8">
            <div className="pb-4 mb-4 flex items-center justify-between border-b">
              <h3 className="text-3xl font-bold">Ubezpieczenie</h3>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {insurance.map((option) => (
                <InsuranceCard key={option.id} details={option} selected={insuranceId} setInsurance={setInsuranceId} />
              ))}
            </div>
          </section>
          <section className="mt-8 space-y-4">
            <div className="pb-4 mb-4 flex items-center justify-between border-b">
              <h3 className="text-3xl font-bold">Podsumowanie kosztów</h3>
            </div>
            <div className="p-4 flex flex-col items-end bg-white border rounded-md shadow-md">
              <p className="text-xl font-semibold">Całkowity koszt wynajmu</p>
              <span className="text-3xl text-red-500 font-bold">
                {overAllCost(daysDiff(reservation.pickupDate, reservation.returnDate), car.price, insuranceId)} PLN
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

export default SummaryPage;
