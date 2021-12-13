import React from 'react';
import {FaEnvelope, FaPhone} from 'react-icons/fa';

const TopBar = () => (
  <div className="bg-red-500">
    <div className="container py-4 flex justify-center lg:justify-start items-center space-x-8 text-sm font-semibold text-white">
      <div className="flex items-center flex space-x-2">
        <FaEnvelope />
        <span>kontakt@carrento.pl</span>
      </div>
      <div className="flex items-center flex space-x-2">
        <FaPhone />
        <span>556-543-665</span>
      </div>
    </div>
  </div>
);

export default TopBar;
