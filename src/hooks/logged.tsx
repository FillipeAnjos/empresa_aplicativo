import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {
    listarHistorico as listarHistoricoApiService,
} from '../services/ApiService';

interface listarHistoricoI{
    pagina: number;
    intervalo: number;
    pesquisa?: string;
}

type LoggedContextData = {
    loading: boolean;
    buscarHistorico_logged: ({pagina, intervalo}: listarHistoricoI) => Promise<any>;
    historicoLogged: any;
    atualizarHistorico_logged: any;
};

type LoggedProviderProps = {
  children: ReactNode;
};

const LoggedContext = createContext({} as LoggedContextData);

function LoggedProvider({children}: LoggedProviderProps) {
  
    const [loggedIn, setLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    const [historicoLogged, setHistoricoLogged] = useState<any>(0);

    useEffect(() => {
        
    }, []);

    return (
        <LoggedContext.Provider
            value={{
                loading,
                buscarHistorico_logged,
                historicoLogged,
                atualizarHistorico_logged,
            }}
        >
            {children}
        </LoggedContext.Provider>
    );

    async function buscarHistorico_logged({pagina, intervalo}: listarHistoricoI){
        
        var pesquisar = {
            pagina: pagina, 
            intervalo: intervalo
        }
        
        const historicoLivros = await listarHistoricoApiService();

        return historicoLivros;

    }

    function atualizarHistorico_logged(){
        
        console.log("----- Atualizado Historico -----");

        var condHist = historicoLogged + 1;
        setHistoricoLogged(condHist);

    }

}

function useLogged(): LoggedContextData {
  const context = useContext(LoggedContext);
  return context;
}

export {
  LoggedProvider,
  useLogged
}