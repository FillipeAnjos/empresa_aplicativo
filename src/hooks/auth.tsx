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
  const [loading, setLoading] = useState(false);

  const [versaoAplicativo, setVersaoAplicativo] = useState<boolean>(false);
  const [loadingVersao, setLoadingVersao] = useState<boolean>(true);

  useEffect(() => {

    setLoading(true);

    async function loadUserStorageData(): Promise<void> {  

      var userLogado = await AuthService.usuarioRepository.get();

      if(userLogado != null && userLogado != ''){
        setLoggedIn(true);
        setLoading(false);
      }

      setLoading(false);
    }
    
    loadUserStorageData();

  }, [loggedIn]);

  async function signOut() {
    
    await AuthService.logout();
    
    setLoggedIn(false);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);

  }

  async function signIn({login, senha}: SignInCredentials) {

      var ok: any = await AuthService.loginUsuario(login, senha);

      if(ok.error){
        setLoggedIn(false);
        setLoading(false);
        throw new Error();
      }

      if(ok){
        setLoggedIn(true);

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 900);

      }else{
        setLoggedIn(false);
        setLoading(false);
        throw new Error();
      }

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