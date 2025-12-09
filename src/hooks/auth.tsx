import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { Alert, Linking } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AuthService from '../services/AuthService';
import { getVersaoApp } from '../services/ApiService';
import versaoAppPrimeirosaberes from '../services/versaoAppPrimeirosaberes';

type SignInCredentials = {
  login: string;
  password: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;    
  loading: boolean;
  loggedIn: boolean;
  versaoAplicativo: boolean;
  loadingVersao: boolean;
  permissaoDispositivosConectados: boolean | null;
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
  const [numeroVersao, setNumeroVersao] = useState<string>('');
  
  const [permissaoDispositivosConectados, setPermissaoDispositivosConectados] = useState<boolean | null>(true);

  async function signOut() {
    
    await AuthService.logout();
    
    setLoggedIn(false);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);

    getVersionApp();

  }

  async function signIn({login, password}: SignInCredentials) {

      var ok: any = await AuthService.loginPrimeiroSaberes(login, password, DeviceInfo.getModel(), DeviceInfo.getUniqueId());

      if(!ok.sucesso && ok.limite_dispositivos){
        return ok;
      }

      if(ok){
        setLoggedIn(true);

        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 900);

        getVersionApp();

      }else{
        setLoggedIn(false);
        throw new Error();
      }

  }

  async function getVersionApp() { 

    if(numeroVersao == ''){
    
      var version = await getVersaoApp();

      if(version.message == 'Expired token'){
        signOut();
        return;
      }

      if(version.sucesso){

        var verificado = version.versao.conteudo;
        //setNumeroVersao('1.5'); 
        setNumeroVersao(verificado);
        
        //var res = versaoAppPrimeirosaberes >= '1.5' ? true : false; 
        var res = versaoAppPrimeirosaberes >= verificado ? true : false;
        setVersaoAplicativo(res);
        setLoadingVersao(false);

      }else{
        setVersaoAplicativo(false);
        setLoadingVersao(false);
      }

    }else{

        var verificado: any = numeroVersao;
        
        var res = versaoAppPrimeirosaberes >= verificado ? true : false;
        setVersaoAplicativo(res);
        setLoadingVersao(false);

    }

  }

  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------

  async function verificarDispositivosConectados(){

    /*//setPermissaoDispositivosConectados(null);
        
    var phoneModel = DeviceInfo.getModel();
    var deviceId = DeviceInfo.getUniqueId();

    var qtdDispositivos = await verificarPermissaoQtdDispositivos(phoneModel, deviceId);

    if(!qtdDispositivos.sucesso){
      setPermissaoDispositivosConectados(false);
      Alert.alert('Mensagem', renderizarTitulo(qtdDispositivos.mensagem), [
        {
          text: 'Cancelar',
          onPress: () => cancelar(),
          //style: 'cancelar',
        },
        {text: 'Gerenciar Dispositivos', onPress: () => gerenciarDispositivos(qtdDispositivos.url_dispositivos) },
      ]);
    }else{
      setPermissaoDispositivosConectados(true);
    }*/

  }

  async function gerenciarDispositivos(url: string){

    /*Linking.openURL(url);

    setTimeout(async () => {
        await signOut();
        //RNRestart.Restart(); //Reiniciar o App  
    }, 1000); */     
  }

  function renderizarTitulo(titulo: string){
    /*titulo = titulo.replaceAll("\\n", "\n\n")
    return titulo;*/
  }

  async function cancelar(){
    /*await signOut();
    //RNRestart.Restart(); //Reiniciar o App    
    */    
  }

  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------------------------------

  useEffect(() => {
    async function loadUserStorageData(): Promise<void> {  

      var userLogado = await AuthService.usuarioRepository.get();

      if(userLogado != null && userLogado != ''){
        setLoggedIn(true);
        setLoading(false);
      }

      setLoading(false);

    }
    
    // verificarDispositivosConectados(); 
    getVersionApp();
    loadUserStorageData();

  }, [loggedIn]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signIn,
        signOut,
        loggedIn,
        versaoAplicativo,
        loadingVersao,
        permissaoDispositivosConectados,
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