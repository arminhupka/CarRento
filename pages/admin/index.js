import React from 'react';
import {getSession, useSession} from 'next-auth/react';
import {FaCar, FaBrain, FaResearchgate} from 'react-icons/fa';

// Layouts
import MainLayout from '../../layouts/MainLayout';
import AdminButton from '../../components/AdminButton/AdminButton';
import PageHeader from '../../components/PageHeader/PageHeader';

const AdminPage = () => {
  useSession({
    required: true,
  });

  return (
    <MainLayout>
      <PageHeader title="Administracja" />
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <AdminButton href="/admin/samochody" title="Samochody" icon={<FaCar />} />
          <AdminButton href="/admin/marki" title="Marki" icon={<FaBrain />} />
          <AdminButton href="/admin/rezerwacje" title="Rezerwacje" icon={<FaResearchgate />} />
        </div>
      </div>
    </MainLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({req: ctx.req});

  if (!session) {
    return {
      redirect: {
        destination: '/zaloguj',
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};

AdminPage.auth = {
  role: 'admin',
};

export default AdminPage;
