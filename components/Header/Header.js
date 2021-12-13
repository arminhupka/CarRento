import React from 'react';
import {signOut, useSession} from 'next-auth/react';
import Link from 'next/link';
import {FaBars} from 'react-icons/fa';

// Hooks
import useModalState from '../../hooks/useModalState';

// Components
import TopBar from './TopBar/TopBar';
import Nav from './Nav/Nav';
import LinkButton from '../LinkButton/LinkButton';
import Button from '../Button/Button';

const Header = () => {
  const {data: session, status} = useSession();
  const {isVisible, onToggle} = useModalState();

  if (status === 'loading') {
    return null;
  }

  const handleLogout = () => signOut();

  return (
    <header className="border-b bg-white">
      <TopBar />
      <div className="container py-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          <Link href="/">
            <a>
              car<span className="text-red-600">Rento</span>
            </a>
          </Link>
        </h1>
        <Nav visible={isVisible} />
        <div className="hidden lg:flex space-x-4">
          {!session && <LinkButton href="/zaloguj">Zaloguj się</LinkButton>}
          {session && session.user.role === 'admin' && (
            <LinkButton bordered href="/admin">
              Administracja
            </LinkButton>
          )}
          {session && <Button onClick={handleLogout}>Wyloguj</Button>}
        </div>
        <div className="lg:hidden">
          <button type="button" onClick={onToggle}>
            <FaBars className="text-3xl text-red-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
