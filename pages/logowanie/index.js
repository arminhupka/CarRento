import React from 'react';
import Head from 'next/head';
import {getSession, signIn} from 'next-auth/react';
import {useFormik} from 'formik';

// Layout
import MainLayout from '../../layouts/MainLayout';

// Components
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import PageHeader from '../../components/PageHeader/PageHeader';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      await signIn('credentials', {email: values.email, password: values.password});
    },
  });

  return (
    <>
      <Head>
        <title>Logowanie | CarRento</title>
        <meta name="robots" content="noindex" />
      </Head>
      <MainLayout>
        <PageHeader title="Logowanie" />
        <div className="container">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0">
            <div className="flex-1 p-4 bg-white border rounded-md shadow-lg">
              <SectionTitle title="Zaloguj się" />
              <form className="w-full mt-4 flex flex-col space-y-4" onSubmit={formik.handleSubmit}>
                <div>
                  <label className="block mb-2 text-black font-semibold">Adres email</label>
                  <Input
                    type="text"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                </div>
                <div>
                  <label className="block mb-2 text-black font-semibold">Hasło</label>
                  <Input
                    type="password"
                    placeholder="Hasło"
                    id="password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                </div>

                <Button type="submit">Zaloguj</Button>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({req: ctx.req});

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {session},
  };
};

export default LoginPage;
