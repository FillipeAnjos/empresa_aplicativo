import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
//import ApiService from '../services/ApiService';
const LENDO_KEY = 'continualendo';
const CONFIG_KEY = 'livroConfig';
const LIVRO_KEY = 'livro:';
const dirs = RNFetchBlob.fs.dirs;
export default class LivroRepository {
    static setContinueLendo = async (livro: any) => { 
        AsyncStorage.setItem(LENDO_KEY,JSON.stringify(livro));
    }
    static getContinueLendo = async () => { 
        var res = await AsyncStorage.getItem(LENDO_KEY);

        if(res == null || res == 'null' || res == undefined || res == ''){
            return null;
        }

        return JSON.parse(res);
    }

    static setConfig = async (key: any, value: any) => { 
        AsyncStorage.setItem(`${CONFIG_KEY}_${key}`,value);
    }
    static getConfig = async (key: any) => { 
        return await AsyncStorage.getItem(`${CONFIG_KEY}_${key}`);
    }
    static verifyDownload = async (id_livro: number) => {
        const uri = `${dirs.DocumentDir}/liberi/livros/livro${id_livro}`;
        let exists = await RNFetchBlob.fs.isDir(uri);
        if(exists)
            return `file://${uri}/`;
        return null;
    }

    static setCripto = async (id: number, json: any) => { 
        await AsyncStorage.setItem(`${LIVRO_KEY}${id}`,JSON.stringify(json));
    }
    static getCripto = async (id: number) => { 
        var json = await AsyncStorage.getItem(`${LIVRO_KEY}${id}`);
        if(!json){
            return null;
        }
        return JSON.parse(json);
    }

    static setVersion = async (id: number, version: string) => { 
        await AsyncStorage.setItem(`${LIVRO_KEY}${id}-Ver`,version);
    }
    static getVersion = async (id: number) => { 
        return await AsyncStorage.getItem(`${LIVRO_KEY}${id}-Ver`);
    }

    /*static getVersionApp = async (app, versaoApp) => { 
        var version = await ApiService.getVersaoApp(app);
        return versaoApp >= version ? true : false;
    }*/

}
