import React, { useEffect, useState } from 'react';
import { useAuth } from '../hooks/auth';
import { Loading } from '../components/Loading';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import AppDesatualizado from '../pages/AppDesatualizado';

function Routes(): React.JSX.Element {
 
  const { loading, loggedIn, versaoAplicativo, loadingVersao, permissaoDispositivosConectados } = useAuth();

  if (loading) {
    return (<Loading />)
  }

  return loggedIn 
          ? !versaoAplicativo 
              ? loadingVersao ? <Loading /> : <AppDesatualizado /> 
              : <AppRoutes /> 
          : <AuthRoutes />;

};

export default Routes;
