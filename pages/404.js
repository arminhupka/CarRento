import React from 'react';

// Layouts
import MainLayout from '../layouts/MainLayout';

const NotFoundPage = () => (
  <MainLayout>
    <div className="container">
      <header className="text-center">
        <h2 className="text-6xl font-bold text-red-500 before:content-['404'] before:absolute before:text-9xl">
          NOT FOUND
        </h2>
      </header>
    </div>
  </MainLayout>
);

export default NotFoundPage;
