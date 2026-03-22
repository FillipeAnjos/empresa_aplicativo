import AuthApi from "./AuthApi";
import UsuarioRepository from '../repositories/UsuarioRepository';

export default class AuthService{

    static usuarioRepository = new UsuarioRepository();
    
    static async loginUsuario(login: string, senha: string) {

        let url = `/loginUsuario`;

        let user = { login: login, senha: senha };

        var res = await AuthApi.post(url, user);

        if(!res){
            return false;
        }

        if(res.data.usuario.status == false){
            return { error: true, msg: res.data.usuario.error };
        }

        var data: any = {};
        data = res.data;
        AuthService.usuarioRepository.set(data, 'usuario logado token');

        return data;
        
    }

    static logout() {
        this.usuarioRepository.remove();
    }


}