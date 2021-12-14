import React from 'react';
import {CgSpinner} from 'react-icons/cg';

const Loader = () => (
  <div className="flex justify-center items-center">
    <div className="text-9xl text-red-500 animate-spin">
      <CgSpinner />
    </div>
  </div>
);

export default Loader;
