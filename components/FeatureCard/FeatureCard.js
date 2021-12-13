import React from 'react';
import Separator from '../Seaparator/Separator';

const FeatureCard = ({title, description, icon}) => (
  <div className="group p-8 flex flex-col text-center border-2 border-gray-100 rounded-md shadow-xl hover:bg-red-500 hover:border-red-600 transition">
    <div className="mb-4 flex justify-center text-7xl text-red-500 group-hover:text-white">{icon}</div>
    <h2 className="text-xl font-bold group-hover:text-white">{title}</h2>
    <Separator className="bg-red-500 group-hover:bg-white" />
    <p className="text-gray-400 group-hover:text-white">{description}</p>
  </div>
);

export default FeatureCard;
