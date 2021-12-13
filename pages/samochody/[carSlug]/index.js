import React from 'react';

import Image from 'next/image';

// Utils
import api from '../../../utils/api';

// Layout
import MainLayout from '../../../layouts/MainLayout';

// Components
import Title from '../../../components/Title/Title';
import CarDetails from '../../../components/CarDetails/CarDetails';
import ReservationSidebar from '../../../components/ReservationSidebar/ReservationSidebar';
import Modal from '../../../components/Modal/Modal';

const CarPage = ({car}) => (
  <MainLayout>
    <div className="container grid grid-cols-1 lg:grid-cols-10 gap-8">
      <article className="lg:col-start-4 lg:col-span-8 lg:row-start-1 flex flex-col gap-8">
        <Title>
          {car.brand.name} {car.model}
        </Title>
        <div className="cars__image-wrapper bg-white">
          <Image
            src={car.image}
            layout="responsive"
            height={300}
            width={500}
            objectFit="cover"
            objectPosition="center"
            quality={100}
          />
        </div>
        <CarDetails description={car.description} specification={car.specification} equipment={car.equipment} />
      </article>
      <aside className="lg:col-start-1 lg:col-span-3 lg:row-start-1">
        <ReservationSidebar car={car} />
      </aside>
    </div>
  </MainLayout>
);

export const getServerSideProps = async (ctx) => {
  const slug = ctx.query.carSlug;

  try {
    const {data} = await api(`/api/cars/${slug}`);
    return {
      props: {
        car: data,
      },
    };
  } catch (err) {
    if (err.response.status === 404) {
      return {
        redirect: {
          permanent: false,
          destination: '/404',
        },
      };
    }
  }

  return null;
};

export default CarPage;
