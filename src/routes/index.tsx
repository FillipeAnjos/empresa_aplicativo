import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

function Routes(): React.JSX.Element {
 
  const { loading, loggedIn } = useAuth();

  if (loading) {
    return (<Loading />)
  }

  return loggedIn 
          ? <AppRoutes /> 
          : <AuthRoutes />;

};

export default Routes;
