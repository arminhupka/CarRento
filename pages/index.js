import React from 'react';
import Head from 'next/head';

// Utils
import api from '../utils/api';

// Layout
import MainLayout from '../layouts/MainLayout';

// Components
import Hero from '../components/Hero/Hero';
import SearchBar from '../components/SearchBar/SearchBar';
import WhyUs from '../components/WhyUs/WhyUs';
import FeaturedCar from '../components/FeaturedCar/FeaturedCar';
import LastAdded from '../components/LastAddedCars/LasAddedCars';

const HomePage = ({cars}) => (
  <>
    <Head>
      <title>CarRento | Wypożyczalnia samochodów</title>
    </Head>
    <MainLayout>
      <Hero />
      <LastAdded cars={cars} />
      <WhyUs />
    </MainLayout>
  </>
);

export const getServerSideProps = async () => {
  const {data} = await api('/api/cars?limit=3');

  return {
    props: {
      cars: data,
    },
  };
};

export default HomePage;
