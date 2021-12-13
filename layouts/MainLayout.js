import React from 'react';

// Components
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const MainLayout = ({children}) => (
  <>
    <Header />
    <main className="py-8 flex-1">{children}</main>
    <Footer />
  </>
);

export default MainLayout;
