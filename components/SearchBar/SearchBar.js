import React, {useState} from 'react';
import {useRouter} from 'next/router';

// Components
import Select from '../Select/Select';
import Button from '../Button/Button';

// Dummy Data
const brands = ['Audi', 'BMW', 'Citroen', 'Fiat', 'Ferrari'];
const places = ['Katowice', 'Warszawa', 'Zabrze', 'Kielce'];

const SearchBar = () => {
  const router = useRouter();

  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const params = new URLSearchParams({
    brand: selectedBrand,
    model: selectedModel,
    city: selectedCity,
  }).toString();

  const handleButton = (e) => {
    e.preventDefault();
    router.push(`/samochody?${params}`);
  };

  return (
    <section className="relative -mt-16">
      <div className="container">
        <div className="p-8 flex flex-col flex-wrap md:flex-row gap-4 bg-gray-800 rounded-md shadow-lg">
          <div className="flex-1">
            <Select white data={brands} title="Wybierz samochód" selected={selectedBrand} onSelect={setSelectedBrand} />
          </div>
          <div className="flex-1">
            <Select white data={brands} title="Wybierz model" selected={selectedModel} onSelect={setSelectedModel} />
          </div>
          {/*<div className="w-full lg:w-auto flex">*/}
          {/*  <Button className="w-full" onClick={handleButton}>*/}
          {/*    Znajdź samochód*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;
