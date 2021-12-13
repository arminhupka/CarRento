import React, {useState} from 'react';
import {Formik} from 'formik';
import axios from 'axios';
import {useRouter} from 'next/router';

// Components
import Modal from '../Modal';
import Button from '../../Button/Button';

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
            // await axios({
            //   method: 'POST',
            //   url: '/api/insurances',
            //   data: {
            //     ...values,
            //   },
            // });
            console.log(values);
            setLoading(false);
            onClose();
            router.replace(router.asPath);
          }}
        >
          {({handleChange, handleSubmit, setFieldValue}) => (
            <form onSubmit={handleSubmit}>
              <div>
                <label>Szkoda z OC</label>
                <select
                  id="type"
                  name="type"
                  onChange={(e) => setFieldValue('oc', Number(e.target.value))}
                  className="w-full py-2 px-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option hidden="true">Wybierz rodzaj nawozia</option>
                  <option disabled="disabled" default="true">
                    Wybierz rodzaj nadwozia
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
