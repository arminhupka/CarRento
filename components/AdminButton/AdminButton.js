import React from 'react';
import Link from 'next/link';

const AdminButton = ({title, icon, href}) => (
  <Link href={href}>
    <a className="last:col-span-3">
      <span className="group block p-8 flex flex-col items-center border rounded-md hover:bg-red-500">
        <span className="mb-4 text-4xl text-red-500 group-hover:text-white">{icon}</span>
        <span className="text-xl font-semibold group-hover:text-white">{title}</span>
      </span>
    </a>
  </Link>
);

export default AdminButton;
