import React from 'react';
import {useRouter} from 'next/router';
import axios from 'axios';

// Layout
import MainLayout from '../../../layouts/MainLayout';

// Hooks
import useModalState from '../../../hooks/useModalState';

// Utils
import api from '../../../utils/api';

// Components
import PageHeader from '../../../components/PageHeader/PageHeader';
import Button from '../../../components/Button/Button';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import NewInsuranceModal from '../../../components/Modal/NewInsuranceModal/NewInsuranceModal';

const InsurancesPage = ({insurances}) => {
  const router = useRouter();
  const {isVisible, onOpen, onClose} = useModalState();

  const handleInsuranceRemove = async (id) => {
    await axios({
      method: 'DELETE',
      url: `/api/insurances/${id}`,
    });

    router.replace(router.asPath);
  };

  return (
    <MainLayout>
      {isVisible && <NewInsuranceModal onClose={onClose} />}
      <PageHeader title="Administracja" />
      <div className="container">
        <SectionTitle withButton title="Ubezpieczenia" buttonTitle="Dodaj +" buttonAction={onOpen} />
        <table className="table-auto w-full bg-white border rounded-md overflow-hidden shadow-lg">
          <thead className="block border-b py-2 text-white bg-red-500">
            <tr className="flex">
              <th className="flex-1">Wariant</th>
              <th className="flex-1">Akcja</th>
            </tr>
          </thead>
          <tbody>
            {insurances.map((option) => (
              <tr key={option._id} className="py-4 flex border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <td className="flex-1 flex items-center justify-center">{option.name}</td>
                <td className="flex-1 flex justify-center">
                  <Button bordered onClick={() => handleInsuranceRemove(option._id)}>
                    Usuń
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

export const getServerSideProps = async () => {
  const {data} = await api('/api/insurances');

  return {
    props: {
      insurances: data,
    },
  };
};

export default InsurancesPage;
