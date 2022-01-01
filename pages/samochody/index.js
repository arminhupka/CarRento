import React, {useState, useEffect, useMemo} from 'react';
import Head from 'next/head';
import {FaFilter} from 'react-icons/fa';

// Hooks
import useModalState from '../../hooks/useModalState';

// Utils
import api from '../../utils/api';

// Layout
import MainLayout from '../../layouts/MainLayout';

// Components
import CarCard from '../../components/CarCard/CarCard';
import Select from '../../components/Select/Select';
import PageHeader from '../../components/PageHeader/PageHeader';
import Title from '../../components/Title/Title';

const CarsPage = ({cars, brands}) => {
  const {isVisible, onToggle} = useModalState();

  const [brandsList, setBrandsList] = useState([]);
  const [modelsList, setModelsList] = useState([]);

  const [currentBrand, setCurrentBrand] = useState('');
  const [currentModel, setCurrentModel] = useState('');
  const [filtered, setFiltered] = useState([]);

  const handleBrandClear = () => setCurrentBrand('');
  const handleModelClear = () => setCurrentModel('');

  useMemo(() => {
    brands.forEach((brand) => {
      setBrandsList((prevState) => [...prevState, brand.name]);
    });
  }, []);

  useMemo(() => {
    const filteredCars = cars.filter((car) => car.brand.name === currentBrand);
    const avaiableModels = filteredCars.map((car) => car.model);

    setModelsList(avaiableModels);
  }, [currentBrand]);

  useMemo(() => {
    setFiltered(
      cars.filter(
        (car) =>
          car.brand.name.toLowerCase().includes(currentBrand.toLowerCase()) &&
          car.model.toLowerCase().includes(currentModel.toLowerCase()),
      ),
    );
  }, [currentBrand, currentModel]);

  useEffect(() => {
    setCurrentModel('');
  }, [currentBrand]);

  return (
    <>
      <Head>
        <title>Samochody | CarRento</title>
      </Head>
      <MainLayout>
        <PageHeader title="Samochody" />
        <button
          type="button"
          className="lg:hidden fixed bottom-6 left-6 p-4 bg-red-500 rounded-full shadow-xl z-40"
          onClick={onToggle}
        >
          <FaFilter className="text-3xl text-white" />
        </button>
        <div className="container">
          <div className="md:grid lg:grid-cols-10 gap-10">
            <aside
              className={`sidebar fixed top-0 left-0 p-4 lg:p-0 w-full h-full bg-white lg:bg-transparent z-20 transform ${
                isVisible ? 'translate-y-0' : 'translate-y-full'
              } transition lg:block lg:relative lg:transform-none lg:col-span-3`}
            >
              <div className="lg:sticky lg:top-4  bg-white space-y-4 lg:bg-white rounded-md md:shadow-none lg:shadow-xl">
                <Title small>Filtrowanie</Title>
                <div className="lg:p-4 space-y-4">
                  <Select
                    data={brandsList}
                    title="Wybierz markę"
                    selected={currentBrand}
                    onSelect={setCurrentBrand}
                    onClear={handleBrandClear}
                  />
                  <Select
                    data={modelsList}
                    title="Wybierz model"
                    selected={currentModel}
                    onSelect={setCurrentModel}
                    onClear={handleModelClear}
                  />
                </div>
              </div>
            </aside>
            <div className="main grid md:grid-cols-2 lg:col-span-7 gap-8">
              {filtered.length === 0 && <span className="text-xl font-semibold">Brak wyników</span>}
              {filtered.map((car) => (
                <CarCard
                  key={car._id}
                  id={car._id}
                  model={car.model}
                  brand={car.brand.name}
                  type={car.type}
                  transmission={car.specification.transmission}
                  fuel={car.specification.fuel}
                  seats={car.specification.seats}
                  slug={car.slug}
                  image={car.image}
                  price={car.price}
                />
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async () => {
  const {data} = await api.get('/api/cars');
  const {data: brands} = await api.get('/api/brands');

  return {
    props: {
      cars: data,
      brands,
    },
  };
};

export default CarsPage;
