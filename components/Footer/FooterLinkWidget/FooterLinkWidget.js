import React from 'react';

const FooterLinkWidget = ({title}) => (
  <div className="mb-12 lg:mb-0">
    <h2 className="mb-4 text-2xl font-semibold text-white">{title}</h2>
    <div>
      <ul className="font-semibold text-gray-400">
        <li className="mb-2 text-gray-400 hover:text-gray-200">
          <a href="#">Our Contacts</a>
        </li>
        <li className="mb-2 text-gray-400 hover:text-gray-200">
          <a href="#">About Us</a>
        </li>
        <li className="mb-2 text-gray-400 hover:text-gray-200">
          <a href="#">Privacy Policy</a>
        </li>
        <li className="mb-2 text-gray-400 hover:text-gray-200">
          <a href="#">FAQ</a>
        </li>
      </ul>
    </div>
  </div>
);

export default FooterLinkWidget;
