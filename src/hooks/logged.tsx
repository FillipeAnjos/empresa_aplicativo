import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import { database } from '../databases';
import { LancamentoModel } from '../databases/models/lancamentoModel';
import { buscarDadosUsuario as buscarDadosUsuarioService } from '../services/ApiService';

type LoggedContextData = {
    loading: boolean;
    buscarLancamentoLocalLogged: () => Promise<LancamentoModel[]>;
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

    async function buscarLancamentoLocalLogged() {

        var dados = await buscarDadosUsuarioService();
        var idUsuario = dados.usuario.id;
                
        const lancamentosLocal = database.get<LancamentoModel>('lancamento');
        const res = await lancamentosLocal.query().fetch();

        var resposta: LancamentoModel[] = [];
    
        new Promise(() => {
            res.forEach(async (l: any) => {
                l._raw.usuario_id == idUsuario ? resposta.push(l) : false;
            });
        });

        return resposta;
    
    }

    return (
        <LoggedContext.Provider
            value={{
                loading,
                buscarLancamentoLocalLogged
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