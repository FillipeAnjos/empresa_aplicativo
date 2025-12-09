import AsyncStorage from '@react-native-async-storage/async-storage';
import Base64Helper from "../helpers/Base64Helper";
const API_KEY = 'url:';
export default class ApiRepository {
    static setItem = async (url,json) => { 
        await AsyncStorage.setItem(`${API_KEY}${url}`,JSON.stringify(json));
    }
    static setPostItem = async (url, body ,json) => { 
        await AsyncStorage.setItem(`${API_KEY}${url}${Base64Helper.encode(JSON.stringify(body))}`,JSON.stringify(json));
    }
    static getItem = async (url) => { 
        var json = await AsyncStorage.getItem(`${API_KEY}${url}`);
        if(!json){
            return null;
        }
        return JSON.parse(json);
    }
    static getPostItem = async (url, body) => { 
        var json = await AsyncStorage.getItem(`${API_KEY}${url}${Base64Helper.encode(JSON.stringify(body))}`);
        if(!json){
            return null;
        }
        return JSON.parse(json);
    }

    static setText = async (url,text) => { 
        await AsyncStorage.setItem(`${API_KEY}${url}`,text);
    }
    static getText = async (url) => { 
        return await AsyncStorage.getItem(`${API_KEY}${url}`);
    }    
}
