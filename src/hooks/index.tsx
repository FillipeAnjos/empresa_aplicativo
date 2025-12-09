import React from 'react';

import { AuthProvider } from './auth';
import { LoggedProvider } from './logged';

interface Props {
  children: React.ReactNode;
}

const AppProvider: React.FC<Props> = ({children}) => (
  <AuthProvider>
    <LoggedProvider>
      {children}
    </LoggedProvider>
  </AuthProvider>
);

export default AppProvider;
