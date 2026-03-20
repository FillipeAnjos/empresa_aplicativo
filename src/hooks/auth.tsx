import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AuthService from '../services/AuthService';

type SignInCredentials = {
  login: string;
  senha: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;    
  loading: boolean;
  loggedIn: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const [versaoAplicativo, setVersaoAplicativo] = useState<boolean>(false);
  const [loadingVersao, setLoadingVersao] = useState<boolean>(true);

  async function signOut() {
    
    /*await AuthService.logout();
    
    setLoggedIn(false);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);*/

  }

  async function signIn({login, senha}: SignInCredentials) {

      /*var ok: any = await AuthService.loginPrimeiroSaberes(login, senha, DeviceInfo.getModel(), DeviceInfo.getUniqueId());

      if(!ok.sucesso && ok.limite_dispositivos){
        return ok;
      }

      if(ok){
        setLoggedIn(true);

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 900);

      }else{
        setLoggedIn(false);
        throw new Error();
      }*/

  }  

  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------

  useEffect(() => {
 
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signIn,
        signOut,
        loggedIn
      }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export {
  AuthProvider,
  useAuth
}