import React, {useState} from 'react';
import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from 'next/router';

// Components
import Modal from '../Modal';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import Loader from '../../Loader/Loader';

const NewCarModal = ({brands, onClose}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Modal title="Dodaj nowy samochód" onClose={onClose}>
      {loading && <Loader />}
      {!loading && (
        <Formik
          initialValues={{
            model: '',
            brand: '',
            description: '',
            type: '',
            fuel: '',
            hp: '',
            engine: '',
            transmission: '',
            productionYear: '',
            seats: '',
            price: 0,
            file: null,
          }}
          onSubmit={async (values) => {
            setLoading(true);
            const formData = new FormData();
            formData.append('model', values.model);
            formData.append('brand', values.brand);
            formData.append('description', values.description);
            formData.append('type', values.type);
            formData.append('fuel', values.fuel);
            formData.append('hp', values.hp);
            formData.append('engine', values.engine);
            formData.append('transmission', values.transmission);
            formData.append('productionYear', values.productionYear);
            formData.append('seats', values.seats);
            formData.append('price', values.price);
            formData.append('file', values.file);
            await axios({
              method: 'POST',
              url: '/api/cars',
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              data: formData,
            });
            setLoading(false);
            onClose();
            router.replace(router.asPath);
          }}
        >
          {({setFieldValue, handleSubmit, handleChange}) => (
            <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-black font-semibold">Model</label>
                <Input id="model" name="model" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Marka</label>
                <select
                  id="brand"
                  name="brand"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz markę</option>
                  <option disabled="disabled" default="true">
                    Wybierz markę
                  </option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Cena</label>
                <Input id="price" name="price" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Opis</label>
                <Input id="description" name="description" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Typ nadwozia</label>
                <select
                  id="type"
                  name="type"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz rodzaj nawozia</option>
                  <option disabled="disabled" default="true">
                    Wybierz rodzaj nadwozia
                  </option>
                  <option value="Coupe">Coupe</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Kabriolet">Kabriolet</option>
                  <option value="Kombi">Kombi</option>
                  <option value="Kompakt">Kompakt</option>
                  <option value="Minivan">Minivan</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Paliwo</label>
                <Input id="fuel" name="fuel" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Moc</label>
                <Input id="hp" name="hp" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Silnik</label>
                <Input id="engine" name="engine" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Skrzynia biegów</label>
                <select
                  id="transmission"
                  name="transmission"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz skrzynię biegów</option>
                  <option disabled="disabled" default="true">
                    Wybierz skrzynię biegów
                  </option>
                  <option value="Manualna">Manualna</option>
                  <option value="Automatyczna">Automatyczna</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Rok Produkcji</label>
                <Input id="productionYear" name="productionYear" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Siedzenia</label>
                <Input id="seats" name="seats" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Zdjęcie</label>
                <Input type="file" id="file" name="file" onChange={(e) => setFieldValue('file', e.target.files[0])} />
              </div>
              <Button type="submit">Wyślij</Button>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default NewCarModal;
