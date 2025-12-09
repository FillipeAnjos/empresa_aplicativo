import AsyncStorage from '@react-native-async-storage/async-storage';
const USUARIO_KEY = 'usuario';
const USUARIO_TOKEN = USUARIO_KEY + '_token';
export default class UsuarioRepository {
    set = async (usuario: string, token: string) => { 
        AsyncStorage.setItem(USUARIO_KEY,JSON.stringify(usuario));
        AsyncStorage.setItem(USUARIO_TOKEN, token);
    }
    get = async () => { 
        var res = await AsyncStorage.getItem(USUARIO_KEY);

        if(res == null || res == 'null' || res == undefined || res == ''){
            return null;
        }

        return JSON.parse(res);
    }
    getToken = async () => { 
        return await AsyncStorage.getItem(USUARIO_TOKEN);
    }
    remove = async () => { 
        await AsyncStorage.removeItem(USUARIO_KEY);
        await AsyncStorage.removeItem(USUARIO_TOKEN);
    }
}
