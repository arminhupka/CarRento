import React, {useState} from 'react';
import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from 'next/router';

// Components
import Modal from '../Modal';
import Button from '../../Button/Button';
import Input from '../../Input/Input';

const NewInsuranceModal = ({onClose}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <Modal title="Nowe ubezpieczenie" onClose={onClose}>
      {loading && <span>Dodawanie ...</span>}
      {!loading && (
        <Formik
          initialValues={{
            name: '',
            price: '',
            oc: false,
            assistance: false,
            participationInTheDamage: false,
            windowsDamage: false,
            wheelsDamage: false,
            totalLoss: 0,
            steal: 0,
            replacementCar: false,
          }}
          onSubmit={async (values) => {
            setLoading(true);
            await axios({
              method: 'POST',
              url: '/api/insurances',
              data: values,
            });
            setLoading(false);
            onClose();
            router.replace(router.asPath);
          }}
        >
          {({handleChange, handleSubmit, setFieldValue}) => (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <div>
                <label className="block mb-2 text-black font-semibold">Nazwa wariatnu</label>
                <Input id="name" name="name" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Cena z dzień</label>
                <Input id="price" name="price" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Szkoda z OC</label>
                <select
                  id="oc"
                  name="oc"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz opcje</option>
                  <option disabled="disabled" default="true">
                    Wybierz opcje
                  </option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Asssistance</label>
                <select
                  id="assistance"
                  name="assistance"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz opcje</option>
                  <option disabled="disabled" default="true">
                    Wybierz opcje
                  </option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Udział w szkodzie</label>
                <Input id="participationInTheDamage" name="participationInTheDamage" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Uszkodzenie szyb</label>
                <select
                  id="windowsDamage"
                  name="windowsDamage"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz opcje</option>
                  <option disabled="disabled" default="true">
                    Wybierz opcje
                  </option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Uszkodzenie kół</label>
                <select
                  id="wheelsDamage"
                  name="wheelsDamage"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz opcje</option>
                  <option disabled="disabled" default="true">
                    Wybierz opcje
                  </option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Szkoda całkowita</label>
                <Input id="totalDamage" name="totalDamage" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Kradzież</label>
                <Input id="steal" name="steal" onChange={handleChange} />
              </div>
              <div>
                <label className="block mb-2 text-black font-semibold">Auto zastępcze</label>
                <select
                  id="replacementCar"
                  name="replacementCar"
                  onChange={handleChange}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz opcje</option>
                  <option disabled="disabled" default="true">
                    Wybierz opcje
                  </option>
                  <option value="1">Tak</option>
                  <option value="0">Nie</option>
                </select>
              </div>
              <Button>Dodaj ubezpiczenie</Button>
            </form>
          )}
        </Formik>
      )}
    </Modal>
  );
};

export default NewInsuranceModal;
