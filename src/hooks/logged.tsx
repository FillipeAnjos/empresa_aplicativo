import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    
} from '../services/ApiService';

type LoggedContextData = {
    loading: boolean;
};

type LoggedProviderProps = {
  children: ReactNode;
};

const LoggedContext = createContext({} as LoggedContextData);

function LoggedProvider({children}: LoggedProviderProps) {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
    }, []);

    return (
        <LoggedContext.Provider
            value={{
                loading,
            }}
        >
            {children}
        </LoggedContext.Provider>
    );


}

function useLogged(): LoggedContextData {
  const context = useContext(LoggedContext);
  return context;
}

export {
  LoggedProvider,
  useLogged
}