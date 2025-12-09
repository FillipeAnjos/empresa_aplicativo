import AuthApi from "./AuthApi";
import UsuarioRepository from '../repositories/UsuarioRepository'

export default class AuthService{
    static usuarioRepository = new UsuarioRepository();
    
    static async loginPrimeiroSaberes(ru: string, senha: string, phoneModel: string, deviceId: string) {

        let user = {
            ru: ru,
            senha: senha,
            id_instituicao: 1,
            phone_model: phoneModel,
            device_id: deviceId,
            app: 'liberi'
        }
        
        try {

            let res = await AuthApi.post(`/v1/login-aluno-instituicao`, user);

            let data: any = {};
            if(res.data[0] != '{'){
                //data = JSON.parse(res.data.slice(1));
                data = res.data
            }else{
                data = JSON.parse(res.data);
            }
            
            if(!data.sucesso && data.limite_dispositivos){

                var objLimiteDispositivo = {
                    limite_dispositivos: true,
                    msg: data.mensagem,
                    sucesso: data.sucesso,
                    url_dispositivo: data.url_dispositivo
                }

                return objLimiteDispositivo;
            }

            if (data.sucesso && data.token){
                AuthService.usuarioRepository.set(data, data.token); // Pegar somente os dados do app do Biblioteca
                return true;
            }else{
                return false;
            }
            
        } catch (error) {
            console.log('permission rejected loginPrimeiroSaberes');
            return false;
        }
        
    }

    static logout() {
        this.usuarioRepository.remove();
    }


}