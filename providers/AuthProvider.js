import React, {useEffect} from 'react';
import {useSession} from 'next-auth/react';
import MainLayout from '../layouts/MainLayout';

const AuthProvider = ({children, component}) => {
  const {data: session, status} = useSession({
    required: true,
  });
  const isUser = !!session.user;
  // eslint-disable-next-line react/prop-types
  const pageRole = component.auth.role;

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (status === 'loading') return null;
  }, [status]);

  if (isUser && pageRole === session.user.role) {
    return children;
  }

  if (isUser && pageRole !== session.user.role) {
    return (
      <MainLayout>
        <div className="container">
          <h1>Nie możesz tutaj wejść</h1>
        </div>
      </MainLayout>
    );
  }

  return null;
};

export default AuthProvider;
