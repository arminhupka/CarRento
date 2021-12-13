import React from 'react';
import FooterLinkWidget from './FooterLinkWidget/FooterLinkWidget';

const Footer = () => (
  <footer className="text-white">
    <div className="footer-main bg-gray-800">
      <div className="container py-20 md:flex md:space-x-20">
        <FooterLinkWidget title="Information" />
        <FooterLinkWidget title="Inventory" />
        <FooterLinkWidget title="Useful Links" />
      </div>
      <div className="footer-copy bg-gray-900">
        <div className="container py-8">
          <div>
            <span className="text-gray-400 font-semibold">
              Developed by <span className="text-red-500">@arminhupka</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
