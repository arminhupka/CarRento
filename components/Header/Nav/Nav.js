import React from 'react';
import Link from 'next/link';
import {useSession} from 'next-auth/react';

// Components
import LinkButton from '../../LinkButton/LinkButton';

const Nav = ({visible}) => {
  const {data: session} = useSession();

  return (
    <nav
      className={`fixed top-0 left-0 w-3/4 h-full bg-gray-900 transform z-20 lg:relative lg:w-auto lg:h-auto lg:bg-transparent lg:translate-x-0 ${
        visible ? 'translate-x-0' : '-translate-x-full'
      } transition-transform`}
    >
      <ul className="lg:flex lg:space-x-8">
        {session && (
          <li className="lg:hidden">
            <LinkButton href="/konto">Twoje Konto</LinkButton>
          </li>
        )}
        <li className="border-b border-gray-800 lg:border-0">
          <Link href="/">
            <a className="block p-4 font-semibold text-gray-300 lg:text-gray-900 lg:hover:text-red-500 transition-colors">
              Strona Główna
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-800 lg:border-0">
          <Link href="/samochody">
            <a className="block p-4 font-semibold text-gray-300 lg:text-gray-900 lg:hover:text-red-500 transition-colors">
              Samochody
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-800 lg:border-0">
          <Link href="/">
            <a className="block p-4 font-semibold text-gray-300 lg:text-gray-900 lg:hover:text-red-500 transition-colors">
              Oferta
            </a>
          </Link>
        </li>
        <li className="border-b border-gray-800 lg:border-0">
          <Link href="/">
            <a className="block p-4 font-semibold text-gray-300 lg:text-gray-900 lg:hover:text-red-500 transition-colors">
              Kontakt
            </a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
